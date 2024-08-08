'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '../axiosInstance';
import axios, { AxiosError } from 'axios';
import withAuth from '../components/withAuth';
import ChessGame from '../components/ChessGame';

const GameArenaPage: React.FC = () => {
  const [gameId, setGameId] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const gameIdParam = searchParams.get('gameId');
    if (gameIdParam) {
      setGameId(gameIdParam);
      joinGame(gameIdParam);
    }
  }, [searchParams]);

  const joinGame = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axiosInstance.post(`/games/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlayer(response.data.players.find((p: string) => p !== player)); // Set the player to the other player's ID
      setIsJoined(true);
    } catch (error) {
      console.error('Error joining game:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Game Arena</h1>
      {isJoined ? (
        <ChessGame gameId={gameId} player={player} />
      ) : (
        <p>Joining game...</p>
      )}
    </div>
  );
};

export default withAuth(GameArenaPage);
