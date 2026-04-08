import React from "react";
import { markAsDelivered } from "../actions/orderActions";

export interface Order {
  _id: string;
  address: string;
  price: number;
  platform: string;
  paymentMethod: string;
  targetDeliveryTime?: string;
  status: string;
}

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.address)}`;

  const markDeliveredWithId = markAsDelivered.bind(null, order._id);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col gap-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider border border-slate-200">
          {order.platform}
        </span>
        <div className="text-right">
          <span className="font-extrabold text-xl text-slate-900">
            {order.price.toFixed(2)}{" "}
            <span className="text-sm text-slate-500 font-medium">PLN</span>
          </span>

          <p
            className={`text-xs font-bold uppercase mt-1 ${
              order.paymentMethod === "cash" ? "text-red-600" : "text-slate-500"
            }`}
          >
            {order.paymentMethod === "cash" ? "Cash!" : order.paymentMethod}
          </p>
        </div>
      </div>

      <div className="py-2">
        <p className="text-sm font-medium text-blue-600 mb-1">
          Delivery to: {order.targetDeliveryTime || "As soon as possible"}
        </p>
        <h3 className="text-xl font-bold text-slate-800 leading-tight">
          {order.address}
        </h3>
      </div>

      <div className="pt-2 border-t border-slate-100 mt-auto flex flex-col gap-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-colors active:scale-[0.98]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Navigate
        </a>

        <form action={markDeliveredWithId}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold py-3 px-4 rounded-xl transition-colors active:scale-[0.98]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Mark as Delivered
          </button>
        </form>
      </div>
    </div>
  );
}
