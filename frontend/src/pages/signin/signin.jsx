import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


const Signin = () => {

  const navigate = useNavigate();
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");

  async function handleSignIn(){
    try{
      const res = await axios.post("https://bestgowallet.vercel.app/api/v1/user/signin",{
        username:username,
        password:password,
      });

      localStorage.setItem("token", res.data.token)
      navigate("/dashboard");
    }catch{
      console.log("error");
    }
  }

  function gotoSignup(){
    navigate("/signup")
  }
  
  return (
    <div className='flex justify-center bg-gray-300 h-screen'>
    <div className='mt-40 bg-slate-50 w-96 rounded-xl drop-shadow-2xl h-max lg:w-1/4 p-5'>
      <div className='text-3xl font-bold mt-3 text-center'>
        Sign In
      </div>  
      <div className='text-center mt-2'>
          Enter your credentials to access your account
      </div>
      <div className='justify-center items-center ml-9'>
          <h3 className='mt-4 font-semibold text-md'>Username</h3>
          <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </div>
      <div className='justify-center items-center ml-9'>
          <h3 className='mt-4 font-semibold text-md'>Password</h3>
          <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div onClick={handleSignIn} className='flex items-center justify-center mt-7 h-10 bg-slate-800 w-4/6 rounded-lg ml-auto mr-auto text-slate-100 hover:bg-slate-100 hover:text-slate-800 transition ease-in-out hover:border-2 border-slate-800 cursor-pointer'>
        Sign In
      </div>
      <div className='flex justify-center mt-3'>New here?<a className='cursor-pointer underline decoration-solid text-cyan-400 hover:text-slate-800' onClick={()=>gotoSignup()}>&nbsp;Sign up</a></div>
    </div>
  </div>
  )
}

export default Signin