'use client';

import React, { useState } from 'react';
// import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, BottomNavigation, BottomNavigationAction } from '@mui/material';
// import MenuIcon from '@mui
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';

const MobileNavBar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPlayMenuOpen, setIsPlayMenuOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push('/profile'); // Adjust the path based on your routing setup
    handleClose();
  };

  const handleSettingsClick = () => {
    router.push('/settings'); // Adjust the path based on your routing setup
    handleClose();
  };

  const handleHomeClick = () => {
    router.push('/'); // Adjust the path based on your routing setup
    handleClose();
  };

  const handleHowToPlayClick = () => {
    router.push('/how-to-play'); // Adjust the path based on your routing setup
    handleClose();
  };

  const togglePlayMenu = () => {
    setIsPlayMenuOpen(!isPlayMenuOpen);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <img src="/chess-logo.png" alt="Chess Logo" className="w-8 h-8" />
          <div style={{ flexGrow: 1 }}></div>
          <IconButton edge="end" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className="mt-16 mb-16 flex items-center justify-center">
        <img src="/chess-picture-mobile.jpg" alt="Chess" className="w-3/4 rounded-lg shadow-lg" />
      </div>
      <div className="fixed bottom-16 left-0 w-full bg-gray-800 text-white p-4 flex justify-center">
        <button onClick={togglePlayMenu} className="py-2 px-4 bg-blue-600 rounded-lg text-xl w-full">
          Play
        </button>
      </div>
      {isPlayMenuOpen && (
        <div className="fixed bottom-32 left-0 w-full bg-white p-4 text-center shadow-lg">
          <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Play Online</a>
          <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Play with Friend</a>
          <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Play with Computer</a>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <IconButton edge="start" color="inherit" onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleHowToPlayClick}>
          <InfoIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MobileNavBar;
