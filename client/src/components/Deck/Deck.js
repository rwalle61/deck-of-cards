import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import { AnimatedCardDiv } from '../../animations/list-animations';
import Card from '../Card';
import './Deck.css';

const Deck = ({ deck }) => (
  <Container className='Deck'>
    <PoseGroup>
      {deck.map((card) => (
        <AnimatedCardDiv id={card} key={card}>
          <Card id={card} showBack={true} />
        </AnimatedCardDiv>
      ))}
    </PoseGroup>
  </Container>
);

Deck.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Deck;
