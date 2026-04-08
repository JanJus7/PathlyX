import { createOrder } from "../../actions/orderActions";

export default function AddOrderPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Add New Order</h1>
      
      <form action={createOrder} className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-900 mb-1">
            Delivery Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="e.g. Main Street 123, App 4"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-900 mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-slate-900 mb-1">
            Platform
          </label>
          <select
            id="platform"
            name="platform"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="uber">Uber Eats</option>
            <option value="glovo">Glovo</option>
            <option value="wolt">Wolt</option>
            <option value="direct">Direct Call</option>
          </select>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-900 mb-1">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="card">Card (Terminal)</option>
            <option value="cash">Cash</option>
            <option value="online">Online (Paid)</option>
          </select>
        </div>

        <div>
          <label htmlFor="deliveryTime" className="block text-sm font-medium text-slate-900 mb-1">
            Expected Delivery Time
          </label>
          <input
            type="time"
            id="deliveryTime"
            name="deliveryTime"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
          >
            Save Order
          </button>
        </div>
      </form>
    </div>
  );
}