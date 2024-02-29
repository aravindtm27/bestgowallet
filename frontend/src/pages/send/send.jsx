import React from 'react'
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 function Send() {
  const[username, setUsername] = useState("");
  const[amt, setAmt] = useState(0);

  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("token");

  async function handleSend(){
    try{
       const res =  await axios.post("http://localhost:4000/api/v1/account/transfer",{to:username, amt:amt},{
        headers: {Authorization : `Bearer ${jwtToken}`}
       });
       alert("transaction successfull");
       navigate("/dashboard");
    }catch(err){
      alert("the transaction couldn't go through");
    }
  }

  return (
    <div className='bg-slate-400 h-screen'>
      <div>
      <Navbar username="User"/>
      </div>
      <div className='bg-slate-200 w-fit m-auto mt-40 p-6 rounded-lg'>
        <div className=' w-96 justify-center flex font-mono text-xl font-extrabold'>
          Send Money to 
          </div>
          <div>
          <input onChange={(e)=>setUsername(e.target.value)} className='ml-3 mt-4 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="Enter receipient username to confirm" value={username}/>
          </div>
          <div>
          <input onChange={(e)=>setAmt(e.target.value)} className='ml-3 mt-4 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="Enter Amount" value={amt}/>
          </div>
          <div onClick={()=>handleSend()} className= 'flex items-center justify-center bg-slate-800 w-32 h-14 mt-4 p-4 ml-28 border-2 box-border text-lg rounded-md text-slate-200 font-mono hover:bg-slate-200 hover:text-slate-800 hover:border-slate-800 hover:border-2'>
            Send
          </div>
         </div>
    </div>
  )
}

export default Send;