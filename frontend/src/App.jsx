import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/login.jsx'
import Singup from './pages/singup.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/home.jsx';
import getCurrUser from './hooks/getCurrUser.jsx';
import EditorPage from './pages/EditorPage.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import LiveSite from './pages/LiveSite.jsx';
import Pricing from './pages/Pricing.jsx';
export const serverURL="https://ai-website-builder-two-theta.vercel.app"


function App() {

  getCurrUser()
  
  return (
    
    <>
    <ToastContainer />
    <BrowserRouter>
    
    <Routes>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Singup/>}/>
        <Route path='/' element={<Home/>} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/site/:slug" element={<LiveSite/>} />
        <Route path='/pricing' element={<Pricing/>} />

    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
