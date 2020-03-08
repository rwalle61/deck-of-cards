import React, { useState, useEffect } from 'react';
import axios from 'axios';
import shuffleArray from 'shuffle-array';
import Button from 'react-bootstrap/Button';
import logo from './logo.svg';
import './App.css';

const origin = 'http://localhost:9100';

const getDeck = async () => {
  const response = await axios.get(`${origin}/api/v1/deck/`);
  return response.data;
};

const Deck = (props) => ([
  <img src={logo} className="Deck" alt="deck"/>,
  <Button
    className="Shuffle-btn"
    variant="secondary"
    onClick={props.onShuffle}
    >
    Shuffle deck
  </Button>,
  <Button
    className="Draw-btn"
    variant="primary"
    onClick={props.onDraw}
    >
    Draw card
  </Button>,
  <Button
    className="Sort-btn"
    variant="secondary"
    >
    Sort hand
  </Button>,
]);

const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  shuffleArray(shuffledDeck);
  return shuffledDeck;
};

const Hand = (props) => (
  <div className="Hand">
    <p>Your hand</p>
    <div className="Cards-in-hand">
      {props.hand.map(card => (
        <p className="Card" id={card}>{card}</p>
      ))}
    </div>
  </div>
);

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
    return deck.slice(0, hand.length + 1);
  }

  const onDraw = async() => {
    const cards = drawCard();
    setHand(cards);
  };

  const onShuffle = async() => {
    const shuffledDeck = shuffleDeck(deck);
    setDeck(shuffledDeck);
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
          />
        <Hand hand={hand} />
      </header>
    </div>
  );
}

export default App;
