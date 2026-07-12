import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HomeLeftSideBar from '../components/HomeLeftSideBar.jsx';
import HomeBodyHeader from '../components/HomeBodyHeader.jsx';
import HomeMainBody from '../components/HomeMainBody.jsx';
import HomeInputArea from '../components/HomeInputArea.jsx';

function Home() {
  const { darkMode } = useSelector((state) => state.user);

  
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={`w-screen h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0d1117]' : 'bg-[#e8eafd]'}`}>
      
      {/* Props removed as state is now global via Redux */}
      <HomeLeftSideBar />
      <HomeBodyHeader />
      <HomeMainBody />
      <HomeInputArea />

    </div>
  );
}

export default Home;