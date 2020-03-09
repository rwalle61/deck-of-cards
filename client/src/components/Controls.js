import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import shuffleArray from 'shuffle-array';
import PropTypes from 'prop-types';

const shuffleDeck = (deck) => {
  const deckClone = [...deck];
  shuffleArray(deckClone);
  return deckClone;
};

const Controls = ({ onShuffle, onDraw, onSort }) => (<Container>
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

Controls.propTypes = {
  onShuffle: PropTypes.func.isRequired,
  onDraw: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
}

export {
  Controls,
  shuffleDeck,
};
