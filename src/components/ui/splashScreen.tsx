'use client';
// components/ui/SplashScreen.tsx
import { useEffect } from 'react';

interface SplashScreenProps {
  duration: number;
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ duration, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-500/40  z-50">
      <div className="text-white text-2xl font-bold">
        Welcome to Our Website!
      </div>
    </div>
  );
};

export default SplashScreen;
