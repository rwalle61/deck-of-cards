import React from 'react';

const Hand = (props) => (
  <div className="Hand">
    <p>Your hand</p>
    <div className="Cards-in-hand">
      {props.hand.map(card => (
        <p className="Card" id={card}>{card}</p>
      ))}
    </div>
  </div>
);

const sortHand = (hand, sortedDeck) => {
  const sortedHand = [];
  sortedDeck.forEach((card) => {
    if (hand.includes(card)) {
      sortedHand.push(card);
    }
  });
  return sortedHand;
};

export {
  Hand,
  sortHand,
};
