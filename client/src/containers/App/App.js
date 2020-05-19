import React, { useState, useEffect } from 'react';
import { Deck } from '../../components/Deck';
import { Controls, shuffleDeck } from '../../components/Controls';
import { Hand, sortHand } from '../../components/Hand';
import './App.css';

import initialDeck from '../../utils/initialDeck';

const App = () => {
  const [deck, setDeck] = useState(initialDeck);
  const [hand, setHand] = useState([]);

  const drawCard = () => {
    const indexOfLastCard = deck.length - 1
    const card = deck[indexOfLastCard];
    const newDeck = deck.slice(0, indexOfLastCard);
    return { card, newDeck };
  }

  const onDraw = async() => {
    if (deck.length < 1) {
      return;
    }
    const { card, newDeck } = drawCard();
    const newHand = hand.concat([card]);
    setHand(newHand);
    setDeck(newDeck);
  };

  const onShuffle = async() => {
    const shuffledDeck = shuffleDeck(deck);
    setDeck(shuffledDeck);
  };

  const onSort = async() => {
    const sortedHand = sortHand(hand);
    setHand(sortedHand);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Magic Deck</h1>
        <Deck deck={deck} />
        <Controls
          onDraw={onDraw}
          onShuffle={onShuffle}
          onSort={onSort}
          />
        <Hand hand={hand} />
      </header>
    </div>
  );
}

export default App;
