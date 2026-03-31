import { render, screen } from '@testing-library/react';
import DashboardLayout from './layout';

jest.mock('../components/LogoutButton', () => {
    return function MockLogoutButton() {
        return <button>Mock Logout Button</button>;
    };
});

describe('Dashboard Layout', () => {
    it('renders the layout nav and children', () => {
        render(
            <DashboardLayout>
                <div data-testid="child">Page Content</div>
            </DashboardLayout>
        );

        expect(screen.getByRole("link", { name: /Active Orders/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Add Order/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /History/i })).toBeInTheDocument();

        expect(screen.getAllByRole("button", { name: /Mock Logout Button/i}).length).toBeGreaterThan(0);

        expect(screen.getByTestId("child")).toBeInTheDocument();
        expect(screen.getByText("Page Content")).toBeInTheDocument();
    });
});