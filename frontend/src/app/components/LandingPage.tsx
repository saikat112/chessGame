'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import NavBar from './NavBar';
import MobileNavBar from './MobileNavBar';
import SideNavBar from './Sidebar';
import Image from 'next/image';

const LandingPage = () => {
  const router = useRouter();

  const handlePlayOnlineClick = () => {
    router.push('/play/play-online'); // Adjust the path based on your routing setup
  };

  const handlePlayWithFriendClick = () => {
    router.push('/play/play-with-friend'); // Adjust the path based on your routing setup
  };

  const handlePlayWithComputerClick = () => {
    router.push('/play/play-with-computer'); // Adjust the path based on your routing setup
  };

  return (
    <div>
      <div className="hidden md:flex">
        {/* <NavBar /> */}
        {/* <Sidebar/> */}
        <div className="flex-1 flex items-center justify-center">
          <Image src='' alt="Chess" className="w-1/2 rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <button
            onClick={handlePlayOnlineClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-xl hover:bg-blue-700"
          >
            Play Online
          </button>
          <button
            onClick={handlePlayWithFriendClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-xl hover:bg-blue-700"
          >
            Play with Friend
          </button>
          <button
            onClick={handlePlayWithComputerClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-xl hover:bg-blue-700"
          >
            Play with Computer
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <MobileNavBar />
      </div>
    </div>
  );
};

export default LandingPage;
