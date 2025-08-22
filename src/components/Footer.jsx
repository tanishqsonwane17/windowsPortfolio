import React from 'react'
import windows from  '../../public/images/windowsLogo.png' 
import vscode from  '../../public/images/vscode.png' 
import chrome from  '../../public/images/chrome.png' 
import microsoftstore from  '../../public/images/microsoftstore.png' 
import clock from  '../../public/images/clock.png' 
import files from  '../../public/images/files.png' 
const Footer = () => {
  return (
    <>
    <div className='h-14 w-full  flex justify-end fixed bottom-0  backdrop-blur-3xl'>
      <div className='h-full w-[62%] backdrop-blur-3xl'>
        <ul className='flex h-full items-center gap-5'>
            <li><img className='bg-transparent] h-full w-10' src={windows} alt="" /></li>
            <li><img className='bg-transparent] h-full w-6' src={vscode} alt="" /></li>
            <li><img className='bg-transparent] h-full w-6' src={chrome} alt="" /></li>
            <li><img className='bg-transparent] h-full w-6' src={microsoftstore} alt="" /></li>
            <li><img className='bg-transparent] h-full w-6' src={files} alt="" /></li>
            <li><img className='bg-transparent] h-full w-6' src={clock} alt="" /></li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Footer