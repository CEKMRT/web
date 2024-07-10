'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHome, FaCalendarAlt, FaRobot, FaUserAlt } from 'react-icons/fa';

const MobileNavigation = () => {
  const currentPath = usePathname();

  const navItems = [
    { href: '/', label: 'Jadwal', icon: FaCalendarAlt },
    { href: '/ai', label: 'MRT AI', icon: FaRobot },
    { href: '/aa', label: 'Home', icon: FaHome },
    { href: '/profile', label: 'Profile', icon: FaUserAlt },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              className={`flex flex-col items-center ${
                currentPath === item.href
                  ? 'text-emerald-600 dark:text-emerald-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="text-xl mb-1" />
              <span className="text-xs">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;