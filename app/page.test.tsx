import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page (Landing Page)", () => {
  it("should render Navbar, show Loading fallback, and then lazy-load HeroSection", async () => {
    render(<Home />);
    
    expect(screen.getByRole("link", { name: /PathlyX/i })).toBeInTheDocument();

    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();

    const heroText = await screen.findByText(/Make your buisness efficient/i);
    expect(heroText).toBeInTheDocument();
  });
});