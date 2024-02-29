import React from 'react'

function Input({value,number}){
  return (
    <div htmlFor={value} key={number}>
      <div className='justify-center items-center ml-9'>
            <h3 className='mt-4 font-semibold text-md'>{value}</h3>
            <input className='mt-1 bg-transparent text-blue-gray-700 h-9 w-11/12 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder={value}/>
        </div>
    </div>
  )
}

export default Input;
