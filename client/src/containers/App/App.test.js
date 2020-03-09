import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Magic Deck/i);
  expect(linkElement).toBeInTheDocument();
});
