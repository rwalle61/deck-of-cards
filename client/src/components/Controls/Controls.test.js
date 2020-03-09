import React from 'react';
import { shallow } from 'enzyme';
import { Controls } from '.';

describe('<Controls />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
    <Controls
      onShuffle={() => {}}
      onDraw={() => {}}
      onSort={() => {}}
    />
    );
    expect(wrapper).toHaveLength(1);
  });
});
