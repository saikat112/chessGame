"use client";

import React, { useState } from 'react';

const ChessboardBackgroundEdit: React.FC = () => {
  const [background, setBackground] = useState('');

  const handleBackgroundSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your background saving logic here
    console.log('Background saved:', background);
  };

  return (
    <div>
      <h3 className="text-2xl mb-4 text-primary">Edit Chessboard Background</h3>
      <form onSubmit={handleBackgroundSave}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="background">
            Background URL
          </label>
          <input
            type="text"
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Background
        </button>
      </form>
    </div>
  );
};

export default ChessboardBackgroundEdit;
