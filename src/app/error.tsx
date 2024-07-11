'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, ChevronLeft } from 'lucide-react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent  px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Oops! Terdapat Kendala!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </motion.button>
          <Link href="/" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </motion.a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;