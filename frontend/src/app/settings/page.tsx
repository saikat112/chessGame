"use client";

import React from 'react';
import ChessboardBackgroundEdit from '../components/ChessboardBackgroundEdit';
import withAuth from '../components/withAuth';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-hero-pattern bg-cover">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl mb-6 text-center text-primary">Settings</h2>
          <ChessboardBackgroundEdit />
        </div>
      </div>
    </div>
  );
};

export default withAuth(SettingsPage);
