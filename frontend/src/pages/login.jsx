import React, { useEffect, useState } from 'react'
import HomeLeft from '../components/LoginLeft.jsx'
import { FaSun, FaMoon } from "react-icons/fa";

function Login() {

  const [dark, setDark] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
  localStorage.setItem("darkMode", dark);
  }, [dark]);


  return (
    <div className='h-screen w-screen bg-center bg-no-repeat bg-cover overflow-hidden
    image-rendering-[crisp-edges] [-webkit-optimize-contrast] image-rendering-[pixelated]'
    style={{backgroundImage: `url(${dark ? "/dark-bg.jpeg" : "/light-bg.jpeg"})`}}>


    <button type="button" onClick={() => setDark(!dark)} className="absolute top-5 left-238 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl shadow-lg z-50 hover:scale-105 transition">
    {dark ? <FaMoon /> : <FaSun />}
    </button>
      
    <HomeLeft dark={dark}/>
    </div>
  )
}

export default Login
