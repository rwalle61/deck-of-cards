import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({ onShuffle, onDraw, onSort, remainingDeckLength }) => {
  const shuffleButton = (
    <Button
      className='btn Shuffle-btn'
      variant='outline-warning'
      size='lg'
      onClick={onShuffle}
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
      disabled={remainingDeckLength < 1}
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
