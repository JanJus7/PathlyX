"use server";

import dbConnect from "../../lib/mongodb";
import Order from "../../models/Order";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

export async function createOrder(formData: FormData) {
  await dbConnect();

  const address = formData.get("address");
  const price = formData.get("price");
  const platform = formData.get("platform");
  const paymentMethod = formData.get("paymentMethod");
  const deliveryTime = formData.get("deliveryTime");

  const dummyRestaurantId = new mongoose.Types.ObjectId("64b8f8f01234567890123456");

  await Order.create({
    address: address,
    price: Number(price),
    platform: platform,
    paymentMethod: paymentMethod,
    targetDeliveryTime: deliveryTime,
    restaurantId: dummyRestaurantId,
  });

  redirect("/dashboard");
}