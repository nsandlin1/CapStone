import React, {useState} from 'react'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };


  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-white'>AWARE</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>
          <a href="/">Home</a>
        </li>
        <li className='p-4'>Bill</li>
        <li className='p-4'>Elections</li>
        <li className='p-4'>Politicians</li>
        <li className='p-4'>News</li>
        <li className='p-4'><CgProfile size={28}/></li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300]' : 'fixed left-[-100%]'}>
        <div className='flex'>
          <h1 className='w-full text-3xl font-bold text-white m-4'>AWARE</h1>
          <CgProfile size={68} className='p-3'/>
        </div>
        <ul className='pt-12 uppercase'>
          <li className='p-4 border-b border-gray-600'>Home</li>
          <li className='p-4 border-b border-gray-600'>Bill Summarizer</li>
          <li className='p-4 border-b border-gray-600'>Elections</li>
          <li className='p-4 border-b border-gray-600'>Politicians</li>
          <li className='p-4 border-b border-gray-600'>News</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;