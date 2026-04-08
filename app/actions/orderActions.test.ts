import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextEncoder, TextDecoder });

import { createOrder, markAsDelivered } from "./orderActions";
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
jest.mock("../../models/Order", () => ({
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));
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
});