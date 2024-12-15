import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  FaHome,
  FaUser,
  FaBox,
  FaTags,
  FaShoppingCart,
  FaChartBar,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import Logo from '~/assets/logo/venom-wolf-logo1.png';

import { useSidebar } from '~/context/SidebarContext';
import LocalStorageService from '~/services/LocalStorageService';

const sidebarItems = [
  {
    route: '/dashboard',
    icon: <FaHome className="text-xl" />,
    label: 'Dashboard',
  },
  {
    route: '/users',
    icon: <FaUser className="text-xl" />,
    label: 'User Management',
  },
  {
    route: '/products',
    icon: <FaBox className="text-xl" />,
    label: 'Product Management',
  },
  {
    route: '/categories',
    icon: <FaTags className="text-xl" />,
    label: 'Categories & Tags',
  },
  {
    route: '/orders',
    icon: <FaShoppingCart className="text-xl" />,
    label: 'Order Management',
  },
  // {
  //   route: '/inventory',
  //   icon: <FaClipboardList className="text-xl" />,
  //   label: 'Inventory Management',
  // },
  {
    route: '/reports',
    icon: <FaChartBar className="text-xl" />,
    label: 'Reports & Analytics',
  },
  {
    route: '/marketing',
    icon: <FaBullhorn className="text-xl" />,
    label: 'Marketing',
  },
  // {
  //   route: '/site-content',
  //   icon: <FaFileAlt className="text-xl" />,
  //   label: 'Site Content',
  // },
  // {
  //   route: '/reviews',
  //   icon: <FaStar className="text-xl" />,
  //   label: 'Reviews & Feedback',
  // },
  // {
  //   route: '/logs',
  //   icon: <FaClipboardCheck className="text-xl" />,
  //   label: 'Logs & Activity',
  // },
  {
    route: '/settings',
    icon: <FaCog className="text-xl" />,
    label: 'Settings',
  },
];
const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      LocalStorageService.removeToken();

      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen ${
        isSidebarOpen ? ' w-56' : 'w-16'
      }   transition-all duration-300 border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark dark:text-white`}
    >
      <div className="p-4">
        <div
          className={`text-2xl h-14 font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}
        >
          <Image className="h-18 w-auto mx-auto" src={Logo} alt="Venom wolf" />
        </div>
        <nav className="mt-12 flex flex-col gap-6 ">
          {sidebarItems.map(({ route, icon, label }) => (
            <Link key={route} href={route} passHref>
              <div
                className={`flex items-center cursor-pointer gap-4  ${
                  isSidebarOpen ? 'justify-start' : 'justify-center'
                }`}
              >
                {icon} {isSidebarOpen && label}
              </div>
            </Link>
          ))}

          <div
            onClick={handleLogout}
            className={`flex items-center cursor-pointer gap-4  ${
              isSidebarOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <FaSignOutAlt className="text-xl" /> {isSidebarOpen && 'Logout'}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
