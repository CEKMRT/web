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
    <div
      className="fixed bottom-4 left-4 right-4 p-4 bg-gray-900/90 text-white rounded-lg shadow-lg flex md:flex-row flex-col space-y-2 md:space-y-0 justify-between items-center z-50 shadow-md
      animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in animate-pulse"
    >
      <p className="md:mr-4 text-xs md:text-base text-center text-pretty">
        <a className="text-green-500 font-bold "> Cek MRT Jakarta</a> merupakan
        aplikasi non-resmi dari komunitas developer dalam upaya mendukung serta
        menyebarkan informasi pengunaan transportasi publik.
      </p>
      <button
        onClick={handleClose}
        className="bg-green-500 hover:bg-green-700 text-white fomt-medium md:font-bold py-2 px-2 md:px-4 rounded text-xs md:text-sm
        text-nowrap"
      >
        Ok, Mengerti
      </button>
    </div>
  );
};

export default CookiesPopup;
