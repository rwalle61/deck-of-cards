import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import shuffleArray from 'shuffle-array';

const shuffleDeck = (deck) => {
  const deckClone = [...deck];
  shuffleArray(deckClone);
  return deckClone;
};

const DeckControls = ({ onShuffle, onDraw, onSort }) => (<Container>
  <Button
    className="Shuffle-btn"
    variant="outline-warning"
    onClick={onShuffle}
    >
    Shuffle Deck
  </Button>
  <Button
    className="Draw-btn"
    variant="outline-success"
    onClick={onDraw}
    >
    Draw Card
  </Button>
  <Button
    className="Sort-btn"
    variant="outline-primary"
    onClick={onSort}
    >
    Sort Hand
  </Button>
</Container>);

export {
  DeckControls,
  shuffleDeck,
};
