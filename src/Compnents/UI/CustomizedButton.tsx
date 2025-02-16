import React from "react";
import { MdDeleteOutline } from "react-icons/md";


interface ButtonProps {
    text?: string;
    onClick?: () => void;
}
export const CustomizedButtonMain:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className="bg-[#00C0EA] text-white py-3 w-full text-base font-semibold rounded-full text-center" onClick={onClick}>{text}</button>
  )
}

export const CustomizedDisableButtonMain:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button type="button" className="bg-[#00C0EA] text-white py-3 w-full text-base font-semibold rounded-full text-center" onClick={onClick}>{text}</button>
  )
}


export const CustomizedButtonWhite:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className="text-[#00C0EA] bg-white py-3 w-full text-base font-semibold rounded-full text-center" onClick={onClick}>{text}</button>
  )
}

export const CustomizedButtonOutline:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className="text-[#00C0EA] border-2 border-[#00C0EA] text-base font-semibold bg-white py-2.5 w-full rounded-full text-center" onClick={onClick}>{text}</button>
  )
}

export const CustomizedDisableButtonOutline:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button type="button" className="text-[#00C0EA] border-2 border-[#00C0EA] text-base font-semibold bg-white py-2.5 w-full rounded-full text-center" onClick={onClick}>{text}</button>
  )
}


export const CustomizedButtonLoading:React.FC<ButtonProps> = ({text}) => {
  return (
    <button className="text-white bg-[#aceafa] py-3 w-full justify-center m-auto text-base rounded-full text-center flex items-center gap-2 cursor-not-allowed">
      <span className="loading loading-spinner loading-base"></span>
      {text}
    </button>
  )
}


export const CustomizedDeletaeButton:React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button type="button" className="bg-red-600 text-base font-semibold lg:flex hidden gap-2 items-center  text-white py-2.5 px-4 w-full rounded-full text-center" onClick={onClick}>
      <MdDeleteOutline className="text-lg"/>{text}
    </button>
  )
}

export const CustomizedDeletaeButtonRounded:React.FC<ButtonProps> = ({onClick}) => {
  return (
    <button type="button" className="bg-red-500 lg:hidden block text-white rounded-full p-2" onClick={onClick}>
      <MdDeleteOutline className="text-xl block"/>
    </button>
  )
}