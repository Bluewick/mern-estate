import React from 'react'
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form>
        <div className='flex flex-col max-w-md mx-auto'>
          <label htmlFor="username" className='text-sm font-semibold'>Username</label>
          <input type="text" id='username' placeholder='username' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'/>
          <label htmlFor="email" className='text-sm font-semibold'>Email</label>
          <input type="email" id='email' placeholder='name@email.com' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'/>
          <label htmlFor="password" className='text-sm font-semibold'>Password</label>
          <input type="password" id='password' placeholder='password' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'/>
          <button type='submit' className='bg-yellow-400 text-yellow-900 font-semibold p-2 rounded-md my-2 hover:bg-yellow-300'>Sign Up</button>
        </div>
      </form>
            <div className='text-center mt-4'>
        <p className='text-sm'>Already have an account? <Link to='/sign-in' className='text-blue-600 hover:underline'>Sign In</Link></p>
      </div>
    </div>
  )
}
