import { render, screen } from "@testing-library/react";
import OrderCard from "./OrderCard";

describe("OrderCard Component", () => {
  const mockOrder = {
    _id: "12345abcdef",
    address: "ul. Testowa 15, m. 4",
    price: 45.5,
    platform: "uber",
    paymentMethod: "card",
    targetDeliveryTime: "14:30",
    status: "active",
  };

  it("renders the correct address", () => {
    render(<OrderCard order={mockOrder as any} />);

    expect(screen.getByText("ul. Testowa 15, m. 4")).toBeInTheDocument();

    expect(screen.getByText(/45.50/i)).toBeInTheDocument();

    expect(screen.getByText(/14:30/i)).toBeInTheDocument();

    expect(screen.getByText(/uber/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Navigate/i }),
    ).toBeInTheDocument();
  });
});
