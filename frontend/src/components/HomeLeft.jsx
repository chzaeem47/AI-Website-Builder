import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function HomeLeft() {
  return (
    <div className='relative left-17'>
      
      {/*WELCOME BACK TEXT*/}
      <div className='flex flex-col justify-between gap-3 relative top-35 left-26'>
      <h1 className='text-black text-5xl font-semibold font-serif'>Welcome Back!</h1>
      <p className='text-black font-sans p-3 text-[18px]'>Please enter login details below</p>
      </div>

      {/*LOGIN FORM*/}

      <form className="w-full max-w-[420px] flex flex-col gap-4 relative top-50 left-30">

        <input type="text" placeholder="Email" className="w-150 h-18 px-5 rounded-xl border border-purple-200 bg-white text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100
        text-[26px]"/>
        
        <input type="password" placeholder="Password" className="w-150 h-18 px-5 rounded-xl border border-purple-200 bg-white text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100
        text-[25px]"/>

        <div className="text-right relative left-44">
          <button type="button" className="text-[19px] font-medium text-gray-500 hover:text-purple-600">
            Forgot password?
          </button>
        </div>

        <button type="submit" className="mt-2 h-16 rounded-xl bg-[#171313] text-white hover:bg-black transition
        text-[26px] font-serif w-150">
          Login
        </button>
      </form>


      {/*OR CONTINE WITH LINE*/}

      <div className="flex items-center gap-4 w-full max-w-[420px] my-6 relative top-55 left-52">
        <div className="flex-1 h-px bg-gray-600"></div>

        <span className="text-[20px] text-gray-600 font-medium whitespace-nowrap">or continue with</span>

        <div className="flex-1 h-px bg-gray-600"></div>
      </div>


      {/**LOGIN WITH GOOGLE BUTTOn */}
      <button type="button" className="w-150 h-16 rounded-xl border border-gray-300 bg-white text-black text-[25px] font-medium flex items-center justify-center gap-4 hover:bg-gray-50 transition
      font-serif items-center relative top-60 left-30"><FcGoogle size={38}/>Continue with Google</button>


      {/**SIGNUP */}
      <p className="text-center text-[20px] text-gray-500 mt-3 relative top-85 right-150">Don't have an account?{" "}

      <Link to="/signup" className="text-black font-semibold hover:text-purple-600 transition">SignUp</Link></p>

    </div>

    
  )
}

export default HomeLeft
