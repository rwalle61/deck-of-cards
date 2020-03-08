import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import shuffleArray from 'shuffle-array';

const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  shuffleArray(shuffledDeck);
  return shuffledDeck;
};

const DeckControls = (props) => (<Container>
  <Button
    className="Shuffle-btn"
    variant="outline-warning"
    onClick={props.onShuffle}
    >
    Shuffle Deck
  </Button>
  <Button
    className="Draw-btn"
    variant="outline-success"
    onClick={props.onDraw}
    >
    Draw Card
  </Button>
  <Button
    className="Sort-btn"
    variant="outline-primary"
    onClick={props.onSort}
    >
    Sort Hand
  </Button>
</Container>);

export {
  DeckControls,
  shuffleDeck,
};
