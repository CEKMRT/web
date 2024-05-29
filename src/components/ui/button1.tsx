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
      className={`px-4 py-2 rounded-md text-sm ${
        active
          ? "text-white bg-green-600 border-green-700"
          : "text-black bg-slate-50 border-slate-200 hover:bg-green-600 hover:text-white dark:border-slate-800 dark:text-white dark:bg-zinc-800 dark:border-2"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
