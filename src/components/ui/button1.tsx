import React from "react";

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className=" px-4 py-2 rounded-md text-sm text-black bg-slate-50 border border-slate-200 hover:bg-green-600 hover:text-white 
    dark:border-green-800
    dark:text-white
    dark:bg-zinc-800
    dark:border-2 
    
    ">
      {children}
    </button>
  );
};

export default Button;
