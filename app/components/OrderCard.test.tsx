import { render, screen } from "@testing-library/react";
import OrderCard from "./OrderCard";

jest.mock("../actions/orderActions", () => ({
  markAsDelivered: jest.fn(),
}));

describe("OrderCard Component", () => {
  const mockOrder = {
    _id: "12345abcdef",
    address: "Main Street 123, App 4",
    price: 45.5,
    platform: "uber",
    paymentMethod: "card",
    targetDeliveryTime: "14:30",
    status: "active",
  };

  it("renders the correct order data and action buttons", () => {
    render(<OrderCard order={mockOrder as any} />);

    expect(screen.getByText("Main Street 123, App 4")).toBeInTheDocument();

    const navLink = screen.getByRole("link", { name: /Navigate/i });
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute(
      "href",
      "https://www.google.com/maps/search/?api=1&query=Main+Street+123%2C+App+4",
    );

    expect(
      screen.getByRole("button", { name: /Mark as Delivered/i }),
    ).toBeInTheDocument();
  });
});
