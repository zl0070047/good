const express = require('express');
const router = express.Router();
const { getRooms } = require('../gameLogic');

// 获取所有活跃房间列表
router.get('/', (req, res) => {
  try {
    const rooms = getRooms();
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
