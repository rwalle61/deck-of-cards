import React from 'react';
import { shallow } from 'enzyme';
import Card from '../Card';

describe('<Card />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Card id={'C4'} />);
    expect(wrapper).toHaveLength(1);
  });
  it('correctly extracts the card value', () => {
    const wrapper = shallow(<Card id={'C4'} />);
    wrapper.find('.card-value').forEach((valueElement) => {
      expect(valueElement.text()).toEqual('4');
    });
  });
});
