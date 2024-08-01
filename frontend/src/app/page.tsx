'use client';

import React from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';

const HomePage = () => {
  return (
    <div className="flex">
      {/* <Sidebar> */}
        <LandingPage />
      {/* </Sidebar> */}
      <main className="flex-1 p-4">
        {/* Main content */}
      </main>
    </div>
  );
};

export default HomePage;
