"use client";

import React, { useState } from 'react';

const ProfileEdit: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile saved:', { username, email, avatar });
  };

  return (
    <div className="mb-6">
      <h3 className="text-2xl mb-4 text-primary">Edit Profile</h3>
      <form onSubmit={handleProfileSave}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
