'use client';

import * as React from 'react';
import { PlayArrow, Info, Login, PersonAdd, Settings, Logout, Public, People, Computer } from '@mui/icons-material';
import Sidebar from './Sidebar';
import SidebarItem from './SidebarItem';
import { useUser } from '../../context/UserContext';

const NavBar: React.FC = () => {
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarItem
        icon={<PlayArrow />}
        text="Play"
        subItems={[
          { icon: <Public />, text: 'Play Online', path: '/play/play_online' },
          { icon: <People />, text: 'Play with Friend', path: '/play/play_with_friend' },
          { icon: <Computer />, text: 'Play with Computer', path: '/play/play_with_computer' },
        ]} />
      <SidebarItem icon={<Info />} text="How to Play" path="/how_to_play" />
      {!user && <SidebarItem icon={<Login />} text="Log In" path="/login" />}
      {!user && <SidebarItem icon={<PersonAdd />} text="Sign Up" path="/sign_up" />}
      {user && <SidebarItem icon={<Settings />} text="Settings" path="/settings" />}
      {/* {user && <SidebarItem icon={<Logout />} text="Log Out" path="/logout" />} */}
    </Sidebar>
  );
};

export default NavBar;
