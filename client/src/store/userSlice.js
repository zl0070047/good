import { createSlice } from '@reduxjs/toolkit';

// 生成随机用户名
function generateGuestName() {
  const adjectives = ['快乐的', '幸运的', '聪明的', '酷的', '勇敢的', '神秘的'];
  const nouns = ['玩家', '牌手', '大师', '赌神', '新手', '高手', '专家'];
  const randomNum = Math.floor(Math.random() * 1000);
  
  const adjIndex = Math.floor(Math.random() * adjectives.length);
  const nounIndex = Math.floor(Math.random() * nouns.length);return `${adjectives[adjIndex]}${nouns[nounIndex]}_${randomNum}`;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: `guest_${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`,
    name: generateGuestName(),
    avatar: `/avatars/avatar${Math.floor(Math.random() * 10) + 1}.png`,
    chips: 1000,
    isGuest: true
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    updateChips: (state, action) => {
      state.chips = action.payload;
    },
    resetUser: (state) => {
      state.id = `guest_${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
      state.name = generateGuestName();
      state.avatar = `/avatars/avatar${Math.floor(Math.random() * 10) + 1}.png`;
      state.chips = 1000;}
  }
});

export const { setUserName, setAvatar, updateChips, resetUser } = userSlice.actions;
export default userSlice.reducer;
