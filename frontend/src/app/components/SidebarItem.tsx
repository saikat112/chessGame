'use client';

import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  path?: string;
  subItems?: Array<{ icon: React.ReactNode; text: string; path: string }>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, path, subItems }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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
        <ListItemText primary={text} />
        {subItems ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      {subItems && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((subItem, index) => (
              <ListItem button key={index} onClick={() => router.push(subItem.path)}>
                <ListItemIcon>{subItem.icon}</ListItemIcon>
                <ListItemText primary={subItem.text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
