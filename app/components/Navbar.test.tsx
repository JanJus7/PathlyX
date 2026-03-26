import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  it("should display navigation links (About Us, Services) in default mode", () => {
    render(<Navbar />);

    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    
    const logoLink = screen.getByRole("link", { name: /PathlyX/i });
    expect(logoLink).toHaveAttribute("href", "#hero");
  });

  it("should hide navigation links and change the logo link in authentication mode (isAuthPage)", () => {
    render(<Navbar isAuthPage={true} />);

    expect(screen.queryByText(/About Us/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Services/i)).not.toBeInTheDocument();

    const logoLink = screen.getByRole("link", { name: /PathlyX/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});