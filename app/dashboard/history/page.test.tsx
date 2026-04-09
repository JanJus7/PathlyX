import { render, screen } from "@testing-library/react";
import HistoryPage from "./page";
import { getDeliveredOrders } from "../../actions/orderActions";

jest.mock("../../actions/orderActions", () => ({
  getDeliveredOrders: jest.fn(),
  markAsDelivered: jest.fn(),
  undoDelivery: jest.fn(),
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { id: "user123", role: "admin" }
  }),
}));
jest.mock("../../api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

describe("History Page (/dashboard/history)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of delivered orders", async () => {
    (getDeliveredOrders as jest.Mock).mockResolvedValue([
      {
        _id: "delivered-123",
        address: "Baker Street 221B",
        price: 120.0,
        platform: "wolt",
        paymentMethod: "online",
        targetDeliveryTime: "18:00",
        status: "delivered",
      },
    ]);

    const PageComponent = await HistoryPage();
    render(PageComponent);

    expect(screen.getByRole("heading", { name: /Delivery History/i })).toBeInTheDocument();

    expect(screen.getByText("Baker Street 221B")).toBeInTheDocument();

  });

  it("shows an empty state message when there is no history", async () => {
    (getDeliveredOrders as jest.Mock).mockResolvedValue([]);

    const PageComponent = await HistoryPage();
    render(PageComponent);

    expect(screen.getByText(/No delivery history yet/i)).toBeInTheDocument();
  });
});