import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Chips.css';

const chipColors = {
  1: '#ffffff',    // 白色筹码 = 1元
  5: '#ff0000',    // 红色筹码 = 5元
  10: '#0000ff',   // 蓝色筹码 = 10元
  25: '#008000',   // 绿色筹码 = 25元
  100: '#000000',  // 黑色筹码 = 100元500: '#800080',  // 紫色筹码 = 500元
  1000: '#ffa500'  // 橙色筹码 = 1000元
};

// 将金额转换为筹码堆
const convertToChips = (amount) => {
  const chips = [];
  let remaining = amount;
  // 从最大面值开始分配筹码
  const denominations = [1000, 500, 100, 25, 10, 5, 1];
  
  denominations.forEach(value => {
    const count = Math.floor(remaining / value);
    for (let i = 0; i < count; i++) {
      chips.push(value);
    }
    remaining%= value;
  });
  
  return chips;
};

const Chips = ({ amount, position = 'center', isAnimated = false }) => {
  const chips = convertToChips(amount);return (
    <div className={`chips-container position-${position}`}>
      {chips.map((value, index) => (
        <motion.div
          key={index}
          className="chip"
          style={{
            backgroundColor: chipColors[value],
            zIndex: 100 - index,
            top: `-${index * 2}px`
          }}initial={isAnimated ? { scale: 0, y: 100 } : {}}
          animate={isAnimated ? { scale: 1, y: 0 } : {}}
          transition={{ delay: index * 0.05}}
        >
          <span className="chip-value">{value}</span>
        </motion.div>
      ))}
      <div className="total-amount">{amount}</div>
    </div>
  );
};

export default Chips;
