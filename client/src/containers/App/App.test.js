import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders with the right heading', () => {
    const screen = render(<App />);
    const heading = screen.getByRole('heading', { name: /Magic Deck/i });
    expect(heading).toBeInTheDocument();
  });
  it('renders with 3 buttons', () => {
    const screen = render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });
  it('renders (a deck of) 52 cards', () => {
    const screen = render(<App />);
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(52);
  });
  it('renders a Draw Card button that can be clicked', async () => {
    const screen = render(<App />);
    const drawButton = screen.getByRole('button', { name: /Draw Card/i });
    expect(drawButton).toBeInTheDocument();
    fireEvent.click(drawButton);

    // react seems to take a moment to delete items it is moving to another element
    await wait(() => {
      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(52);
    });
  });
  it('disables the Draw Card button when the deck is empty', async () => {
    const screen = render(<App />);
    const drawButton = screen.getByRole('button', { name: /Draw Card/i });
    [...Array(52).keys()].forEach((i) => {
      fireEvent.click(drawButton);
    });
    expect(drawButton).toBeDisabled();
  });
  it('renders a Shuffle Deck button that can be clicked', async () => {
    const screen = render(<App />);
    const shuffleButton = screen.getByRole('button', { name: /Shuffle Deck/i });
    expect(shuffleButton).toBeInTheDocument();
    fireEvent.click(shuffleButton);

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(52);
  });
  it('disables the Shuffle Deck button when the deck is empty', async () => {
    const screen = render(<App />);
    const drawButton = screen.getByRole('button', { name: /Draw Card/i });
    [...Array(52).keys()].forEach((i) => {
      fireEvent.click(drawButton);
    });
    const shuffleButton = screen.getByRole('button', { name: /Shuffle Deck/i });
    expect(shuffleButton).toBeDisabled();
  });
  it('renders a Sort Hand button that can be clicked', async () => {
    const screen = render(<App />);
    const sortButton = screen.getByRole('button', { name: /Sort Hand/i });
    expect(sortButton).toBeInTheDocument();
    fireEvent.click(sortButton);

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(52);
  });
  it('disables the Sort Hand button until we draw a card', async () => {
    const screen = render(<App />);
    const sortButton = screen.getByRole('button', { name: /Sort Hand/i });
    expect(sortButton).toBeDisabled();

    const drawButton = screen.getByRole('button', { name: /Draw Card/i });
    fireEvent.click(drawButton);

    expect(sortButton).toBeEnabled();
  });
});
