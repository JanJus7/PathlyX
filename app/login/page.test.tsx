import { render, screen } from "@testing-library/react";
import LoginPage from "./page";

describe("Strona Logowania (/login)", () => {
  it("powinna wyświetlać przycisk logowania przez Google", () => {
    render(<LoginPage />);

    const loginButton = screen.getByRole("button", {
      name: /zaloguj przez google/i,
    });

    expect(loginButton).toBeInTheDocument();
  });
});