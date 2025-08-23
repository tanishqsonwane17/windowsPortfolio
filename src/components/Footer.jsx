import React from 'react'
import windows from  '../../public/images/windowsLogo.png' 
import vscode from  '../../public/images/vscode.png' 
import chrome from  '../../public/images/chrome.png' 
import microsoftstore from  '../../public/images/microsoftstore.png' 
import clock from  '../../public/images/clock.png' 
import files from  '../../public/images/files.png' 
import { Link } from 'react-router'
const Footer = () => {
  return (
    <>
    <div className='h-14 w-full flex justify-end fixed bottom-0  backdrop-blur-3xl'>
      <div className='h-full w-[62%] backdrop-blur-3xl'>
        <ul className='flex h-full items-center gap-5'>
            <li><img className='bg-transparent] h-full w-11' src={windows} alt="" /></li>
            <div className='flex gap-7'>
            <li><img className='bg-transparent] cursor-pointer h-full w-7' src={vscode} alt="" /></li>
            <li><img className='bg-transparent] cursor-pointer h-full w-7' src={chrome} alt="" /></li>
            <li><img className='bg-transparent] cursor-pointer h-full w-7' src={microsoftstore} alt="" /></li>
            <Link to={'/file-explorer'}><li><img className='bg-transparent] cursor-pointer h-full w-7' src={files} alt="" /></li></Link>
            <li><img className='bg-transparent] cursor-pointer h-full w-7' src={clock} alt="" /></li>
            </div>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Footer