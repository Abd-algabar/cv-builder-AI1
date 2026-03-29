import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../app/features/authSlice'

const Navbar = () => {
    const [showLogoutMOdel,setShowLogoutModel]=useState(false)
    const {user} =useSelector(state=>state.auth)
    const dispatch=useDispatch()

    const navigate=useNavigate()

    const logoutUser=()=>{
        navigate('/')
        dispatch(logout())

    }
  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
        <img src="/logo.svg" alt=""  className='h-11 w-auto'/>

        </Link>
        <div className='flex items-center gap-4 text-sm'>
            <p>Hi, {user?.name}</p>
            <button onClick={()=>setShowLogoutModel(true)} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
        </div>
      </nav>
      {showLogoutMOdel&&
      <div className='bg-black/25 absolute  top-0 right-0 w-full h-full z-50  flex items-center justify-center'>

        <div className='bg-white px-10 py-6 rounded-md shadow-xl relative w-80' >
          <p> You are logging out. Are you sure?</p>
          <div className='mt-2 flex items-center justify-center gap-6'>
            <button onClick={()=>setShowLogoutModel(false)} className='mt-2 w-20 h-8 rounded-full text-white bg-green-500' >cancel</button>
            <button onClick={logoutUser} className='mt-2 w-20 h-8 rounded-full text-white bg-red-500'>Logout</button>
          </div>
        </div>

      </div>
      }
    </div>
  )
}

export default Navbar
