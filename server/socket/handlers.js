const { 
    createGame, 
    joinGame, 
    startGame,
    getPublicGameState,
    getPrivatePlayerState,
    getRooms
  } = require('../gameLogic');
  
  // Socket事件处理
  module.exports = (io, socket) => {
    console.log('用户连接:', socket.id);
    
    // 创建房间
    socket.on('createRoom', ({ settings, userInfo }) => {
      try {
        const roomId = createGame(settings, socket.id, userInfo);
        socket.join(roomId);
        socket.roomId = roomId;
        socket.emit('roomCreated', { roomId });
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // 获取房间列表
    socket.on('getRooms', () => {
      try {
        const rooms = getRooms();
        socket.emit('roomsList', rooms);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // 加入房间
    socket.on('joinRoom', ({ roomId, userInfo }) => {
      try {
        const result = joinGame(roomId, socket.id, userInfo);
        
        if (result.success) {
          socket.join(roomId);
          socket.roomId = roomId;
          socket.emit('joinedRoom', result.gameState);
          io.to(roomId).emit('playerJoined', {
            player: {
              id: socket.id,
              name: userInfo.name,
              avatar: userInfo.avatar
            }
          });
        } else {
          socket.emit('error', { message: result.error });
        }
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // 开始游戏
    socket.on('startGame', ({ roomId }) => {
      try {
        const result = startGame(roomId, socket.id);
        
        if (result.success) {
          io.to(roomId).emit('gameStarted', result.gameState);
          
          // 向每个玩家单独发送他们的手牌
          const sockets = io.sockets.adapter.rooms.get(roomId);
          if (sockets) {
            for (const socketId of sockets) {
              const playerSocket = io.sockets.sockets.get(socketId);
              if (playerSocket) {
                const privateState = getPrivatePlayerState(roomId, socketId);
                playerSocket.emit('privateState', privateState);
              }
            }
          }
        } else {
          socket.emit('error', { message: result.error });
        }
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // 玩家行动
    socket.on('playerAction', ({ action, amount }) => {
      // 这里需要实现玩家行动的处理逻辑
      console.log(`玩家 ${socket.id} 执行操作: ${action}, 金额: ${amount}`);
    });
    
    // 断开连接
    socket.on('disconnect', () => {
      console.log('用户断开连接:', socket.id);
      
      if (socket.roomId) {
        io.to(socket.roomId).emit('playerLeft', { playerId: socket.id });
        // 处理玩家离开的游戏逻辑
      }
    });
  };