'use client';

import React from 'react';
import NavBar from './components/NavBar';
import { UserProvider } from '../context/UserContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="app-container">
            <NavBar />
            <div className="content-container">
              {children}
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
