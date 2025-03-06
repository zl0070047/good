import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

//页面组件
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Room from './pages/Room';
import Game from './pages/Game';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/game/:roomId" element={<Game />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
