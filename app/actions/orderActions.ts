"use server";

import dbConnect from "../../lib/mongodb";
import Order from "../../models/Order";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

export async function markAsDelivered(orderId: string) {
  await dbConnect();
  
  await Order.findByIdAndUpdate(orderId, {
    status: "delivered"
  });

  revalidatePath("/dashboard");
}

export async function getActiveOrders() {
  await dbConnect();

  const orders = await Order.find({ status: "active" })
    .sort({ createdAt: -1 })
    .lean();

  return orders.map((order: { _id: mongoose.Types.ObjectId; address: string; price: number; platform: string; paymentMethod: string; targetDeliveryTime?: string; status: string; restaurantId: mongoose.Types.ObjectId; createdAt: Date; }) => ({
    _id: order._id.toString(),
    address: order.address,
    price: order.price,
    platform: order.platform,
    paymentMethod: order.paymentMethod,
    targetDeliveryTime: order.targetDeliveryTime || "As soon as possible",
    status: order.status,
    restaurantId: order.restaurantId?.toString() || "",
    createdAt: order.createdAt?.toISOString() || new Date().toISOString(),
  }));
}

export async function getDeliveredOrders() {
  await dbConnect();
  
  const orders = await Order.find({ status: "delivered" })
    .sort({ updatedAt: -1 })
    .lean();

  return orders.map((order: { _id: mongoose.Types.ObjectId; address: string; price: number; platform: string; paymentMethod: string; targetDeliveryTime?: string; status: string; restaurantId: mongoose.Types.ObjectId; createdAt: Date; }) => ({
    _id: order._id.toString(),
    address: order.address,
    price: order.price,
    platform: order.platform,
    paymentMethod: order.paymentMethod,
    targetDeliveryTime: order.targetDeliveryTime || "As soon as possible",
    status: order.status,
    restaurantId: order.restaurantId?.toString() || "",
    createdAt: order.createdAt?.toISOString() || new Date().toISOString(),
  }));
}

export async function undoDelivery(orderId: string) {
  await dbConnect();
  
  await Order.findByIdAndUpdate(orderId, {
    status: "active"
  });

  revalidatePath("/dashboard/history");
}