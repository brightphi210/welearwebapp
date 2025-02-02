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


export const CustomizedButtonLoading:React.FC<ButtonProps> = ({text}) => {
  return (
    <button className="text-white bg-[#aceafa] py-3 w-full justify-center m-auto rounded-full text-center flex items-center gap-2 cursor-not-allowed">
      <span className="loading loading-spinner loading-sm"></span>
      {text}
    </button>
  )
}
