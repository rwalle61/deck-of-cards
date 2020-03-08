import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import logo from './logo.svg';
import './App.css';

const origin = 'http://localhost:9100';

const getCards = async (params) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${origin}/api/v1/deck/`,
      params: {
        numCards: 0,
        ...params,
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const Deck = (props) => ([
  <img src={logo} className="Deck" alt="deck"/>,
  <Button
    className="Draw-btn"
    variant="primary"
    onClick={props.onClick}
    >
    Draw card
  </Button>
]);

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
  const [hand, setHand] = useState([]);

  const onClick = async() => {
    const cards = await getCards({
      numCards: hand.length + 1,
    });
    setHand(cards);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Deck of Cards
        </p>
        <Deck onClick={onClick} />
        <Hand hand={hand} />
      </header>
    </div>
  );
}

export default App;
