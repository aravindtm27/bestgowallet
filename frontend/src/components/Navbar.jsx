import React from 'react'

function Navbar({username}) {
  return (
    <div className=' top-0 bg-slate-800 flex justify-between w-full h-16 items-center'>
      <div className='text-slate-50 font-mono font-bold ml-10 text-xl'>BestGo Wallet</div>
      <div className='text-slate-50 font-mono font-bold mr-10 text-xl cursor-pointer'>Hello, {username}</div>
    </div>
  )
}

export default Navbar;
