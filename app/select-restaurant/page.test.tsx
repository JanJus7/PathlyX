import { render, screen } from "@testing-library/react";
import SelectRestaurantPage from "./page";
import { getServerSession } from "next-auth/next";
import Restaurant from "../../models/Restaurant";
import { redirect } from "next/navigation";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("../api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn().mockImplementation(() => {
    const error = new Error("NEXT_REDIRECT");
    (error as any).digest = "NEXT_REDIRECT";
    throw error;
  }),
}));

jest.mock("../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("./AutoSelect", () => () => <div data-testid="auto-select" />);

jest.mock("../../lib/mongodb", () => jest.fn());

jest.mock("../../models/Restaurant", () => {
  const leanMock = jest.fn();
  return {
    find: jest.fn().mockReturnValue({ lean: leanMock }),
    _leanMock: leanMock,
  };
});

describe("Select Restaurant Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to login if no session is present", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    try {
      await SelectRestaurantPage();
    } catch (e) {
      // Ignored
    }

    expect(redirect).toHaveBeenCalledWith("/login");
  });

  it("renders a list of restaurants for a superadmin", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "super-id", role: "superadmin" },
    });

    (Restaurant as any)._leanMock.mockResolvedValueOnce([
      { _id: "rest1", name: "Kebab Główny" },
      { _id: "rest2", name: "Pizza u Janka" },
    ]);

    const PageComponent = await SelectRestaurantPage();
    render(PageComponent);

    expect(screen.getByText("Kebab Główny")).toBeInTheDocument();
    expect(screen.getByText("Pizza u Janka")).toBeInTheDocument();
  });

  it("renders the AutoSelect component for an employee with exactly 1 restaurant", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "emp-id", role: "employee" },
    });

    (Restaurant as any)._leanMock.mockResolvedValueOnce([
      { _id: "rest1", name: "Tylko Mój Kebab" },
    ]);

    const PageComponent = await SelectRestaurantPage();
    render(PageComponent);

    expect(screen.getByTestId("auto-select")).toBeInTheDocument();
  });

  it("renders an empty state if no restaurants are found", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "sad-id", role: "admin" },
    });

    (Restaurant as any)._leanMock.mockResolvedValueOnce([]);

    const PageComponent = await SelectRestaurantPage();
    render(PageComponent);

    expect(screen.getByText("No restaurants found")).toBeInTheDocument();
  });
});
