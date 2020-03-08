import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Deck of Cards title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Deck of Cards/i);
  expect(linkElement).toBeInTheDocument();
});
