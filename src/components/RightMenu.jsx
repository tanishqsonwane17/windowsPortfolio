import React from 'react'
import { CiBoxList } from "react-icons/ci";
import { BsArrowDownUp } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";
import { LuUndo } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { BsPen } from "react-icons/bs";
import { TbTerminal2 } from "react-icons/tb";
const RightMenu = () => {
  return (
    <>
    <div className=' w-50 backdrop-blur-2xl bg-[#d5cece63] rounded-2xl'>
      <ul className='flex flex-col gap-4 px-4 py-4'>
       <div className='flex flex-col gap-2'>
         <li className='flex gap-2 items-center'> <CiBoxList className='inline-block'/> View</li>
        <li className='flex gap-2 items-center' > <BsArrowDownUp className='inline-block'/> Short by</li>
        <li  className='flex gap-2 items-center'> <IoRefresh className='inline-block'/> refresh</li>
       </div>
        <hr className='text-[#00000047]'/>
       <div className='flex flex-col gap-2'>
       <li className='flex gap-2 items-center'> <CiCirclePlus className='inline-block'/> new</li>
         <li className='flex gap-2 items-center'> <LuUndo className='inline-block'/>  undo</li>
       </div>
        <hr className='text-[#00000047]' />
       <div className='flex flex-col gap-2'>
         <li className='flex gap-2 items-center'> <BsPen className='inline-block'/> personalize</li>
        <li className='flex gap-2 items-center'> <TbTerminal2 className='inline-block'/> open in terminal</li>
       </div>
      </ul>
    </div>
    </>
  )
}

export default RightMenu