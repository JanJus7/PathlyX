import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "../../lib/mongodb";
import Restaurant from "../../models/Restaurant";
import Navbar from "../components/Navbar";
import { selectRestaurant } from "../actions/restaurantActions";
import AutoSelect from "./AutoSelect";

export default async function SelectRestaurantPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  await dbConnect();
  const user = session.user as any;
  let restaurants = [];

  if (user.role === "superadmin") {
    restaurants = await Restaurant.find().lean();
  } else if (user.role === "admin") {
    restaurants = await Restaurant.find({ ownerId: user.id }).lean();
  } else {
    restaurants = await Restaurant.find({ employeeIds: user.id }).lean();
  }

  if (user.role === "employee" && restaurants.length === 1) {
    return <AutoSelect restaurantId={restaurants[0]._id.toString()} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto pt-24 p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Select Restaurant
        </h1>
        <p className="text-slate-500 mb-8">
          Choose a location to manage its orders.
        </p>

        {restaurants.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">
              No restaurants found
            </h2>
            <p className="text-slate-500 mt-2">
              You don't have access to any restaurants yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((rest: any) => {
              const selectWithId = selectRestaurant.bind(
                null,
                rest._id.toString(),
              );
              return (
                <form key={rest._id.toString()} action={selectWithId}>
                  <button
                    type="submit"
                    className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-500 transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {rest.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Click to manage
                    </p>
                  </button>
                </form>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
