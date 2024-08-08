'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '../../axiosInstance';
import withAuth from '../../components/withAuth';
import ChessGame from '../../components/ChessGame';

const PlayWithFriendPage: React.FC = () => {
  const [gameId, setGameId] = useState<string>('');
  const [inviteLink, setInviteLink] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const gameIdParam = searchParams.get('gameId');
    if (gameIdParam) {
      setGameId(gameIdParam);
      joinGame(gameIdParam);
    }
  }, [searchParams]);

  const createGame = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axiosInstance.post('/games', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const gameId = response.data._id;
      setGameId(gameId);
      generateInviteLink(gameId);

    } catch (error) {
      console.error('Error creating game:', error);
      setStatus('Error creating game');
    }
  };

  const generateInviteLink = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axiosInstance.post(`/games/${id}/invite`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setInviteLink(response.data.inviteLink);
      setStatus('Invite link generated successfully');
    } catch (error) {
      console.error('Error generating invite link:', error);
      setStatus('Error generating invite link');
    }
  };

  const joinGame = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const checkResponse = await axiosInstance.get(`/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const isPlayerInGame = checkResponse.data.players.includes(player);
      if (isPlayerInGame) {
        setStatus('You are already part of this game.');
        return;
      }

      const response = await axiosInstance.post(`/games/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPlayer(response.data.players.find((p: string) => p !== player));
      setIsJoined(true);
      setStatus('Joined the game successfully.');
    } catch (error) {
      console.error('Error joining game:', error);
      setStatus('Error joining game.');
    }
  };

  const copyToClipboard = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setStatus('Invite link copied to clipboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4"></h1>
      {!gameId && (
        <button onClick={createGame} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Generate Invite Link
        </button>
      )}
      {inviteLink && (
        <div className="mb-4">
          <p>Invite Link:</p>
          <div className="flex items-center">
            <a href={inviteLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2">
              {inviteLink}
            </a>
            <button onClick={copyToClipboard} className="px-2 py-1 bg-gray-300 text-black rounded">
              Copy
            </button>
          </div>
        </div>
      )}
      {isJoined ? (
        <ChessGame gameId={gameId} player={player} />
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
};

export default withAuth(PlayWithFriendPage);
