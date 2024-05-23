const Button: React.FC<ButtonProps> = ({children}) => {
  return (
    <button className=" px-4 py-2 rounded-md text-sm text-black bg-slate-50 border border-slate-200 hover:bg-green-600 hover:text-white 
    dark:border-green-400
    dark:font-medium 
    dark:border-2 
    
    ">
      {children}
    </button>
  );
};

export default Button;
