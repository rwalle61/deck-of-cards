import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const suitIDToIcon = {
  C: '♣︎',
  S: '♠︎',
  H: '♥︎',
  D: '♦︎',
};

const suitIDToColour = {
  C: 'black',
  S: 'black',
  H: 'red',
  D: 'red',
};

const CardFront = (id, colour, suitIcon, value) => (
  <div id={id} className={`card card-${colour}`}>
    <div className='card-topleft'>
      <div className='card-value'>{value}</div>
      <div className='card-suit'>{suitIcon}</div>
    </div>
    <div className='card-bottomright'>
      <div className='card-value'>{value}</div>
      <div className='card-suit'>{suitIcon}</div>
    </div>
  </div>
);

const CardBack = (id) => <div id={id} className='card-back'></div>;

const Card = ({ id, showBack }) => {
  if (showBack) {
    return CardBack(id);
  }
  const suitID = id.charAt(0);
  const value = id.substring(1);
  const colour = suitIDToColour[suitID];
  const suitIcon = suitIDToIcon[suitID];
  return CardFront(id, colour, suitIcon, value);
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
};

export default Card;
