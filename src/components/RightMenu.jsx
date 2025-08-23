import React from 'react'
import { CiBoxList, CiCirclePlus } from "react-icons/ci";
import { BsArrowDownUp, BsPen } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";
import { LuUndo } from "react-icons/lu";
import { TbTerminal2 } from "react-icons/tb";

const RightMenu = ({ onNewFolder }) => {
  return (
    <div className='w-50 backdrop-blur-2xl bg-[#d5cece63] rounded-2xl'>
      <ul className='flex flex-col gap-4 px-2 py-4'>
        <div className='flex flex-col gap-2'>
          <li className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece63] px-4 rounded-2xl'> 
            <CiBoxList /> View
          </li>
          <li className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece63] px-4 rounded-2xl'> 
            <BsArrowDownUp /> Sort by
          </li>
          <li className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece63] px-4 rounded-2xl'> 
            <IoRefresh /> Refresh
          </li>
        </div>
        <hr className='text-[#00000047]' />
        <div className='flex flex-col gap-2'>
          <li
            onClick={onNewFolder}
            className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece63] px-4 rounded-2xl'>
            <CiCirclePlus /> New Folder
          </li>
          <li className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece28] px-4 rounded-2xl'> 
            <LuUndo /> Undo
          </li>
        </div>
        <hr className='text-[#00000047]' />
        <div className='flex flex-col gap-2'>
          <li className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece63] px-4 rounded-2xl'> 
            <BsPen /> Personalize
          </li>
          <li className='flex gap-2 items-center cursor-pointer hover:bg-[#d5cece63] px-4 rounded-2xl'> 
            <TbTerminal2 /> Open in terminal
          </li>
        </div>
      </ul>
    </div>
  )
}

export default RightMenu
