import { render, screen } from "@testing-library/react";
import LoginPage from "./page";

describe("Login page (/login).", () => {
  it("It should display the Google login button", () => {
    render(<LoginPage />);

    const loginButton = screen.getByRole("button", {
      name: /Sign in with Google/i,
    });

    expect(loginButton).toBeInTheDocument();
  });
});