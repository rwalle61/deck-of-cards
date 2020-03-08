import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from './Card';

const Hand = (props) => (
  <Container className="Hand">
    <p>Your hand</p>
    <Container className="Cards-in-hand">
      {props.hand.map(card => (
        <Card id={card} />
      ))}
    </Container>
  </Container>
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
