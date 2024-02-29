import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import { useRecoilState } from 'recoil';
import { receivingUserAtom } from '../../atoms/user';

function Dashboard() {

  let users = []; 
  let userTransactions =[];
 
  const navigate = useNavigate();
  const[userBalance, setUserBalance] = useState(0);
  const[username, setUsername] = useState("User");
  const[searchValue, setSearchValue] = useState("")
  const[userSearch,setUserSearch] = useState(users);
  const[listItems,setlistItems] = useState(users);
  const[searchClick, setSearchClick] = useState(false);
  const[transactions, setTransactions] = useState(userTransactions);
  const[receivingUser, setReceivingUser] = useRecoilState(receivingUserAtom);

  const jwtToken = localStorage.getItem("token");
  
  try{
    axios.get('https://bestgowallet.vercel.app/api/v1/account/balance',{ headers: {Authorization : `Bearer ${jwtToken}`}})
  .then(function(res){
    if(res.status===403||res.status===404){
      navigate("/signin")
    }
    setUserBalance(res.data.balance);
    setUsername(res.data.username);
    setTransactions(res.data.transactions);

  })
  }catch(err){
    navigate("/signin");
  }
  

  function handleSearch(){
    axios.get('https://bestgowallet.vercel.app/api/v1/wallet/users',{ headers: {search : searchValue}})
    .then(function(res){
      setUserSearch(res.data.user);
      console.log(userSearch);
      setSearchClick(true);
    })
  }

  function handleSend({rUser}){
    setReceivingUser(rUser);
    console.log(receivingUser)
    navigate("/send")
  }

  useEffect(()=>{
     setlistItems(userSearch.map((d) => <div class="flex justify-between" key={d.username}><div className='mt-4'>{d.firstName}</div><div onClick={()=>handleSend(d.firstName)} className='bg-slate-800 p-4 ml-32 border-2 box-border rounded-md text-slate-200 font-mono hover:bg-slate-200 hover:text-slate-800 hover:border-slate-800 hover:border-2'>
     Send
   </div></div>))
  },[userSearch]);
  

  return (
    <div className='block bg-slate-400 h-screen'>
      <div>
      <Navbar username={username}/>
      </div>
      <div className='p-10 mt-14 text-xl ml-14 font-mono w-fit bg-slate-200 rounded-md text-slate-800 font-bold border-slate-800 border-solid '>Balance: ${userBalance}</div>
      <div className='flex mb-4 mt-6'>
      <div className='w-4/6'>
      <input className='mt-1 bg-slate-600 text-slate-200 h-9 w-11/12 ml-14 mr-7 outline-1 border-2 border-zinc-400 rounded-md p-2' placeholder="Search" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
      </div>
        <div onClick={()=>handleSearch()} className='cursor-pointer mt-auto mb-auto ml-2 bg-slate-800 p-2 text-slate-200 font-mono rounded-md border-2 hover:bg-slate-200 hover:text-slate-800 hover:border-slate-800 hover:border-2'>Search</div>
      </div>
      <div className={searchClick?'block':'hidden'}> <div className='flex justify-between w-72 ml-14 mt-3 bg-slate-200 p-2 items-center rounded-lg'>
        <div className='ml-4 font-bold text-lg'>
        {listItems} 
        </div>
        
      </div>
      </div>
      <div className='bg-slate-200 ml-14 font-mono w-4/6 p-4 mt-6 rounded-lg'>
        <div className='text-xl font-bold underline underline-offset-4'>Your previous transactions</div>
        <div className='mt-2'>
        {transactions.map((d)=><p>{d}</p>)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
