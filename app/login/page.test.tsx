import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./page";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("Login page (/login).", () => {
  it("It should display the Google login button", () => {
    render(<LoginPage />);

    const loginButton = screen.getByRole("button", {
      name: /Sign in with Google/i,
    });

    expect(loginButton).toBeInTheDocument();
  });

  it("should call signIn when the login button is clicked", () => {
    render(<LoginPage />);
    
    const loginButton = screen.getByRole("button", {
      name: /Sign in with Google/i,
    });

    fireEvent.click(loginButton);

    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/dashboard" });
  });
});