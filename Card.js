import React from 'react';
import './MemoryMagic.css';

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="inner-card">
        <div className="front"></div> {/* Card front with black background */}
        <img className="back" src={card.src} alt="Card Back" /> {/* Card back with the image */}
      </div>
    </div>
  );
};

export default Card;
