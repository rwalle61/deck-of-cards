import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import snapshotDiff from 'snapshot-diff';
import Controls from '.';

describe('<Controls />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    expect(wrapper).toHaveLength(1);
  });
  it('contains 3 buttons, enabled by default', () => {
    const screen = render(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons).toMatchInlineSnapshot(`
      Array [
        <button
          class="btn Shuffle-btn btn btn-outline-warning btn-lg"
          type="button"
        >
          Shuffle Deck
        </button>,
        <button
          class="btn Draw-btn btn btn-outline-success btn-lg"
          type="button"
        >
          Draw Card
        </button>,
        <button
          class="btn Sort-btn btn btn-outline-primary btn-lg"
          type="button"
        >
          Sort Hand
        </button>,
      ]
    `);
  });
  it('has a shuffle button, enabled by default', () => {
    const onShuffle = jest.fn();
    const wrapper = shallow(
      <Controls onShuffle={onShuffle} onDraw={() => {}} onSort={() => {}} />,
    );
    wrapper.find('.Shuffle-btn').simulate('click');
    expect(onShuffle).toHaveBeenCalled();
  });
  it('disables the draw and shuffle buttons when deckLength is 0', () => {
    const screen1 = render(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    const screen2 = render(
      <Controls
        onShuffle={() => {}}
        onDraw={() => {}}
        onSort={() => {}}
        deckLength={0}
      />,
    );
    expect(
      snapshotDiff(screen1.container, screen2.container, { contextLines: 2 }),
    ).toMatchInlineSnapshot(`
      "Snapshot Diff:
      - First value
      + Second value

      @@ -5,4 +5,5 @@
            <button
              class=\\"btn Shuffle-btn btn btn-outline-warning btn-lg\\"
      +       disabled=\\"\\"
              type=\\"button\\"
            >
      @@ -11,4 +12,5 @@
            <button
              class=\\"btn Draw-btn btn btn-outline-success btn-lg\\"
      +       disabled=\\"\\"
              type=\\"button\\"
            >"
    `);
  });
  it('disables the sort button when handLength is 0', () => {
    const screen1 = render(
      <Controls onShuffle={() => {}} onDraw={() => {}} onSort={() => {}} />,
    );
    const screen2 = render(
      <Controls
        onShuffle={() => {}}
        onDraw={() => {}}
        onSort={() => {}}
        handLength={0}
      />,
    );
    expect(
      snapshotDiff(screen1.container, screen2.container, { contextLines: 2 }),
    ).toMatchInlineSnapshot(`
      "Snapshot Diff:
      - First value
      + Second value

      @@ -17,4 +17,5 @@
            <button
              class=\\"btn Sort-btn btn btn-outline-primary btn-lg\\"
      +       disabled=\\"\\"
              type=\\"button\\"
            >"
    `);
  });
});
