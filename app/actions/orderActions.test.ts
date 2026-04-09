import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextEncoder, TextDecoder });

import { createOrder, markAsDelivered, getActiveOrders, getDeliveredOrders, undoDelivery } from "./orderActions";
import Order from "../../models/Order";
import dbConnect from "../../lib/mongodb";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

jest.mock("mongoose", () => ({
  Types: {
    ObjectId: jest.fn().mockImplementation((id) => ({
      toString: () => id,
    })),
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

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("Server Actions", () => {
  const mockRestaurantId = "69ca9d13b0ae6a11dc3c9ccd";

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: mockRestaurantId }),
    });
  });

  it("createOrder saves order with restaurantId from cookies", async () => {
    const formData = new FormData();
    formData.append("address", "Testowa 15");
    formData.append("price", "45.50");
    formData.append("platform", "uber");
    formData.append("paymentMethod", "card");
    formData.append("deliveryTime", "14:30");

    await createOrder(formData);

    expect(dbConnect).toHaveBeenCalled();
    const callArgs = (Order.create as jest.Mock).mock.calls[0][0];
    expect(callArgs.address).toBe("Testowa 15");
    expect(callArgs.restaurantId.toString()).toBe(mockRestaurantId);
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("createOrder throws error if restaurantId cookie is missing", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    const formData = new FormData();
    await expect(createOrder(formData)).rejects.toThrow("Missing activeRestaurantId cookie");
  });

  it("getActiveOrders filters by restaurantId and formats data", async () => {
    const mockLean = (Order as unknown as { _leanMock: jest.Mock })._leanMock;
    
    mockLean.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_123" },
        address: "Active Street 1",
        price: 50.0,
        platform: "uber",
        paymentMethod: "card",
        status: "active",
        restaurantId: { toString: () => mockRestaurantId },
        createdAt: new Date(),
      }
    ]);

    const orders = await getActiveOrders();

    const findArgs = (Order.find as jest.Mock).mock.calls[0][0];
    expect(findArgs.restaurantId.toString()).toBe(mockRestaurantId);
    expect(orders).toHaveLength(1);
    expect(orders[0]._id).toBe("order_123");
  });

  it("getDeliveredOrders filters by restaurantId and formats data", async () => {
    const mockLean = (Order as unknown as { _leanMock: jest.Mock })._leanMock;
    
    mockLean.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_999" },
        address: "History Avenue 9",
        price: 120.0,
        platform: "wolt",
        paymentMethod: "online",
        status: "delivered",
        restaurantId: { toString: () => mockRestaurantId },
        createdAt: new Date(),
      }
    ]);

    const orders = await getDeliveredOrders();

    const findArgs = (Order.find as jest.Mock).mock.calls[0][0];
    expect(findArgs.status).toBe("delivered");
    expect(orders[0].address).toBe("History Avenue 9");
  });

  it("markAsDelivered updates status and revalidates path", async () => {
    await markAsDelivered("123");
    expect(Order.findByIdAndUpdate).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
  });

  it("undoDelivery reverts status to active", async () => {
    await undoDelivery("123");
    expect(Order.findByIdAndUpdate).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/history");
  });

it("getActiveOrders returns empty array if no restaurantId cookie is present", async () => {
    (cookies as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      get: jest.fn().mockReturnValue(undefined),
    }));

    const orders = await getActiveOrders();
    expect(orders).toEqual([]);
    expect(Order.find).not.toHaveBeenCalled();
  });

  it("getDeliveredOrders returns empty array if no restaurantId cookie is present", async () => {
    (cookies as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      get: jest.fn().mockReturnValue(undefined),
    }));

    const orders = await getDeliveredOrders();
    expect(orders).toEqual([]);
    expect(Order.find).not.toHaveBeenCalled();
  });

  it("handles missing optional fields in getActiveOrders gracefully", async () => {
    const mockLean = (Order as unknown as { _leanMock: jest.Mock })._leanMock;
    
    mockLean.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_minimal" },
        address: "Minimal Street",
        price: 10.0,
        platform: "uber",
        paymentMethod: "cash",
        status: "active",
      }
    ]);

    const orders = await getActiveOrders();

    expect(orders[0].targetDeliveryTime).toBe("As soon as possible");
    expect(orders[0].restaurantId).toBe("");
    expect(orders[0].createdAt).toBeDefined();
  });

  it("handles missing optional fields in getDeliveredOrders gracefully", async () => {
    const mockLean = (Order as unknown as { _leanMock: jest.Mock })._leanMock;
    
    mockLean.mockResolvedValueOnce([
      {
        _id: { toString: () => "order_minimal_delivered" },
        address: "Minimal History",
        price: 20.0,
        platform: "wolt",
        paymentMethod: "card",
        status: "delivered",
      }
    ]);

    const orders = await getDeliveredOrders();

    expect(orders[0].targetDeliveryTime).toBe("As soon as possible");
    expect(orders[0].restaurantId).toBe("");
    expect(orders[0].createdAt).toBeDefined();
  });
});