import { render, screen } from '@testing-library/react';
import DashboardPage from './page';

describe('Dashboard Page', () => {
    it('renders the dashboard page placeholder', () => {
        render(<DashboardPage />);

        expect(screen.getByRole('heading', {name: /Dashboard/i })).toBeInTheDocument();
        expect(screen.getByText(/Coming soon.../i)).toBeInTheDocument();
    })
})