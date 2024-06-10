// components/GeneralPopup.tsx
import { useState, useEffect } from "react";

interface GeneralPopupProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const GeneralPopup: React.FC<GeneralPopupProps> = ({
  message,
  isOpen,
  onClose,
}) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-10">
        <h2 className="text-xl font-bold mb-4">Disclaimer</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={handleClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
export default GeneralPopup;
