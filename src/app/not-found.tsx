/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, ChevronLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <FileQuestion className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Oops! Halaman yang kamu cari belum ada.</p>
        <Link href="/" passHref>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali ke Jadwal
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;