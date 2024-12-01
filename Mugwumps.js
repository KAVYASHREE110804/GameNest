import React, { useState } from 'react';
import '../styles/GameBoard.css';
import '../styles/Mugwump.css';
import '../styles/ScoreBoard.css';

// Constants
const BOARD_ROWS = 5;
const BOARD_COLS = 5;
const TOTAL_WUMPUS = 5;
const MAX_MOVES = 20;

// Utility function to get random positions for Mugwumps
function getRandomPositions(count) {
  const positions = new Set();
  while (positions.size < count) {
    const x = Math.floor(Math.random() * BOARD_COLS);
    const y = Math.floor(Math.random() * BOARD_ROWS);
    positions.add(`${x}-${y}`);
  }
  return Array.from(positions).map(pos => {
    const [x, y] = pos.split('-').map(Number);
    return { x, y };
  });
}

// Mugwump component
function Mugwump() {
  return <div className="Mugwump">M</div>;
}

// ScoreBoard component
function ScoreBoard({ score, moves, gameOver, onReset }) {
  return (
    <div className="ScoreBoard">
      <p>Score: {score}</p>
      <p>Moves Left: {moves}</p>
      {gameOver && <p>{score === 5 ? "You Win!" : "Game Over!"}</p>}
      <button onClick={onReset}>Reset Game</button>
    </div>
  );
}

// Main GameBoard component
function Mugwumps() {
  const [mugwumpPositions, setMugwumpPositions] = useState(getRandomPositions(TOTAL_WUMPUS));
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(MAX_MOVES);
  const [gameOver, setGameOver] = useState(false);
  const [revealedCells, setRevealedCells] = useState(new Set());
  const [scoredCells, setScoredCells] = useState(new Set());

  const handleClick = (x, y) => {
    if (gameOver) return;

    const pos = `${x}-${y}`;
    setRevealedCells(prev => new Set(prev.add(pos)));

    const foundWumpus = mugwumpPositions.find(p => p.x === x && p.y === y);
    if (foundWumpus) {
      setScore(score + 1);
      setScoredCells(prev => new Set(prev.add(pos)));
      setMugwumpPositions(mugwumpPositions.filter(p => p.x !== x || p.y !== y));
    }

    setMoves(moves - 1);

    if (moves <= 1 || mugwumpPositions.length === 0) {
      setGameOver(true);
    }
  };

  const handleReset = () => {
    setMugwumpPositions(getRandomPositions(TOTAL_WUMPUS));
    setScore(0);
    setMoves(MAX_MOVES);
    setGameOver(false);
    setRevealedCells(new Set());
    setScoredCells(new Set());
  };

  return (
    <div className="GameBoard">
      <ScoreBoard score={score} moves={moves} gameOver={gameOver} onReset={handleReset} />
      <div className="Board">
        {Array.from({ length: BOARD_ROWS }, (_, y) =>
          Array.from({ length: BOARD_COLS }, (_, x) => (
            <div
              key={`${x}-${y}`}
              className={`Cell ${revealedCells.has(`${x}-${y}`) ? 'Revealed' : ''} ${scoredCells.has(`${x}-${y}`) ? 'Scored' : ''}`}
              onClick={() => handleClick(x, y)}
            >
              {revealedCells.has(`${x}-${y}`) && mugwumpPositions.some(p => p.x === x && p.y === y) && <Mugwump />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Mugwumps;
