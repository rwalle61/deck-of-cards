import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import { AnimatedCardDiv } from '../../animations/list-animations';
import Card from '../Card';
import './Hand.css';

const Hand = ({ hand }) => (
  <Container className='Hand'>
    <PoseGroup>
      {hand.map((card) => (
        <AnimatedCardDiv id={card} key={card}>
          <Card id={card} />
        </AnimatedCardDiv>
      ))}
    </PoseGroup>
  </Container>
);

Hand.propTypes = {
  hand: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Hand;
