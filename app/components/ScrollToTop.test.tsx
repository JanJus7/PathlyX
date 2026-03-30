import { render, screen, fireEvent } from "@testing-library/react";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop Component", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it("should not be visible at the top", () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should appear after scrolling down and scroll to top on click", () => {
    render(<ScrollToTop />);
    
    fireEvent.scroll(window, { target: { scrollY: 400 } });
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});