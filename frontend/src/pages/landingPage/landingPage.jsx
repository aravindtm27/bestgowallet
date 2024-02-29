import React from 'react';
import { useNavigate } from 'react-router-dom';
    
function LandingPage() {

    const navigate = useNavigate();

    function handleSignUp(){
        navigate("/signup");
    }

    function handleSignIn(){
        navigate("/signin");
    }

return (
    <div className=' bg-slate-400 h-screen'>      
        <div className='flex justify-center '>
           <h1 className='mt-96 text-8xl text-slate-800 font-mono font-extrabold'>BestGo Wallet</h1> 
        </div>
        <div className='flex  justify-center mt-14'>
        <div onClick={()=>handleSignUp()} className='mr-6 p-4 bg-slate-800 text-slate-200 font-mono hover:text-slate-800 hover:bg-slate-200 ease-in rounded-md cursor-pointer'>
            Sign Up
        </div>
        <div onClick={()=>handleSignIn()} className='mr-6 p-4 bg-slate-800 text-slate-200 font-mono hover:text-slate-800 hover:bg-slate-200 ease-in rounded-md cursor-pointer'>
            Sign In
        </div>
        </div>
    </div>
)}
    
export default LandingPage;
    