import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center h-24 max-w-[1920px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-white'>AWARE</h1>
      <ul className='flex'>
        <li className='p-4'>Home</li>
        <li className='p-4'>Bill</li>
        <li className='p-4'>Elections</li>
        <li className='p-4'>Politicians</li>
        <li className='p-4'>News</li>
      </ul>
    </div>
  )
}

export default Navbar;