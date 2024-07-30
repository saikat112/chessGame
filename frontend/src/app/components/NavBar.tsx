'use client';

import * as React from 'react';
import { PlayArrow, Info, Login, PersonAdd, Settings, Logout, Public, People, Computer } from '@mui/icons-material';
import Sidebar from './Sidebar';
import SidebarItem from './SidebarItem';

const NavBar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarItem
        icon={<PlayArrow />}
        text="Play"
        subItems={[
          { icon: <Public />, text: 'Play Online', path: '/play/play-online' },
          { icon: <People />, text: 'Play with Friend', path: '/play/play-with-friend' },
          { icon: <Computer />, text: 'Play with Computer', path: '/play/play-with-computer' },
        ]} />
      <SidebarItem icon={<Info />} text="How to Play" path="/how-to-play" />
      <SidebarItem icon={<Login />} text="Log In" path="/login" />
      <SidebarItem icon={<PersonAdd />} text="Sign Up" path="/sign-up" />
      {/* <SidebarItem icon={<Settings />} text="Settings" path="/settings" />
      <SidebarItem icon={<Logout />} text="Log Out" path="/logout" /> */}
    </Sidebar>
  );
};

export default NavBar;
