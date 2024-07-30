'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ChessGame from '../../components/ChessGame'; // Adjust the import path as needed

const PlayWithFriendPage: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [player, setPlayer] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [inviteLink, setInviteLink] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const gameIdParam = searchParams.get('gameId');
    if (gameIdParam) {
      setGameId(gameIdParam);
    }
  }, [searchParams]);

  const createGame = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/games');
      setGameId(response.data._id);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const generateInviteLink = async () => {
    if (!gameId) return;
    try {
      const response = await axios.post(`http://localhost:5000/api/games/${gameId}/invite`);
      setInviteLink(response.data.inviteLink);
    } catch (error) {
      console.error('Error generating invite link:', error);
    }
  };

  const joinGame = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/games/${gameId}/join`, { player });
      setIsJoined(true);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Play with Friend</h1>
      {!gameId ? (
        <button onClick={createGame} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Create Game
        </button>
      ) : !isJoined ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter player name"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="mr-2 px-2 py-1 border rounded"
          />
          <button onClick={joinGame} className="px-4 py-2 bg-green-500 text-white rounded">
            Join Game
          </button>
          <button onClick={generateInviteLink} className="px-4 py-2 bg-yellow-500 text-white rounded ml-2">
            Generate Invite Link
          </button>
          {inviteLink && (
            <div className="mt-2">
              <p>Invite Link:</p>
              <a href={inviteLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">{inviteLink}</a>
            </div>
          )}
        </div>
      ) : (
        <ChessGame gameId={gameId} player={player} />
      )}
    </div>
  );
};

export default PlayWithFriendPage;
