import React from 'react'
import folder from '../../public/images/folder.png'
import { TbArrowsSort } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCutSharp } from "react-icons/io5";
import { BsPlusCircle } from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { LiaPasteSolid } from "react-icons/lia";
import { PiSortAscendingThin } from "react-icons/pi";
import { IoTextOutline } from "react-icons/io5";
const ProjectsFolder = () => {
   const projects = [
      {projectName:'Devin ai '},
      {projectName:'Dev tube'},
      {projectName:'Blinkit clone'},
      {projectName:'Threads_Clone'},
      {projectName:'Ryder'},
      {projectName:'Perplaxity'},
   ]
  return (
    <>
    <div className='h-screen w-full bg-[#1F1F1F]'>
        <div className='h-12 w-full flex bg-[#1d1d1d] border border-b-[#525252]'>
          <div className='h-full  gap-2 flex px-8 items-center'>
            <BsPlusCircle className='text-white'/>
            <p className='text-white text-sm font-extralight'>New</p>
          </div>
          <div className='h-full w-[1px] bg-[#525252]'></div>
          <div className='h-full flex gap-8 items-center mx-4'>
            <IoCutSharp className='text-[#6b6b6b] rotate-270 text-lg'/> 
            <VscCopy className='text-[#6b6b6b] text-lg'/>  
            <LiaPasteSolid className='text-[#6b6b6b] text-lg'/>
            <IoTextOutline className='text-[#6b6b6b] text-lg'/>
            <RiDeleteBin5Line className='text-[#6b6b6b] text-lg'/>
          </div>
          <div className='h-full w-[1px] bg-[#525252]'></div>

          <div className='h-full flex gap-8 w-full p-2'>
             <div className='flex gap-1 items-center'>
              <TbArrowsSort className='text-[#466eff] text-xl'/>
              <p className='text-sm text-white'>sort </p>
             </div>
             <div className='flex gap-1 items-center'>
              <PiSortAscendingThin className='text-white text-xl' />
              <p className='text-sm text-white'>view </p>
             </div>
          </div>
        </div>
        <div className='h-full w-full flex bg-[#222222]'>
        <div className='h-full w-[10%] bg-[#222222] backdrop-blur-2xl'></div>
        <div className='h-full w-[90%] bg-[#1c1c1c] p-4 flex gap-12'>
       {
         projects.map((item,index)=>{
            return(
                 <div key={index} className='h-12 w-19 rounded-md cursor-pointer flex justify-center items-center my-4 '>
           <div className='flex flex-col w-40 justify-center items-center'>
          <img className=" h-16 w-full" src={folder} alt="folder" />
            <p className='text-xs  text-white font-semibold'>{item.projectName}</p>
           </div>
         </div>
            )
         })
       }
        </div>
        </div>
    </div>
    </>
  )
}

export default ProjectsFolder