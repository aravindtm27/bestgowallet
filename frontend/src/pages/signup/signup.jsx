import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const {PORT} = require("../../../../backend/index.js");

const Signup = () => {

  const navigate = useNavigate();
  const[username,setUsername] = useState("");
  const[firstname,setFirstname] = useState("");
  const[lastname,setLastname] = useState("");
  const[password,setPassword] = useState("");

  console.log(PORT);

  
async function handleSignup(){
  try{
    const res = await axios.post("http://localhost:4000/api/v1/user/signup",{
      firstName:firstname,
      lastName:lastname,
      username:username,
      password:password,
    });

    localStorage.setItem("token", res.token)
    navigate("/dashboard");
  }catch{
    console.log("request cancelled");
  }
}

function gotoSignin(){
  navigate("/signin")
}

  return (
    <div className='flex justify-center bg-gray-300 h-screen'>
      <div className='mt-40 bg-slate-50 w-96 rounded-xl drop-shadow-2xl h-max lg:w-1/4 p-5'>
        <div className='text-3xl font-bold mt-3 text-center'>
          Sign Up
        </div>  
        <div className='text-center mt-2'>
            Enter your information to create an Account
        </div>
        {/* <Input value="Email" number={1}/>
        <Input value="Firstname" number={2}/>
        <Input value="Lastname" number={3}/>
        <Input value="Lastname" number={3}/> */}
        <div className='justify-center items-center ml-9'>
            <h3 className='mt-4 font-semibold text-md'>Username</h3>
            <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className='justify-center items-center ml-9'>
            <h3 className='mt-4 font-semibold text-md'>Firstname</h3>
            <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="Firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        </div>
        <div className='justify-center items-center ml-9'>
            <h3 className='mt-4 font-semibold text-md'>Lastname</h3>
            <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="Lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
        </div>
        <div className='justify-center items-center ml-9'>
            <h3 className='mt-4 font-semibold text-md'>Password</h3>
            <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div onClick={handleSignup} className='flex items-center justify-center mt-7 h-10 bg-slate-800 w-4/6 rounded-lg ml-auto mr-auto text-slate-100 hover:bg-slate-100 hover:text-slate-800 transition ease-in-out hover:border-2 border-slate-800 cursor-pointer'>
          Sign Up
        </div>
        <div className='flex justify-center mt-3'>Already have an account?<a className='cursor-pointer underline decoration-solid text-cyan-400 hover:text-slate-800' onClick={()=>gotoSignin()}>&nbsp;Sign In</a>&nbsp; here</div>
      </div>
    </div>
  )
}


export default Signup;
