import { selectRestaurant } from "./restaurantActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Restaurant Actions", () => {
  it("selectRestaurant sets the cookie and redirects to dashboard", async () => {
    const mockSetCookie = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      set: mockSetCookie,
    });

    const fakeRestaurantId = "rest-12345";
    await selectRestaurant(fakeRestaurantId);

    expect(mockSetCookie).toHaveBeenCalledWith("activeRestaurantId", fakeRestaurantId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });
});