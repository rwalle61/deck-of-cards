import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({ onShuffle, onDraw, onSort, deckLength, handLength }) => {
  const shuffleButton = (
    <Button
      className='btn Shuffle-btn'
      variant='outline-warning'
      size='lg'
      onClick={onShuffle}
      disabled={deckLength < 1}
    >
      Shuffle Deck
    </Button>
  );

  const drawButton = (
    <Button
      className='btn Draw-btn'
      variant='outline-success'
      size='lg'
      onClick={onDraw}
      disabled={deckLength < 1}
    >
      Draw Card
    </Button>
  );

  const sortButton = (
    <Button
      className='btn Sort-btn'
      variant='outline-primary'
      size='lg'
      onClick={onSort}
      disabled={handLength < 1}
    >
      Sort Hand
    </Button>
  );

  return (
    <Container className='Controls'>
      {shuffleButton}
      {drawButton}
      {sortButton}
    </Container>
  );
};

Controls.propTypes = {
  onShuffle: PropTypes.func.isRequired,
  onDraw: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Controls;
