import React from 'react';
import NavBar from './components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Chess Game',
  description: 'A simple chess game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <NavBar />
          <div className="content-container">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
