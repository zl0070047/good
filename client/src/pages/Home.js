import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setAvatar } from '../store/userSlice';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(state => state.user);
  const [userName, setUsername] = useState(name);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const avatars = Array.from({ length: 10 }, (_, i) => `/avatars/avatar${i + 1}.png`);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      dispatch(setUserName(userName.trim()));
      dispatch(setAvatar(selectedAvatar));
      navigate('/lobby');
    }
  };
  
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="game-title">德州扑克</h1>
        <p className="game-subtitle">拉斯维加斯赌场风格</p>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>选择昵称</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="输入您的昵称"
              maxLength={12}
              required
            />
          </div>
          <div className="form-group">
            <label>选择头像</label>
            <div className="avatar-selection">
              {avatars.map((src, index) => (
                <img 
                  key={index}
                  src={src}
                  alt={`Avatar ${index + 1}`}
                  className={selectedAvatar === src ? 'selected' : ''}
                  onClick={() => setSelectedAvatar(src)}
                />
              ))}
            </div>
          </div>
          
          <button type="submit" className="start-button">进入游戏</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
