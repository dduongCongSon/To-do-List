import React, { ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  icon: ReactNode;
  text: string;
  variant?: 'primary' | 'danger' | 'success';
  darkMode?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  type = 'button', 
  icon, 
  text,
  variant = 'primary',
  darkMode = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn ${variant} ${darkMode ? 'dark' : ''}`}
    >
      <span className="icon">
        {icon}
      </span>
      <span className="text">
        {text}
      </span>
    </button>
  );
};

export default Button;