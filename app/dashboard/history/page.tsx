import { getDeliveredOrders } from "../../actions/orderActions";
import OrderCard, { Order } from "../../components/OrderCard";

export default async function HistoryPage() {
  const orders = await getDeliveredOrders();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Delivery History</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">No delivery history yet</h3>
          <p className="text-slate-500 mt-1">
            Your completed orders will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order: Order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}