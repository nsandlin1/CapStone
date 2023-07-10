import React, {useState, useEffect} from 'react'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';


function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleResize = () => {
      console.log('Window was resized!');
      
      const windowWidth = window.innerWidth;
      const breakpoint = 768;

      if (windowWidth > breakpoint) {
        setNav(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return() => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='h-24 bg-zinc-800'>
    <div className='navt flex justify-between items-center max-w-[80%] mx-auto px-4 pd-2 text-white bg-zinc-800'>
      <h1 className='w-full text-3xl font-bold text-white'>AWARE</h1>
      <ul className='navbar hidden md:flex '>
        <li className='navitem p-4'>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className='navitem p-4'>
          <NavLink to="/Calendar">Calendar</NavLink>
        </li>
        <li className='navitem p-4 whitespace-nowrap'>
          <NavLink to="/Bills">Summarize Bills</NavLink>
        </li>
        <li className='navitem p-4'>
          <NavLink to="/Elections">Elections</NavLink>
        </li>
        <li className='navitem p-4'>
          <NavLink to="/Politicians">Politicians</NavLink>
        </li>
        <li className='navitem p-4'>
          <NavLink to="/News">News</NavLink>
        </li>
        <li className='navitem p-4'>
          <NavLink to="/Profile">
            <CgProfile size={28}/>
          </NavLink>
        </li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      <div className={nav ? 'mnavbar fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#001500]' : 'fixed hidden'}>
        
        <div className='flex items-center'>
          <h1 className='w-full text-3xl font-bold text-white m-4 pt-3'>AWARE</h1>
          <NavLink to="/Profile">
            <CgProfile size={50} className='navitem m-4 pt-3'/>
          </NavLink>
        </div>
        <ul className='pt-12 uppercase'>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Calendar">Calendar</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Bills">Summarize Bills</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Elections">Elections</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Politicians">Politicians</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/News">News</NavLink>
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar;