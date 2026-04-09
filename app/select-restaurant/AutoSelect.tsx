"use client";

import { useEffect } from "react";
import { selectRestaurant } from "../actions/restaurantActions";

export default function AutoSelect({ restaurantId }: { restaurantId: string }) {
  useEffect(() => {
    selectRestaurant(restaurantId);
  }, [restaurantId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Entering your restaurant...</p>
      </div>
    </div>
  );
}