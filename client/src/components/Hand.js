import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from './Card';

const Hand = (props) => (
  <Container className="Cards-in-hand">
    {props.hand.map(card => (
      <Card id={card} />
    ))}
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
