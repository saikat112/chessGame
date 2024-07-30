'use client';

import * as React from 'react';
import { useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarContext } from './Sidebar';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  path?: string;
  subItems?: { icon: ReactNode; text: string; path: string }[];
  active?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, path, subItems, active, alert }) => {
  const context = useContext(SidebarContext);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar');
  }

  const { expanded } = context;

  const handleClick = () => {
    if (path) {
      router.push(path);
    }
    if (subItems) {
      setOpen(!open);
    }
  };

  return (
    <>
      <li
        onClick={handleClick}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
          transition-colors group ${
            active
              ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
              : 'hover:bg-indigo-50 text-gray-600'
          }`}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
          {text}
        </span>
        {subItems && (
          <span className="ml-auto">
            {open ? <ExpandLess /> : <ExpandMore />}
          </span>
        )}
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? '' : 'top-2'
            }`}
          />
        )}
      </li>
      {open && subItems && (
        <ul className="pl-4">
          {subItems.map((subItem, index) => (
            <SidebarItem
              key={index}
              icon={subItem.icon}
              text={subItem.text}
              path={subItem.path}
              active={active}
              alert={alert}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SidebarItem;
