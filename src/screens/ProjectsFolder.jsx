import React from 'react'
import folder from '../../public/images/folder.png'
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
        <div className='h-20 w-full bg-[#1d1d1d] border'></div>
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