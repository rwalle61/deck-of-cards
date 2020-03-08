import React from 'react';
import './Card.css';

const Card = (props) => {
  const { id } = props;
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

export default Card;
