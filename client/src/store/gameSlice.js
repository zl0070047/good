import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    roomId: null,
    players: [],
    communityCards: [],
    pot: 0,
    currentPlayer: null,
    dealer: 0,
    smallBlindPos: 1,
    bigBlindPos: 2,
    currentBet: 0,
    round: 'preGame',
    status: 'waiting',
    winners: []
  },
  reducers: {
    updateGameState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetGameState: (state) => {
      state.roomId = null;
      state.players = [];
      state.communityCards = [];
      state.pot = 0;
      state.currentPlayer = null;
      state.round = 'preGame';
      state.status = 'waiting';
      state.winners = [];
    },
    playerAction: (state, action) => {
      //乐观更新，实际状态由服务器决定
      const { action: actionType, amount } = action.payload;
      
      if (actionType === 'fold') {
        // 处理弃牌逻辑} else if (actionType === 'check') {
        // 处理看牌逻辑
      } else if (actionType === 'call') {
        // 处理跟注逻辑
      } else if (actionType === 'raise') {
        // 处理加注逻辑
      } else if (actionType === 'allIn') {
        // 处理全押逻辑
      }
    }
  }
});

export const { updateGameState, resetGameState, playerAction } = gameSlice.actions;
export default gameSlice.reducer;
