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

    <p className='bg-black text-[22px] text-gray-400 font-sans w-150 absolute right-32 bottom-37 text-center'>Turn your ideas into professional websites in minutes Simply type what you want and let AI handle the rest</p>

    <button type="button" onClick={() => setDark(!dark)} className="absolute top-5 left-238 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl shadow-lg z-50 hover:scale-105 transition">
    {dark ? <FaMoon /> : <FaSun />}
    </button>
      
    <HomeLeft dark={dark}/>
    </div>
  )
}

export default Login
