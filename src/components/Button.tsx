"use client";

interface ButtonProps {
  onPress: (quantity: number, id: string) => void;
  title: string;
  quantity: number;
  id: string;
}

import React from "react";
const Button = ({ onPress, title, quantity, id }: ButtonProps) => {
  return (
    <button
      className="px-4 py-3 bg-blue-500 cursor-pointer my-5 text-white rounded-md w-full"
      onClick={() => onPress(quantity, id)}
    >
      {title}
    </button>
  );
};

export default Button;
