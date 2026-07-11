import React from 'react'
import HomeLeftSideBar from '../components/HomeLeftSideBar.jsx';
import HomeBodyHeader from '../components/HomeBodyHeader.jsx';
import HomeMainBody from '../components/HomeMainBody.jsx';
import HomeInputArea from '../components/HomeInputArea.jsx';

function Home() {
  return (
    <div className='bg-[#e8eafd] w-screen h-screen'>
    
    <HomeLeftSideBar/>
    <HomeBodyHeader/>
    <HomeMainBody/>
    <HomeInputArea/>

    </div>
  )
}

export default Home
