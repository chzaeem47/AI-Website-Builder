import React from 'react'
import HomeLeft from '../components/HomeLeft.jsx'

function Home() {
  return (
    <div className='bg-[url("./home-bg.jpeg")] h-screen w-screen bg-center bg-no-repeat bg-cover overflow-hidden
    image-rendering-[crisp-edges] [-webkit-optimize-contrast] image-rendering-[pixelated]'>

        <p className='bg-black text-[22px] text-gray-400 font-sans w-150 absolute right-32 bottom-37 text-center'>Turn your ideas into professional websites in minutes Simply type what you want and let AI handle the rest</p>
      
    <HomeLeft/>
    </div>
  )
}

export default Home
