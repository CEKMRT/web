import Link from "next/link";
import { useState, useEffect } from "react";

const AiPop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cookieAccepted, setCookieAccepted] = useState<boolean>(false);

  useEffect(() => {
    const isCookieAccepted = localStorage.getItem("AIcookieAccepted");
    if (!isCookieAccepted) {
      setIsVisible(true);
    } else {
      setCookieAccepted(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("AIcookieAccepted", "true");
    setIsVisible(false);
    setCookieAccepted(true);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-10 left-4 right-4 p-4 bg-gray-900/90 text-white rounded-lg shadow-lg flex md:flex-row flex-col space-y-2 md:space-y-0 justify-between items-center z-50 
      animate-fade-up animate-once animate-duration-1000 animate-delay-500 animate-ease-in   "
    >
      <span className="md:mr-4 text-md md:text-lg text-center text-pretty text-sm z-50">
        <span className="text-green-400 font-bold">
          MRT AI{" "}
          <sup className="font-light text-green-100">
            by CekMRT
          </sup>
        </span>{" "}
        merupakan model bahasa buatan atau{" "}
        <a target="_blank" href="https://en.wikipedia.org/wiki/Generative_pre-trained_transformer" className="italic hover:text-green-300">
          Generative Pre-trained Transformer
        </a>{" "}
        yang masih dalam proses fine-tuning untuk menyesuaikan serta
        mengintergrasikan dengan informasi MRT secara tepat, MRT AI akan/mungkin
        menggunakan informasi yang anda berikan untuk penyesuaian hiperparameter
        atau melatih kembali dengan data tambahan.
      </span>

      <button
        onClick={handleClose}
        className="bg-green-500 hover:bg-green-700 text-white fomt-medium md:font-bold py-2 px-2 md:px-4 rounded text-xs md:text-sm
        text-nowrap"
      >
        Setuju, Jalankan AI
      </button>
    </div>
  );
};

export default AiPop;
