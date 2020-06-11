import React from 'react';
import { shallow } from 'enzyme';
import { Deck } from '.';

describe('<Deck />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Deck deck={[]} />);
    expect(wrapper).toHaveLength(1);
  });
});
