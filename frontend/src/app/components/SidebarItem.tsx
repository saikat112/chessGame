'use client';

import React, { useContext } from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { SidebarContext } from './Sidebar';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  path?: string;
  subItems?: Array<{ icon: React.ReactNode; text: string; path: string }>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, path, subItems }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const sidebarContext = useContext(SidebarContext);
  const expanded = sidebarContext?.expanded ?? true;

  const handleClick = () => {
    if (subItems) {
      setOpen(!open);
    } else if (path) {
      router.push(path);
    }
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        {expanded && <ListItemText primary={text} />}
        {subItems && expanded ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItem>
      {subItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem, index) => (
              <ListItem button key={index} onClick={() => router.push(subItem.path)}>
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                {expanded && <ListItemText primary={subItem.text} />}
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
