import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import { AnimatedCardDiv } from '../../animations/list-animations';
import Card from '../Card';
import './Hand.css';

const Hand = ({ hand }) => (
  <Container className="Hand">
    <PoseGroup>
      {hand.map(card => (
        <AnimatedCardDiv id={card} key={card}>
          <Card id={card}/>
        </AnimatedCardDiv>
      ))}
    </PoseGroup>
  </Container>
);

Hand.propTypes = {
  hand: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const sortedDeck = [
  'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
  'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
  'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
  'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

const sortHand = (hand) => {
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
