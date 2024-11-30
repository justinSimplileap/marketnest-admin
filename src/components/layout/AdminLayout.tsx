import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useSidebar } from '~/context/SidebarContext';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafa] dark:bg-black text-black dark:text-white">
      <Sidebar />
      <div
        className={`ml-auto flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'w-[calc(100%-14rem)]' : 'w-[calc(100%-4rem)]'
        }`}
      >
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Topbar
            sidebarOpen={undefined}
            setSidebarOpen={function (arg0: boolean): void {
              throw new Error('Function not implemented.');
            }}
          />
          <main>
            <div className={`p-8 mb-4 transition-all duration-300  `}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
