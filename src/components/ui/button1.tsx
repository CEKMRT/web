import React from "react";

interface ButtonProps {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, active, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-semibold border transition transform delay-300 duration-300 ease-in-out
      ${
        active
          ? "text-white bg-green-600 border-green-700 scale-105 shadow-lg"
          : "text-black bg-slate-50 border-slate-200 hover:bg-green-600 hover:text-white hover:scale-110 hover:shadow-xl dark:border-slate-800 dark:text-white dark:bg-zinc-800 dark:border-2 animate-pulse"
      }
      ${active ? "animate-pulse" : ""}
    `}
    >
      {children}
    </button>
  );
};

export default Button;
