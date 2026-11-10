const Card = require('../../common/poker/card');

describe('Card Tests', () => {
  test('should create a valid card', () => {
    const card = new Card('hearts', 'A');
    expect(card.suit).toBe('hearts');
    expect(card.rank).toBe('A');
  });

  test('should validate card values', () => {
    expect(() => new Card('invalid', 'A')).toThrow();
    expect(() => new Card('hearts', '15')).toThrow();
  });
});