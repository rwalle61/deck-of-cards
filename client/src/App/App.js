import React, { useState, useEffect } from 'react';
import playingCardBacks from '../playingCardBacks.png';
import { DeckControls, shuffleDeck } from '../components/DeckControls';
import { Hand, sortHand } from '../components/Hand';
import './App.css';

import getDeck from '../utils/apiRequests';

const App = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);

  useEffect(() => {
    async function getInitialDeck() {
      try {
        const initialDeck = await getDeck();
        setDeck(initialDeck);
      } catch (err) {
        console.log(err);
      }
    }
    getInitialDeck();
  }, []);

  const drawCard = () => {
    const card = deck[0];
    const newDeck = deck.slice(1);
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
        <div><img src={playingCardBacks} className="Deck" alt="deck" /></div>
        <p className="Hand-title">Your Hand</p>
        <DeckControls
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
