'use client';

import * as React from 'react';
import { Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { MoreVertical, ChevronLast, ChevronFirst, Edit, LogOut } from 'lucide-react';
import { useContext, createContext, useState, ReactNode, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SidebarContextProps {
  expanded: boolean;
}

interface SidebarProps {
  children: ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuClick = (event: MouseEvent<SVGSVGElement>) => {
    const target = event.currentTarget as EventTarget & SVGSVGElement;
    if (target instanceof HTMLElement) {
      setAnchorEl(target);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout functionality here
    console.log('Logout clicked');
    router.push('/logout'); // Navigate to logout path
    handleMenuClose();
  };

  const handleProfileEdit = () => {
    // Add profile edit functionality here
    console.log('Edit Profile clicked');
    router.push('/profile-edit'); // Navigate to profile edit path
    handleMenuClose();
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <Avatar alt="Saikat" src="/profile-icon.png" sx={{ width: 40, height: 40 }} />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? 'w-52 ml-3' : 'w-0'
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Saikat manna</h4>
              <span className="text-xs text-gray-600">Saikatmanna112@gmail.com</span>
            </div>
            <MoreVertical size={20} className="cursor-pointer" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick} />
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleProfileEdit}>
                <ListItemIcon>
                  <Edit size={20} />
                </ListItemIcon>
                Edit Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogOut size={20} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export { SidebarContext };
export default Sidebar;
    