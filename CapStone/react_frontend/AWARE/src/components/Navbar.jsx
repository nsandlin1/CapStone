import React, {useState, useEffect} from 'react'
import {CgProfile} from 'react-icons/cg'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai' 


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
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-white'>AWARE</h1>
      <ul className='hidden md:flex '>
        <li className='p-4 hover:underline'>
          <a href="/">Home</a>
        </li>
        <li className='p-4 hover:underline whitespace-nowrap'>
          <a href="/summarizer">
            Summarize Bills
          </a>
        </li>
        <li className='p-4 hover:underline'>Elections</li>
        <li className='p-4 hover:underline'>Politicians</li>
        <li className='p-4 hover:underline'>News</li>
        <li className='p-4'><CgProfile size={28}/></li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300]' : 'fixed left-[-100%]'}>
        <div className='flex'>
          <h1 className='w-full text-3xl font-bold text-white m-4 pt-3'>AWARE</h1>
          <CgProfile size={50} className='m-4 pt-3'/>
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