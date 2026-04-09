import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextEncoder, TextDecoder });

import { createOrder, markAsDelivered, getActiveOrders, getDeliveredOrders } from "./orderActions";
import Order from "../../models/Order";
import dbConnect from "../../lib/mongodb";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

jest.mock("mongoose", () => ({
  Types: {
    ObjectId: jest.fn().mockImplementation((id) => id),
  },
  Schema: jest.fn(),
  model: jest.fn(),
  models: {},
}));

jest.mock("../../lib/mongodb", () => jest.fn());

jest.mock("../../models/Order", () => {
  const leanMock = jest.fn();
  const sortMock = jest.fn().mockReturnValue({ lean: leanMock });
  
  return {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    find: jest.fn().mockReturnValue({ sort: sortMock }), 
    
    _leanMock: leanMock 
  };
});

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createOrder saves order and redirects", async () => {
    const formData = new FormData();
    formData.append("address", "Testowa 15");
    formData.append("price", "45.50");
    formData.append("platform", "uber");
    formData.append("paymentMethod", "card");
    formData.append("deliveryTime", "14:30");

    await createOrder(formData);

    expect(dbConnect).toHaveBeenCalled();

    expect(Order.create).toHaveBeenCalledWith(expect.objectContaining({
      address: "Testowa 15",
      price: 45.5,
      platform: "uber",
      paymentMethod: "card",
      targetDeliveryTime: "14:30",
    }));

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("markAsDelivered updates status and revalidates path", async () => {
    const fakeOrderId = "12345";
    
    await markAsDelivered(fakeOrderId);

    expect(dbConnect).toHaveBeenCalled();
    expect(Order.findByIdAndUpdate).toHaveBeenCalledWith(fakeOrderId, {
      status: "delivered"
    });
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
  });

  it("getActiveOrders fetches and formats active orders", async () => {
    (Order as unknown as { _leanMock: jest.Mock })._leanMock.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_123" },
        address: "Active Street 1",
        price: 50.0,
        platform: "uber",
        paymentMethod: "card",
        status: "active",
        restaurantId: { toString: () => "rest_123" },
        createdAt: { toISOString: () => "2023-10-10T12:00:00Z" },
      }
    ]);

    const orders = await getActiveOrders();

    expect(dbConnect).toHaveBeenCalled();
    expect(Order.find).toHaveBeenCalledWith({ status: "active" });
    expect(orders).toHaveLength(1);
    expect(orders[0].address).toBe("Active Street 1");
    expect(orders[0]._id).toBe("order_123");
  });

  it("getDeliveredOrders fetches and formats delivered orders", async () => {
    (Order as unknown as { _leanMock: jest.Mock })._leanMock.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_999" },
        address: "History Avenue 9",
        price: 120.0,
        platform: "wolt",
        paymentMethod: "online",
        status: "delivered",
        restaurantId: { toString: () => "rest_123" },
        createdAt: { toISOString: () => "2023-10-11T14:00:00Z" },
      }
    ]);

    const orders = await getDeliveredOrders();

    expect(dbConnect).toHaveBeenCalled();
    expect(Order.find).toHaveBeenCalledWith({ status: "delivered" });
    expect(orders).toHaveLength(1);
    expect(orders[0].address).toBe("History Avenue 9");
    expect(orders[0]._id).toBe("order_999");
  });

  it("handles missing optional fields in getActiveOrders gracefully", async () => {
    (Order as unknown as { _leanMock: jest.Mock })._leanMock.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_missing_fields" },
        address: "No Time Street",
        price: 30.0,
        platform: "glovo",
        paymentMethod: "cash",
        status: "active",
      }
    ]);

    const orders = await getActiveOrders();

    expect(orders[0].targetDeliveryTime).toBe("As soon as possible");
    expect(orders[0].restaurantId).toBe("");
    expect(orders[0].createdAt).toBeDefined();
  });
});