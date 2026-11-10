const { evaluateHand } = require('../../common/game/rules');

describe('Poker Rules Tests', () => {
  test('should identify royal flush', () => {
    const hand = [
      { suit: 'hearts', rank: 'A' },
      { suit: 'hearts', rank: 'K' },
      { suit: 'hearts', rank: 'Q' },
      { suit: 'hearts', rank: 'J' },
      { suit: 'hearts', rank: '10' }
    ];
    expect(evaluateHand(hand).type).toBe('Royal Flush');
  });

  test('should compare two hands correctly', () => {
    const hand1 = [/* 一对 */];
    const hand2 = [/* 两对 */];
    expect(evaluateHand(hand1).value < evaluateHand(hand2).value).toBe(true);
  });
});