import { render, screen } from "@testing-library/react";
import OrderCard from "./OrderCard";

jest.mock("../actions/orderActions", () => ({
  markAsDelivered: jest.fn(),
  undoDelivery: jest.fn(),
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
      "https://www.google.com/maps/dir/?api=1&destination=Main%20Street%20123%2C%20App%204",
    );

    expect(
      screen.getByRole("button", { name: /Mark as Delivered/i }),
    ).toBeInTheDocument();
  });

  it("renders cash payment method and fallback delivery time correctly", () => {
    const cashOrder = { 
      ...mockOrder, 
      paymentMethod: "cash", 
      targetDeliveryTime: undefined 
    };
    
    render(<OrderCard order={cashOrder as any} />);

    expect(screen.getByText("Cash!")).toBeInTheDocument();
    
    expect(screen.getByText(/As soon as possible/i)).toBeInTheDocument();
  });

  it("renders the undo button when order is delivered", () => {
    const deliveredOrder = { 
      ...mockOrder, 
      status: "delivered" 
    };
    
    render(<OrderCard order={deliveredOrder as any} />);

    expect(screen.queryByRole("link", { name: /Navigate/i })).not.toBeInTheDocument();
    
    expect(screen.getByRole("button", { name: /Undo Delivery/i })).toBeInTheDocument();
  });
});