import React, {useState, useEffect} from 'react'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';

function logout() {
  localStorage.removeItem('user');
  window.location.reload();
}

export const StuNavbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleResize = () => {
      console.log('Window was resized!');
      
      const windowWidth = window.innerWidth;
      const breakpoint = 868;

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
    <div className='navt bg-lightred'>
    <div className='navt flex justify-between items-center max-w-[80%] mx-auto px-4 pd-2 text-white bg-lightred'>
      <h1 className='w-full text-3xl font-bold text-white'>AWARE</h1>
      <ul className='navbar hidden navbar:flex '>
        <li className='navitem p-4'>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className='navitem p-4'>
            <NavLink to="/Quiz">Quizzes</NavLink>
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
        <li className='navitem p-4 font-bold hover:cursor-pointer' onClick={() => logout()}>
          Logout
          {/* <NavLink to="/Profile">
            <CgProfile size={28}/>
          </NavLink> */}
        </li>
      </ul>
      <div onClick={handleNav} className='block navbar:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      <div className={nav ? 'mnavbar fixed z-50 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-lightred' : 'fixed hidden'}>
        
        <div className='flex items-center'>
          <h1 className='w-full text-3xl font-bold text-white m-4 pt-3'>AWARE</h1>
        </div>
        <ul className='pt-12 uppercase'>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/" onClick={handleNav}>Home</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Quiz" onClick={handleNav}>Quizzes</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Calendar" onClick={handleNav}>Calendar</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Bills" onClick={handleNav}>Summarize Bills</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Elections" onClick={handleNav}>Elections</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Politicians" onClick={handleNav}>Politicians</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/News" onClick={handleNav}>News</NavLink>
          </li>
          <li className='navitem p-4 font-bold' onClick={() => logout()}>
            Logout
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export const TeachNavbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleResize = () => {
      console.log('Window was resized!');
      
      const windowWidth = window.innerWidth;
      const breakpoint = 868;

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
    <div className='navt bg-lightred'>
    <div className='navt flex justify-between items-center max-w-[80%] mx-auto px-4 pd-2 text-white bg-lightred'>
      <h1 className='w-full text-3xl font-bold text-white'>AWARE</h1>
      <ul className='navbar hidden navbar:flex '>
        <li className='navitem p-4 whitespace-nowrap'>
          <NavLink to="/Mock">Mock Ballots</NavLink>
        </li>
        <li className='navitem p-4 whitespace-nowrap'>
          <NavLink to="/Quizzes">Quizzes</NavLink>
        </li>
        <li className='navitem p-4'>
          <NavLink to="/Classes">Classes</NavLink>
        </li>
        <li className='navitem p-4 font-bold hover:cursor-pointer' onClick={() => logout()}>
          Logout
        </li>
      </ul>
      <div onClick={handleNav} className='block navbar:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      <div className={nav ? 'mnavbar fixed z-50 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-lightred' : 'fixed hidden'}>
        
        <div className='flex items-center'>
          <h1 className='w-full text-3xl font-bold text-white m-4 pt-3'>AWARE</h1>

        </div>
        <ul className='pt-12 uppercase'>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Classes" onClick={handleNav}>Classes</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Mock" onClick={handleNav}>Mock Ballots</NavLink>
          </li>
          <li className='navitem p-4 border-b border-gray-600'>
            <NavLink to="/Quizzes" onClick={handleNav}>Quizzes</NavLink>
          </li>
          <li className='navitem p-4' onClick={() => logout()}>
            Logout
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}