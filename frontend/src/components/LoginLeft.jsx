import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from '../features/firebase.js';
import { serverURL } from '../App.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';

function HomeLeft({dark}) {

const dispatch = useDispatch()
const authGoogle = async()=>{
  try{
    const result = await signInWithPopup(auth,provider)
    console.log(result)

    const {data} = await axios.post(`${serverURL}/api/auth/google`,{
      name:result.user.displayName,
      email:result.user.email,
      avatar:result.user.photoURL

    },{withCredentials:true})
    
    dispatch(setUserData(data.user))

    navigate("/");
   
  }catch(e){
    console.log(e)
  }
}

const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [loading, setloading] = useState(false)
const [error, seterror] = useState("")

const navigate = useNavigate()

const login = async(e)=>{

  try{
  e.preventDefault()
  setloading(true)
  seterror("")

  const {data} = await axios.post(`${serverURL}/api/auth/login`,{
    email,password
  },{withCredentials:true})

dispatch(setUserData(data.user));
  
  toast.success("Login Succesfully or SignUp First",{
    position:'top-left',
    autoClose:700,
    style:{
      width: "400px",
      minHeight: "80px",
      fontSize: "18px",
    }
    })
  
    setemail("")
    setpassword("")
  
    setTimeout(() => {
      navigate("/");
    }, 500);

  }catch(error){
    console.log(error);
    const errMsg = error.response?.data?.message || "Login failed";
    seterror(errMsg);
          
    
  } finally {
      setloading(false);
  }
}


  return (
    <div className='relative w-full flex flex-col justify-center px-6 sm:px-10 md:px-14 
    items-center lg:pl-16 xl:pl-24 py-12 lg:py-0 max-w-2xl mx-auto lg:mx-0'>
      
      {/*WELCOME BACK TEXT*/}
      <div className='flex flex-col gap-3 mb-8 sm:mb-10'>
      <h1 className={`text-3xl sm:text-4xl md:text-5xl font-semibold font-serif ${dark ? "text-purple-500" : "text-black"}`}>Welcome Back!</h1>
      <p className={`font-sans text-base relative left-3 sm:text-[18px] ${dark ? "text-white" : "text-black"}`}>Please enter login details below</p>
      </div>

      {/*LOGIN FORM*/}

      <form className="w-full max-w-[420px] flex flex-col gap-4" onSubmit={login}>

        <input type="text" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}
        className={`w-full h-14 sm:h-16 md:h-18 px-5 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100
        text-lg sm:text-xl md:text-[26px] font-serif ${dark ? "bg-gray-800 text-white placeholder-white border border-black" : "bg-white text-black border border-purple-200"}`}
        />
        
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}
        className={`w-full h-14 sm:h-16 md:h-18 px-5 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100
        text-lg sm:text-xl md:text-[25px] font-serif ${dark ? "bg-gray-800 text-white placeholder-white border border-black" : "bg-white text-black border border-purple-200"}`}
        />

        <div className="text-right w-full">
          <button type="button" className={`text-base sm:text-[19px] font-medium hover:text-purple-600 ${ dark ? "text-gray-200" : "text-gray-500"}`}>
          Forgot password?
          </button>
        </div>

        <button type="submit" disabled={loading} className={`mt-2 h-14 sm:h-16 rounded-xl transition duration-300 hover:scale-105 cursor-pointer
        text-lg sm:text-xl md:text-[26px] font-serif w-full ${dark ? "bg-purple-800 text-white" : "bg-black text-white"}`}>
          {loading ? "Authenticating" : "Login"}
        </button>
      </form>


      {/*OR CONTINE WITH LINE*/}

      <div className="flex items-center gap-4 w-full max-w-[420px] my-6">
        <div className="flex-1 h-px bg-gray-600"></div>

          <span className={`text-base sm:text-[20px] font-medium whitespace-nowrap ${dark ? "text-white" : "text-gray-600"}`}>
          or continue with
          </span>
        <div className="flex-1 h-px bg-gray-600"></div>
      </div>


      {/**LOGIN WITH GOOGLE BUTTOn */}
      <button type="button" className={`w-full max-w-[420px] h-14 sm:h-16 rounded-xl text-lg sm:text-xl md:text-[25px] font-medium flex items-center justify-center gap-4 cursor-pointer transition duration-300 hover:scale-105
      font-serif ${dark ? "bg-gray-800 text-white border border-black" : "bg-white text-black  border border-gray-300"}`}
      onClick={authGoogle}><FcGoogle size={38}/>Continue with Google</button>


      {/**SIGNUP */}
      <p className={`text-center text-base sm:text-[20px] mt-6 w-full max-w-[420px] ${dark ? "text-gray-300" : "text-black"}`}>Don't have an account?{" "}

      <Link to="/signup" className={`font-semibold hover:text-purple-600 transition ${dark ? "text-purple-400" : "text-black"}`}>SignUp</Link></p>

    </div>

    
  )
}

export default HomeLeft