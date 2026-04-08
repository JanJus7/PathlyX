import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";
import { getActiveOrders } from "../actions/orderActions";

jest.mock("../actions/orderActions", () => ({
  getActiveOrders: jest.fn(),
  markAsDelivered: jest.fn(),
}));

describe("Dashboard Main Page (/dashboard)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("powinna renderować listę aktywnych zamówień za pomocą komponentu OrderCard", async () => {
    (getActiveOrders as jest.Mock).mockResolvedValue([
      {
        _id: "1",
        address: "ul. Kwiatowa 12",
        price: 50.0,
        platform: "uber",
        paymentMethod: "card",
        targetDeliveryTime: "14:00",
        status: "active",
      },
      {
        _id: "2",
        address: "Al. Niepodległości 5",
        price: 35.5,
        platform: "glovo",
        paymentMethod: "cash",
        targetDeliveryTime: "15:30",
        status: "active",
      },
    ]);

    const PageComponent = await DashboardPage();
    render(PageComponent);

    expect(screen.getByRole("heading", { name: /Active Orders/i })).toBeInTheDocument();

    expect(screen.getByText("ul. Kwiatowa 12")).toBeInTheDocument();
    expect(screen.getByText("Al. Niepodległości 5")).toBeInTheDocument();
  });

  it("powinna wyświetlić komunikat, jeśli nie ma żadnych zamówień", async () => {
    (getActiveOrders as jest.Mock).mockResolvedValue([]);

    const PageComponent = await DashboardPage();
    render(PageComponent);

    expect(screen.getByText(/You have no active orders at the moment/i)).toBeInTheDocument();
  });
});