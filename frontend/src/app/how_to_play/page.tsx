// src/app/how-to-play/page.tsx

import React from 'react';

const HowToPlay = () => {
  return (
    <div className="how-to-play">
      <h1>How to Play</h1>
      <p>Welcome to the Chess Game! Here are the basics on how to play:</p>
      <h2>Basic Rules</h2>
      <ul>
        <li>Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.</li>
        <li>The goal is to checkmate your opponent&apos;s king.</li>
        <li>Pieces move in specific ways. For example, rooks move horizontally or vertically any number of squares, but cannot leap over other pieces.</li>
      </ul>
      <h2>Special Moves</h2>
      <ul>
        <li><b>Castling:</b> A move to safeguard the king and connect the rooks.</li>
        <li><b>En Passant:</b> A special pawn capture.</li>
        <li><b>Promotion:</b> When a pawn reaches the other side of the board, it can be promoted to any other piece except a king.</li>
      </ul>
      <h2>Winning the Game</h2>
      <ul>
        <li>Checkmate your opponent&apos;s king.</li>
        <li>Your opponent resigns.</li>
        <li>Opponent runs out of time in timed games.</li>
      </ul>
      <p>Enjoy the game and have fun!</p>
    </div>
  );
};

export default HowToPlay;
