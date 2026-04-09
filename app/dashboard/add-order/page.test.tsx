import { render, screen } from "@testing-library/react";
import AddOrderPage from "./page";

jest.mock("../../actions/orderActions", () => ({
  createOrder: jest.fn(),
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn().mockResolvedValue({
    user: { id: "user123", role: "admin" }
  }),
}));
jest.mock("../../api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

describe("Add Order Page (/dashboard/add-order)", () => {
  it("powinna renderować nagłówek i wszystkie wymagane pola formularza", () => {
    render(<AddOrderPage />);

    expect(
      screen.getByRole("heading", { name: /Add New Order/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Delivery Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Platform/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payment Method/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Expected Delivery Time/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save Order/i }),
    ).toBeInTheDocument();
  });
});
