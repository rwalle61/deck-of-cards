import React from 'react';
import { shallow } from 'enzyme';
import Controls from '.';

describe('<Controls />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    expect(wrapper).toHaveLength(1);
  });
  it('contains 3 buttons', () => {
    const wrapper = shallow(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    expect(wrapper.find('.btn')).toHaveLength(3);
  });
  it('matches the snapshot', () => {
    const wrapper = shallow(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <Container
        className="Controls"
        fluid={false}
      >
        <Button
          active={false}
          className="btn Shuffle-btn"
          disabled={false}
          onClick={[Function]}
          size="lg"
          type="button"
          variant="outline-warning"
        >
          Shuffle Deck
        </Button>
        <Button
          active={false}
          className="btn Draw-btn"
          disabled={false}
          onClick={[Function]}
          size="lg"
          type="button"
          variant="outline-success"
        >
          Draw Card
        </Button>
        <Button
          active={false}
          className="btn Sort-btn"
          disabled={false}
          onClick={[Function]}
          size="lg"
          type="button"
          variant="outline-primary"
        >
          Sort Hand
        </Button>
      </Container>
    `);
  });
  it('has a shuffle button that can be clicked', () => {
    const onShuffle = jest.fn();
    const wrapper = shallow(
      <Controls onShuffle={onShuffle} onDraw={() => {}} onSort={() => {}} />,
    );
    wrapper.find('.Shuffle-btn').simulate('click');
    expect(onShuffle).toHaveBeenCalled();
  });
});
