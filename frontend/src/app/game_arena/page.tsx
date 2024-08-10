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
  const [status, setStatus] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const gameIdParam = searchParams.get('gameId');
    if (gameIdParam && !isJoined) {
      setTimeout(() => {
        setGameId(gameIdParam);
        joinGame(gameIdParam);
      }, 300); // Debounce time
    }
  }, [searchParams, isJoined]);


  const joinGame = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Check if the player is already in the game
      const checkResponse = await axiosInstance.get(`/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const isPlayerInGame = checkResponse.data.players.includes(player);
      if (isPlayerInGame) {
        setStatus('You are already part of this game.');
        return;
      }

      // If player is not already in the game, proceed to join
      const response = await axiosInstance.post(`/games/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("response: ---------",response)
      setPlayer(response.data.players.find((p: string) => p !== player));
      setIsJoined(true);
      setStatus('Joined the game successfully.');
    } catch (error) {
      console.error('Error joining game:', error);
      if (axios.isAxiosError(error) && error.response) {
        setStatus('Error joining game.');
      } else {
        setStatus('Unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Game Arena</h1>
      {isJoined ? (
        <ChessGame gameId={gameId} player={player} />
      ) : (
        <p>{status || 'Joining game...'}</p>
      )}
    </div>
  );
};

export default withAuth(GameArenaPage);
