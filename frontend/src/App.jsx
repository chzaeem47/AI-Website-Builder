import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/login.jsx'
import Singup from './pages/singup.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
export const serverURL="http://localhost:3000"


function App() {

  return (
    
    <>
    <ToastContainer />
    <BrowserRouter>
    
    <Routes>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Singup/>}/>


    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
