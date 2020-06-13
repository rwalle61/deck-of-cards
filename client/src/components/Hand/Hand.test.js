import React from 'react';
import { shallow } from 'enzyme';
import Hand from '.';
import Card from '../Card';

describe('<Hand />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Hand hand={[]} />);
    expect(wrapper).toHaveLength(1);
  });
  it('contains the provided hand', () => {
    const inputHand = ['C3', 'C4'];
    const wrapper = shallow(<Hand hand={inputHand} />);
    expect(wrapper.find(Card)).toHaveLength(inputHand.length);
  });
});
