import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/login.jsx'
import Singup from './pages/singup.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Home from './pages/home.jsx';
import getCurrUser from './hooks/getCurrUser.jsx';
import EditorPage from './pages/EditorPage.jsx';
export const serverURL="http://localhost:3000"


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


    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
