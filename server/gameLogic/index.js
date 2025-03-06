const { v4: uuidv4 } = require('uuid');

// 内存中存储游戏状态
const games = {};

// 创建新游戏房间
function createGame(settings, hostId, hostInfo) {
  const roomId = uuidv4();
  games[roomId] = {
    roomId,
    hostId,
    settings: {
      minPlayers: 4,
      maxPlayers: settings.maxPlayers || 10,
      smallBlind: settings.smallBlind || 10,
      bigBlind: settings.bigBlind || 20,
      initialStack: settings.initialStack || 1000,
      timeLimit: 60
    },
    status: 'waiting',
    players: [{
      id: hostId,
      name: hostInfo.name || 'Player',
      avatar: hostInfo.avatar || 'default.png',
      chips: settings.initialStack || 1000,
      cards: [],
      bet: 0,
      folded: false,
      position: 0
    }],
    communityCards: [],
    deck: [],
    pot: 0,
    currentPlayer: null,
    dealer: 0,
    smallBlindPos: 1,
    bigBlindPos: 2,
    currentBet: 0,
    lastRaisePos: -1,
    round: 'preGame',
    createdAt: Date.now()
  };
  return roomId;
}

// 加入游戏
function joinGame(roomId, userId, userInfo) {
  if (!games[roomId]) {
    return { success: false, error: '房间不存在' };
  }
  
  const game = games[roomId];
  
  if (game.status !== 'waiting') {
    return { success: false, error: '游戏已开始，无法加入' };
  }
  
  if (game.players.length >= game.settings.maxPlayers) {
    return { success: false, error: '房间已满' };
  }if (game.players.some(p => p.id === userId)) {
    return { success: false, error: '已在房间中' };
  }
  
  game.players.push({
    id: userId,
    name: userInfo.name,
    avatar: userInfo.avatar,
    chips: game.settings.initialStack,
    cards: [],
    bet: 0,
    folded: false,
    position: game.players.length
  });
  
  return {
    success: true,
    gameState: getPublicGameState(roomId)
  };
}

// 开始游戏
function startGame(roomId, userId) {
  if (!games[roomId]) {
    return { success: false, error: '房间不存在' };
  }const game = games[roomId];if (game.hostId !== userId) {
    return { success: false, error: '只有房主可以开始游戏' };
  }
  
  if (game.players.length < game.settings.minPlayers) {
    return { success: false, error: `至少需要${game.settings.minPlayers}名玩家` };
  }// 游戏初始化
  game.status = 'playing';
  game.deck = createShuffledDeck();
  
  // 发牌
  for (const player of game.players) {
    player.cards = [drawCard(game.deck), drawCard(game.deck)];player.folded = false;player.bet = 0;
  }
  
  // 设置盲注
  const sbPlayer = game.players[game.smallBlindPos];
  const bbPlayer = game.players[game.bigBlindPos];
  
  sbPlayer.chips -= game.settings.smallBlind;
  sbPlayer.bet = game.settings.smallBlind;
  bbPlayer.chips -= game.settings.bigBlind;
  bbPlayer.bet = game.settings.bigBlind;
  
  game.pot = game.settings.smallBlind + game.settings.bigBlind;
  game.currentBet = game.settings.bigBlind;
  game.round = 'preFlop';
  game.communityCards = [];// 设置第一个行动的玩家（大盲注后一个）
  game.currentPlayer = (game.bigBlindPos +1) % game.players.length;
  
  return {
    success: true,
    gameState: getPublicGameState(roomId)
  };
}

// 创建洗好的牌组
function createShuffledDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = Array.from({ length: 13 }, (_, i) => i + 1);const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  
  // 洗牌（Fisher-Yates算法）
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

// 从牌组抽一张牌
function drawCard(deck) {
  return deck.pop();
}

// 获取公开游戏状态（不含玩家手牌）
function getPublicGameState(roomId) {
  const game = games[roomId];
  if (!game) return null;
  
  return {
    roomId: game.roomId,
    hostId: game.hostId,
    settings: game.settings,
    status: game.status,
    players: game.players.map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      chips: p.chips,
      bet: p.bet,
      folded: p.folded,
      position: p.position,
      hasCards: p.cards.length > 0
    })),
    communityCards: game.communityCards,
    pot: game.pot,
    currentPlayer: game.currentPlayer,
    dealer: game.dealer,
    smallBlindPos: game.smallBlindPos,
    bigBlindPos: game.bigBlindPos,
    currentBet: game.currentBet,
    round: game.round,
    winners: game.winners || []
  };
}

// 获取玩家私有状态（含手牌）
function getPrivatePlayerState(roomId, playerId) {
  const game = games[roomId];
  if (!game) return null;const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) return null;
  
  const publicState = getPublicGameState(roomId);
  return {
    ...publicState,
    playerCards: game.players[playerIndex].cards
  };
}

// 获取活跃房间列表
function getRooms() {
  return Object.values(games)
    .filter(game => game.status === 'waiting')
    .map(game => ({
      roomId: game.roomId,
      hostName: game.players.find(p => p.id === game.hostId)?.name || 'Unknown',
      playerCount: game.players.length,
      maxPlayers: game.settings.maxPlayers,
      smallBlind: game.settings.smallBlind,
      bigBlind: game.settings.bigBlind
    }));
}

module.exports = {
  createGame,
  joinGame,
  startGame,
  getPublicGameState,
  getPrivatePlayerState,
  getRooms
  //其他游戏功能方法（玩家行动、发牌等）会根据需要添加
};
