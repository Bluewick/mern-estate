import { useSelector } from 'react-redux'

import React from 'react'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  let profile = currentUser.avatar
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 mx-7'>Profile</h1>
      <form className='bg-white p-5 rounded-md shadow-md'>
        <div className='flex justify-center'>
          <img src={profile} id="profile-avatar" className='rounded-full h-24 w-24 object-cover cursor-pointer hover:opacity-80 transition-opacity border-2'></img>  
        </div>
        <input type="text" id="username" placeholder='username' className='border p-3 my-2 rounded-md w-full' />
        <input type="email" id="email" placeholder='email' className='border p-3 rounded-md my-2 w-full' />
        <input type="password" id="password" placeholder='password' className='border p-3 rounded-md my-2 w-full' />
        <button className='bg-blue-500 text-white p-3 rounded-md w-full my-2 hover:bg-blue-600 transition-all disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between gap-4 mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
