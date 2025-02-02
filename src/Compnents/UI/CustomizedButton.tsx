import React from "react";


interface ButtonProps {
    text: string;
    onClick?: () => void;
}
export const CustomizedButtonMain:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className="bg-[#00C0EA] text-white py-3 w-full rounded-full text-center" onClick={onClick}>{text}</button>
  )
}


export const CustomizedButtonWhite:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className="text-[#00C0EA] bg-white py-3 w-full rounded-full text-center" onClick={onClick}>{text}</button>
  )
}
