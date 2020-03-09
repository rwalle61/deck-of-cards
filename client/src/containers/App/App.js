import React, { useState, useEffect } from 'react';
import { Deck } from '../../components/Deck';
import { Controls, shuffleDeck } from '../../components/Controls';
import { Hand, sortHand } from '../../components/Hand';
import './App.css';

import getDeck from '../../utils/apiRequests';

const App = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [errorConnectingToServer, setErrorConnectingToServer] = useState(false);

  useEffect(() => {
    async function getInitialDeck() {
      try {
        const initialDeck = await getDeck();
        initialDeck.reverse(); // we draw from the end of the end because the deck is rendered above the hand
        setDeck(initialDeck);
      } catch (err) {
        console.log(err);
        setErrorConnectingToServer(true);
      }
    }
    getInitialDeck();
  }, []);

  const drawCard = () => {
    // draw from the end because the deck is rendered above the hand
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

  const connectionErrorMsg = () => errorConnectingToServer
    ? <p>Error connecting to server. Is it on?</p>
    : null;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Magic Deck</h1>
        {connectionErrorMsg()}
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
