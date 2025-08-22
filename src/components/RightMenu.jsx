import React from 'react'

const RightMenu = () => {
  return (
    <>
    <div className=' w-40 bg-amber-200 rounded-2xl'>
      <ul className='flex flex-col gap-2 px-4 py-4'>
        <li>View</li>
        <li>Short by</li>
        <li>refresh</li>
        <hr />
        <li>undo</li>
        <li>new</li>
        <hr />
        <li>personalize</li>
        <li>open in terminal</li>
      </ul>
    </div>
    </>
  )
}

export default RightMenu