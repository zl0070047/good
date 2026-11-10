const Room = require('../../server/room/room');

describe('Room Management Tests', () => {
  let room;

  beforeEach(() => {
    room = new Room('test-room', 6);
  });

  test('should create room with correct settings', () => {
    expect(room.name).toBe('test-room');
    expect(room.maxPlayers).toBe(6);
    expect(room.players.length).toBe(0);
  });

  test('should handle player join/leave correctly', () => {
    const player = { id: '1', name: 'Player1' };
    room.addPlayer(player);
    expect(room.players.length).toBe(1);
    room.removePlayer('1');
    expect(room.players.length).toBe(0);
  });
});