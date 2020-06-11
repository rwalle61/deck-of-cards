import React from 'react';
import { shallow } from 'enzyme';
import { Hand } from '.';

describe('<Hand />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Hand hand={[]} />);
    expect(wrapper).toHaveLength(1);
  });
});
