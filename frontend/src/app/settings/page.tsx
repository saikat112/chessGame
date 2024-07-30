"use client";

import React from 'react';
import NavBar from '../components/NavBar';
import ProfileEdit from '../components/ProfileEdit';
import ChessboardBackgroundEdit from '../components/ChessboardBackgroundEdit';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-hero-pattern bg-cover">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl mb-6 text-center text-primary">Settings</h2>
          <ProfileEdit />
          <ChessboardBackgroundEdit />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
