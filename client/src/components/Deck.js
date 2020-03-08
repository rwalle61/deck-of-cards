import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import shuffleArray from 'shuffle-array';
import playingCardBacks from '../playingCardBacks.png';

const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  shuffleArray(shuffledDeck);
  return shuffledDeck;
};

const Deck = (props) => (<Container>
  <div><img src={playingCardBacks} className="Deck" alt="deck" /></div>
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
</Container>);

export {
  Deck,
  shuffleDeck,
};
