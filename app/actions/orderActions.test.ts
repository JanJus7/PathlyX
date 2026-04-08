import { createOrder } from "./orderActions";
import Order from "../../models/Order";
import dbConnect from "../../lib/mongodb";
import { redirect } from "next/navigation";

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
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("createOrder Server Action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("connects to the database, saves the order, and redirects to the dashboard", async () => {
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
});