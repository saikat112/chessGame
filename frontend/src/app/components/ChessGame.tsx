'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Piece } from '../../types/chess';

interface ChessGameProps {
  gameId: string;
  player: string;
}

const initialBoard: (Piece | null)[][] = [
  [
    { type: 'r', color: 'black' },
    { type: 'n', color: 'black' },
    { type: 'b', color: 'black' },
    { type: 'q', color: 'black' },
    { type: 'k', color: 'black' },
    { type: 'b', color: 'black' },
    { type: 'n', color: 'black' },
    { type: 'r', color: 'black' }
  ],
  Array(8).fill({ type: 'p', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'P', color: 'white' }),
  [
    { type: 'R', color: 'white' },
    { type: 'N', color: 'white' },
    { type: 'B', color: 'white' },
    { type: 'Q', color: 'white' },
    { type: 'K', color: 'white' },
    { type: 'B', color: 'white' },
    { type: 'N', color: 'white' },
    { type: 'R', color: 'white' }
  ]
];

const pieceImages: { [key: string]: string } = {
  r: '♜', // Black Rook
  n: '♞', // Black Knight
  b: '♝', // Black Bishop
  q: '♛', // Black Queen
  k: '♚', // Black King
  p: '♟', // Black Pawn
  R: '♖', // White Rook
  N: '♘', // White Knight
  B: '♗', // White Bishop
  Q: '♕', // White Queen
  K: '♔', // White King
  P: '♙', // White Pawn
};

const ChessGame: React.FC<ChessGameProps> = ({ gameId, player }) => {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState('w');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    fetchBoardState();
  }, [gameId]);

  const fetchBoardState = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
      const moves = response.data.moves;
      const initialBoard = initializeBoard();
      applyMoves(initialBoard, moves);
      setBoard(initialBoard);
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const initializeBoard = (): (Piece | null)[][] => {
    const initialBoard: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    // Initialize pawns
    for (let i = 0; i < 8; i++) {
      initialBoard[1][i] = { type: 'P', color: 'black' };
      initialBoard[6][i] = { type: 'P', color: 'white' };
    }
    // Initialize other pieces
    const backRow = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    for (let i = 0; i < 8; i++) {
      initialBoard[0][i] = { type: backRow[i], color: 'black' };
      initialBoard[7][i] = { type: backRow[i], color: 'white' };
    }
    return initialBoard;
  };

  const applyMoves = (board: (Piece | null)[][], moves: any) => {
    moves.forEach((move: any) => {
      const { from, to, piece } = move;
      const startX = 8 - parseInt(from[1]);
      const startY = from.charCodeAt(0) - 'a'.charCodeAt(0);
      const endX = 8 - parseInt(to[1]);
      const endY = to.charCodeAt(0) - 'a'.charCodeAt(0);
      board[endX][endY] = board[startX][startY];
      board[startX][startY] = null;
    });
  };

  const handleSquareClick = (x: number, y: number) => {
    if (selectedPiece) {
      const [startX, startY] = selectedPiece;
      makeMove(startX, startY, x, y);
    } else if (board[x][y] && board[x][y]?.color === player) {
      setSelectedPiece([x, y]);
    }
  };

  const makeMove = async (startX: number, startY: number, endX: number, endY: number) => {
    const from = `${String.fromCharCode(startY + 97)}${8 - startX}`;
    const to = `${String.fromCharCode(endY + 97)}${8 - endX}`;
    const piece = board[startX][startY]?.type;

    try {
      const response = await axios.post(`http://localhost:5000/api/games/${gameId}/move`, { from, to, piece });
      if (response.status === 200) {
        const newBoard = board.map(row => [...row]);
        newBoard[endX][endY] = newBoard[startX][startY];
        newBoard[startX][startY] = null;
        setBoard(newBoard);
        setSelectedPiece(null);
        setTurn(turn === 'w' ? 'b' : 'w');
        setStatus('Move made successfully');
      }
    } catch (error) {
      console.error('Error making move:', error);
      setStatus('Invalid move');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Chess Game</h1>
      <div className="bg-neutral-800 shadow-lg rounded-lg p-4 flex">
        <div className="grid grid-cols-8 gap-1">
          {board.map((row, x) =>
            row.map((piece, y) => (
              <div
                key={`${x}-${y}`}
                onClick={() => handleSquareClick(x, y)}
                className={`w-16 h-16 flex items-center justify-center cursor-pointer`}
                style={{
                  backgroundColor: (x + y) % 2 === 0 ? '#f0d9b5' : '#b58863',
                  border: selectedPiece && selectedPiece[0] === x && selectedPiece[1] === y ? '4px solid yellow' : 'none',
                }}
              >
                {piece && <span className="text-3xl">{pieceImages[piece.type]}</span>}
              </div>
            ))
          )}
        </div>
      </div>
      {status && <div className="status mt-4 text-red-500">{status}</div>}
    </div>
  );
};

export default ChessGame;
