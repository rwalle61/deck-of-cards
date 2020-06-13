import { shuffleCards, sortCards } from './card.utils';

describe('card.utils.js', () => {
  describe('shuffleCards', () => {
    it('returns a shuffled cards', () => {
      const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const output = shuffleCards(cards);
      expect(output).toHaveLength(cards.length);
      expect(output).not.toStrictEqual(cards);
    });
  });
  describe('sortCards', () => {
    it('returns cards sorted high to low', () => {
      const cards = ['C3', 'C4'];
      const output = sortCards(cards);
      expect(output).toStrictEqual(['C4', 'C3']);
    });
  });
});
