import { fireEvent, render, screen } from '@testing-library/react';
import LogoutButton from './LogoutButton';
import { signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    signOut: jest.fn(),
}));

describe('LogoutButton Component', () => {
    it('renders the Logout Button', () => {
        render(<LogoutButton />);

        expect(screen.getByRole("button", { name: /Sign Out/i })).toBeInTheDocument();
    });

    it('calls signOut on button click', () => {
        render(<LogoutButton />);

        const button = screen.getByRole("button", ({ name: /Sign Out/i }));

        fireEvent.click(button);

        expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });

    })
});

