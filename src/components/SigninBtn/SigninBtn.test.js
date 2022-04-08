import React from 'react';
import { SigninBtn } from './SigninBtn';
import { render, screen, waitFor } from '@testing-library/react';

it('renders SigninBtn correctly', () => {
	const { baseElement } = render(<SigninBtn />);
	const btn = baseElement;
	expect(btn).toBeInTheDocument();
});

it('renders the props of the component', async () => {
	const { getByText } = render(<SigninBtn children={'Irgendwas'} />);
	await waitFor(() => getByText(/Irgendwas/i));
});
