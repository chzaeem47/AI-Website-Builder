import React, { useEffect, useState } from 'react'
import SingupHome from '../components/singupHome.jsx'
import HeroPanel from '../components/HeroPanel.jsx'
import AmbientBackground from '../components/AmbientBackground.jsx'
import { FaMoon,FaSun } from 'react-icons/fa';

function Singup() {

    const [dark, setDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
    });
  
    useEffect(() => {
    localStorage.setItem("darkMode", dark);
    }, [dark]);


  return (

    <div className='relative min-h-screen w-full overflow-x-hidden'>

    <AmbientBackground dark={dark} />

    <button type="button" onClick={() => setDark(!dark)} className="absolute top-4 right-4 sm:top-5 sm:right-6 lg:right-10 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl shadow-lg z-50 hover:scale-105 transition">
        {dark ? <FaMoon /> : <FaSun />}
    </button>

    <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full">

      <div className="flex-1 flex items-center">
        <SingupHome dark={dark}/>
      </div>

      <div className="hidden lg:flex items-center justify-center w-[42%] xl:w-[40%] py-10 pr-10 xl:pr-16">
        <HeroPanel />
      </div>

    </div>

    </div>
    
  )
}

export default Singup