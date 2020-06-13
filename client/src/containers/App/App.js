import React, { useState } from 'react';
import Deck from '../../components/Deck';
import Hand from '../../components/Hand';
import Controls from '../../components/Controls';
import './App.css';

import { sortedDeck, sortCards, shuffleCards } from '../../utils/card.utils';

// we render the deck above the hand, so we need to draw from the end of the deck
const drawCard = (deck) => {
  const indexOfLastCard = deck.length - 1;
  const card = deck[indexOfLastCard];
  const newDeck = deck.slice(0, indexOfLastCard);
  return { card, newDeck };
};

// we render the deck above the hand, so we need to draw from the end of the deck.
// so in order to draw the initial deck in order, we start with a reversed deck
const initialDeck = [...sortedDeck].reverse();

const App = () => {
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState([]);

  const onDraw = () => {
    const { card, newDeck } = drawCard(deck);
    const newHand = hand.concat([card]);
    setHand(newHand);
    setDeck(newDeck);
  };

  const onShuffle = () => {
    const shuffledDeck = shuffleCards(deck);
    setDeck(shuffledDeck);
  };

  const onSort = () => {
    const sortedHand = sortCards(hand);
    setHand(sortedHand);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='title'>Magic Deck</h1>
        <Deck deck={deck} />
        <Controls
          onDraw={onDraw}
          onShuffle={onShuffle}
          onSort={onSort}
          remainingDeckLength={deck.length}
        />
        <Hand hand={hand} />
      </header>
    </div>
  );
};

export default App;
