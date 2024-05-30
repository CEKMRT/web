// components/CookiesPopup.tsx
import { useState, useEffect } from "react";

const CookiesPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const isCookieAccepted = localStorage.getItem("cookieAccepted");
    if (!isCookieAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("cookieAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg flex justify-between items-center z-50">
      <p className="mr-4 text-xs md:text-base">
        "Cek MRT Jakarta" MRT Jakarta merupakan aplikasi non-resmi dari
        komunitas developer dalam upaya menyebarkan informasi serta mendukung
        pengunaan transportasi publik.
      </p>
      <button
        onClick={handleClose}
        className="bg-green-500 hover:bg-green-700 text-white fomt-medium md:font-bold py-2 px-2 md:px-4 rounded text-xs md:text-sm"
      >
        Ok, Mengerti
      </button>
    </div>
  );
};

export default CookiesPopup;
