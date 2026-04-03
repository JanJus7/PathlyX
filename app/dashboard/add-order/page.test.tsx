import { render, screen } from "@testing-library/react";
import AddOrderPage from "./page";

describe("Add Order Page (/dashboard/add-order)", () => {
  it("renders a header and all required form fields", () => {
    render(<AddOrderPage />);

    expect(screen.getByRole("heading", { name: /Add New Order/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/Delivery Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Platform/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payment Method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expected Delivery Time/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Save Order/i })).toBeInTheDocument();
  });
});