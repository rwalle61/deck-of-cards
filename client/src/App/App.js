import React, { useState, useEffect } from 'react';
import { Deck, shuffleDeck } from '../components/Deck';
import { Hand, sortHand } from '../components/Hand';
import './App.css';

import getDeck from '../utils/apiRequests';

const App = () => {
  const [deck, setDeck] = useState([]);
  const [sortedDeck, setSortedDeck] = useState([]);
  const [hand, setHand] = useState([]);

  useEffect(() => {
    async function getInitialDeck() {
      try {
        const initialDeck = await getDeck();
        setDeck(initialDeck);
        setSortedDeck(initialDeck);
      } catch (err) {
        console.log(err);
      }
    }
    getInitialDeck();
  }, []);

  const onDraw = async() => {
    const newHand = deck.slice(0, hand.length + 1);
    setHand(newHand);
  };

  const onShuffle = async() => {
    const shuffledDeck = shuffleDeck(deck);
    setDeck(shuffledDeck);
  };

  const onSort = async() => {
    const sortedHand = sortHand(hand, sortedDeck);
    setHand(sortedHand);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Deck of Cards
        </p>
        <Deck
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
