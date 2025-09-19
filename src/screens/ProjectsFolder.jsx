import React, { useState } from 'react'
import folder from '../../public/images/folder.png'
import { TbArrowsSort } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCutSharp } from "react-icons/io5";
import { BsPlusCircle } from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { LiaPasteSolid } from "react-icons/lia";
import { PiSortAscendingThin } from "react-icons/pi";
import { IoTextOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { SlScreenDesktop } from "react-icons/sl";
import { FcDocument } from "react-icons/fc";
import { PiDownloadSimple } from "react-icons/pi";
import { PiMusicNotesThin } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiHarddrive } from "react-icons/tfi";
import { RiFileVideoFill } from "react-icons/ri";
const ProjectsFolder = () => {
   const projects = [
      {
        projectName:'Devin ai',
        github:"https://github.com/tanishqsonwane17/DevinAi",
        live:"https://bixi-devin.onrender.com/"
      },
      {
        projectName:'Dev tube',
        github:"https://github.com/tanishq/devtube",
        live:"https://devtube.vercel.app"
      },
      {projectName:'Blinkit clone', github:"#", live:"#"},
      {projectName:'Threads_Clone', github:"#", live:"#"},
      {projectName:'Ryder', github:"#", live:"#"},
      {projectName:'Perplaxity', github:"#", live:"#"},
   ]

   const [selectedProject, setSelectedProject] = useState(null);

   return (
    <>
    <div className='h-screen w-full bg-[#1F1F1F] relative'>
        {/* Top bar */}
        <div className='topNav h-12 w-full flex bg-[#1d1d1d] border border-b-[#525252]'>
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
              <TbArrowsSort className='text-white text-xl'/>
              <p className='text-sm text-white'>sort </p>
             </div>
             <div className='flex gap-1 items-center'>
              <PiSortAscendingThin className='text-white text-xl' />
              <p className='text-sm text-white'>view </p>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='h-full w-full flex bg-[#222222]'>
          <div className='leftNav h-full w-[10%] bg-[#222222] backdrop-blur-2xl'>
             <div className='h-full px-6 py-4 text-xs text-white w-full flex flex-col gap-7 '>
               <div className='flex gap-2 items-center cursor-pointer '>
                <FaHome className='text-white text-sm'/>
                <p>Home</p>
               </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <GrGallery className='text-white text-sm'/>
                <p>Gallery</p>
               </div>
               
               <div className='flex gap-2 items-center cursor-pointer '>
                <GrGallery className='text-white text-sm'/>
                <p>Pictures</p>
               </div>
              <div className='flex gap-2 items-center cursor-pointer '>
                <PiMusicNotesThin className='text-white text-sm'/>
                 <p>Music</p>
              </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <RiFileVideoFill className='text-white text-sm'/>
                <p>Videos</p>
               </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <SlScreenDesktop className='text-white text-sm'/>
                <p>This PC</p>
               </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <SlScreenDesktop className='text-white text-sm'/>
                <p>Desktop</p>
               </div>
              <div className='flex gap-2 items-center cursor-pointer '>
                 <FcDocument className='text-white text-sm'/>
                 <p>Documents</p>
              </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <PiDownloadSimple className='text-white text-sm'/>
                <p>Downloads</p>
               </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <RiDeleteBinLine className='text-white text-sm'/>
                <p>Recycle Bin</p>
               </div>
               <div className='flex gap-2 items-center cursor-pointer '>
                <TfiHarddrive className='text-white text-sm'/>
                <p>New Volume</p>
               </div>
             </div>

          </div>
          <div className=' h-full w-[90%] bg-[#1c1c1c] p-4 flex gap-12 flex-wrap'>
            {
              projects.map((item,index)=>(
                <div 
                  key={index} 
                  className='h-12 w-19 rounded-md cursor-pointer flex justify-center items-center my-4 '
                >
                  <div className='flex flex-col w-40 justify-center items-center'>
                    <img 
                      onClick={()=>setSelectedProject(item)}
                      className="h-16 w-full" 
                      src={folder} 
                      alt="folder" 
                    />
                    <p className='text-xs  text-white font-semibold'>{item.projectName}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Popup Modal */}
       {/* Popup Modal */}
{selectedProject && (
  <div 
    className="absolute inset-0 flex items-center justify-center bg-[#1f1f1f77] bg-opacity-60"
    onClick={() => setSelectedProject(null)}  // screen pe click -> close
  >
    <div 
      className="bg-[#2a2a2ac8] p-6 rounded-xl shadow-xl text-center w-80"
      onClick={(e) => e.stopPropagation()} // modal ke andar click ignore
    >
      <h2 className="text-lg font-semibold bg-[#3b3b3b] p-2 rounded-xl text-white mb-4">
        {selectedProject.projectName}
      </h2>
      <div className="flex flex-col gap-4">
        <a 
          href={selectedProject.github} 
          target="_blank" 
          className="bg-[#3b3b3bac] text-white  rounded-xl py-2 hover:bg-[#3b3b3b]"
        >
          Go to GitHub
        </a>
        <a 
          href={selectedProject.live} 
          target="_blank" 
          className="bg-[#3b3b3bac]  text-white py-2 rounded-xl hover:bg-[#3b3b3b]"
        >
          View Live
        </a>
      </div>
    </div>
  </div>
)}

    </div>
    </>
  )
}

export default ProjectsFolder
