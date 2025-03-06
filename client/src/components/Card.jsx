import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Card.css';

const Card = ({ card, faceUp = true, delay = 0 }) => {
  if (!card) {
    return null;
  }
  
  if (!faceUp) {
    return (
      <motion.div 
        className="card card-back"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
      />
    );
  }const { suit, value } = card;
  const suitClass = {
    'hearts': 'suit-hearts',
    'diamonds': 'suit-diamonds',
    'clubs': 'suit-clubs',
    'spades': 'suit-spades'
  }[suit] || '';
  
  const valueDisplay = {
    '1': 'A',
    '11': 'J',
    '12': 'Q',
    '13': 'K'
  }[value] || value;
  
  // 根据花色调整颜色
  const textColor = (suit === 'hearts' || suit === 'diamonds') ? 'text-red' : 'text-black';
  
  return (
    <motion.div 
      className={`card ${suitClass}`}
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className={`card-value ${textColor}`}>{valueDisplay}</div>
      <div className={`card-suit ${textColor}`}>
        {suit === 'hearts' && '♥'}
        {suit === 'diamonds' && '♦'}
        {suit === 'clubs' && '♣'}
        {suit === 'spades' && '♠'}
      </div>
    </motion.div>
  );
};

export default Card;
