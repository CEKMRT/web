// components/GeneralPopup.tsx
import { useState, useEffect } from 'react';

interface GeneralPopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const GeneralPopup: React.FC<GeneralPopupProps> = ({ message, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);

    if (isVisible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, isVisible, onClose]);

  const handleClose = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Disclaimer dan Kebijakan</h2>
      <p className="mb-4">{message}</p>
      <button 
        onClick={handleClose} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Close
      </button>
    </div>
  );
};

export default GeneralPopup;
