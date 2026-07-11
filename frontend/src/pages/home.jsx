import React from 'react'
import HomeLeftSideBar from '../components/HomeLeftSideBar.jsx';
import HomeBodyHeader from '../components/HomeBodyHeader.jsx';

function Home() {
  return (
    <div className='bg-[#e8eafd] w-screen h-screen'>
    
    <HomeLeftSideBar/>
    <HomeBodyHeader/>

    </div>
  )
}

export default Home
