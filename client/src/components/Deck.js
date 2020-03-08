import React from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../logo.svg';
import shuffleArray from 'shuffle-array';

const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  shuffleArray(shuffledDeck);
  return shuffledDeck;
};

const Deck = (props) => (<div>
  <img src={logo} className="Deck" alt="deck" />,
  <Button
    className="Shuffle-btn"
    variant="secondary"
    onClick={props.onShuffle}
    >
    Shuffle deck
  </Button>
  <Button
    className="Draw-btn"
    variant="primary"
    onClick={props.onDraw}
    >
    Draw card
  </Button>
  <Button
    className="Sort-btn"
    variant="secondary"
    onClick={props.onSort}
    >
    Sort hand
  </Button>
</div>);

export {
  Deck,
  shuffleDeck,
};
