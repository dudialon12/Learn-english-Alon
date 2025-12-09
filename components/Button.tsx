import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  
  const baseStyles = "font-display font-bold rounded-2xl shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[6px] transition-all duration-150 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-kidBlue text-white hover:bg-blue-400 shadow-blue-200",
    secondary: "bg-white text-kidPurple border-2 border-kidPurple hover:bg-purple-50 shadow-purple-200",
    success: "bg-kidGreen text-white hover:bg-green-500 shadow-green-200",
    danger: "bg-kidPink text-white hover:bg-pink-500 shadow-pink-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-xl",
    lg: "px-10 py-6 text-2xl w-full md:w-auto",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;