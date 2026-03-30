import { render, screen, fireEvent } from "@testing-library/react";
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

  it("should open and close the mobile menu on hamburger button click", () => {
    render(<Navbar />);
    
    const menuButton = screen.getByRole("button", { name: /Toggle menu/i });
    
    expect(screen.getAllByText(/About Us/i).length).toBe(1);

    fireEvent.click(menuButton);
    expect(screen.getAllByText(/About Us/i).length).toBe(2);

    const mobileLink = screen.getAllByText(/About Us/i)[1];
    fireEvent.click(mobileLink);

    expect(screen.getAllByText(/About Us/i).length).toBe(1);
  });

  it("should react to window scrolling and change styles", () => {
    render(<Navbar />);
    
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });
    
    const logoLink = screen.getByRole("link", { name: /PathlyX/i });
    expect(logoLink).toHaveClass("text-white");

    fireEvent.scroll(window, { target: { scrollY: 600 } });

    expect(logoLink).toHaveClass("text-blue-600");
  });
});