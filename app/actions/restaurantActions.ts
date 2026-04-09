"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function selectRestaurant(restaurantId: string) {
  const cookieStore = await cookies();

  cookieStore.set("activeRestaurantId", restaurantId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}