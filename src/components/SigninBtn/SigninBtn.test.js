import React from 'react';
import { SigninBtn } from './SigninBtn';
import { render, screen, fireEvent } from '@testing-library/react';

it('renders SigninBtn correctly', () => {
	render(<SigninBtn />);
	const btn = screen.getByRole('button');
	expect(btn).toBeInTheDocument();
});

it('renders the props of the component', () => {
	render(<SigninBtn children={'Irgendwas'} />);
	screen.findByText(/Irgendwas/i);
});

it('calls onClick prop when clicked', () => {
	const handleClick = jest.fn();
	render(<SigninBtn onClick={handleClick} children={'Click me'} />);
	fireEvent.click(screen.getByText(/click me/i));
	expect(handleClick).toHaveBeenCalledTimes(1);
});
