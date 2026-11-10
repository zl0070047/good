const io = require('socket.io-client');
const server = require('../../server/index');

describe('Socket.IO Tests', () => {
  let clientSocket;

  beforeEach((done) => {
    clientSocket = io('http://localhost:5000');
    clientSocket.on('connect', () => {
      console.log('✅ 客户端成功连接到服务器');
      done();
    });
  });

  afterEach(() => {
    clientSocket.close();
    console.log('🔚 关闭客户端连接');
  });

  test('加入房间测试', (done) => {
    console.log('🎮 开始测试加入房间功能');
    
    clientSocket.emit('joinRoom', 'room1');
    console.log('📤 发送加入房间请求: room1');

    clientSocket.on('roomJoined', (data) => {
      console.log('📥 收到房间加入确认:', data);
      expect(data.room).toBe('room1');
      done();
    });
  });

  test('聊天功能测试', (done) => {
    console.log('💬 开始测试聊天功能');
    
    const testMessage = 'Hello, World!';
    clientSocket.emit('chat', {
      room: 'room1',
      message: testMessage
    });
    console.log('📤 发送测试消息:', testMessage);

    clientSocket.on('chatMessage', (data) => {
      console.log('📥 收到聊天消息:', data);
      expect(data.message).toBe(testMessage);
      done();
    });
  });
});