import { render, screen } from "@testing-library/react";
import AutoSelect from "./AutoSelect";
import { selectRestaurant } from "../actions/restaurantActions";

jest.mock("../actions/restaurantActions", () => ({
  selectRestaurant: jest.fn(),
}));

describe("AutoSelect Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state and calls selectRestaurant on mount", () => {
    const fakeRestaurantId = "rest-777";
    
    render(<AutoSelect restaurantId={fakeRestaurantId} />);

    expect(screen.getByText("Entering your restaurant...")).toBeInTheDocument();

    expect(selectRestaurant).toHaveBeenCalledWith(fakeRestaurantId);
    expect(selectRestaurant).toHaveBeenCalledTimes(1);
  });
});