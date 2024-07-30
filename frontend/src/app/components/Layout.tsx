'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'; // Import usePathname
import Sidebar from './Sidebar';
import { ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname

  const hideSidebarRoutes = [
    '/play-online',
    '/play-with-friend',
    '/play-with-computer',
    '/game-arena',
  ];

  const handleBackClick = () => {
    router.push('/');
  };

  // Using nullish coalescing operator to handle null pathname
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname ?? '');

  return (
    <div className="flex h-screen">
      {!shouldHideSidebar && (
        <Sidebar>
          {/* Add necessary children for the Sidebar component if needed */}
          <div>Sidebar Content</div>
        </Sidebar>
      )}
      <div className="flex-1 flex flex-col">
        {shouldHideSidebar && (
          <button
            onClick={handleBackClick}
            className="p-4 flex items-center"
          >
            <ChevronLeft size={24} />
            <span className="ml-2">Back</span>
          </button>
        )}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
