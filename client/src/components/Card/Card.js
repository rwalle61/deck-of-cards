import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ id, showBack }) => {
  if (showBack) {
    return (
      <div id={id} className="card-back"></div>
    );
  }
  const suitID = id.substring(0, 1);
  const value = id.substring(1);
  if (suitID === 'C' || suitID === 'S') {
    const suit = (suitID === 'C') ? '♣︎' : '♠︎';
    return (
      <div id={id} className="card card-black">
        <div className="card-topleft">
          <div className="card-value">{value}</div>
          <div className="card-suit">{suit}</div>
        </div>
        <div className="card-bottomright">
          <div className="card-value">{value}</div>
          <div className="card-suit">{suit}</div>
        </div>
      </div>
    );
  } else {
    const suit = (suitID === 'H') ? '♥︎' : '♦︎';
    return (
      <div id={id} className="card card-red">
        <div className="card-topleft">
          <div className="card-value">{value}</div>
          <div className="card-suit">{suit}</div>
        </div>
        <div className="card-bottomright">
          <div className="card-value">{value}</div>
          <div className="card-suit">{suit}</div>
        </div>
      </div>
    );
  }
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  id: PropTypes.bool,
}

export default Card;
