'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '../axiosInstance';
import { useUser } from '../../context/UserContext';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(decodeURIComponent(returnUrl));
    }
  }, [user, router, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/login', { identifier, password });
      const data = response.data;
      if (response.status !== 200) {
        throw new Error(data.error || 'Failed to login');
      }
      localStorage.setItem('token', data.token);

      const userResponse = await axiosInstance.get('/users/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      setUser(userResponse.data);

      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(decodeURIComponent(returnUrl));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-2">Username or Email</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
