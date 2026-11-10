const request = require('supertest');
const app = require('../../server/app');

describe('API Tests', () => {
  test('GET /api/rooms should return room list', async () => {
    const response = await request(app)
      .get('/api/rooms')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/rooms should create new room', async () => {
    const response = await request(app)
      .post('/api/rooms')
      .send({ name: 'New Room', maxPlayers: 6 })
      .expect(201);
    
    expect(response.body.name).toBe('New Room');
  });
});