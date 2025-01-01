import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-yellow-100">Fab</span>
          <span className="text-yellow-400">Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-800 p-3 rounded-md flex items-center' action="">
          <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>

                <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/">Home</Link>
                </li>
                <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/about">About</Link>
                </li>
                <li className='text-slate-300 hover:underline'>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/profile">Profile</Link>
                </li>
        </ul>
      </div>
    </header>
  );
}
