import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection Component", () => {
  it("should render the main headline and login button", () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Make your buisness efficient/i)).toBeInTheDocument();
    
    const loginBtn = screen.getByRole("link", { name: /Log In/i });
    expect(loginBtn).toHaveAttribute("href", "/login");
  });
});