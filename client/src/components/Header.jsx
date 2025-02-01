import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [ searchTerm, setSearchTerm ] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(searchTerm)
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');
    setSearchTerm(searchTerm);
  }, [location.search]);

  return (
    <header className="bg-slate-900 text-white">
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-yellow-100">Fab</span>
          <span className="text-yellow-400">Estate</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-800 p-3 rounded-md flex items-center' action="">
          <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className='text-slate-600'>
                <FaSearch className='text-slate-600' />
            </button>
        </form>
        <ul className='flex gap-4'>

                <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/">Home</Link>
                </li>
                <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/about">About</Link>
                </li>
                {/* <li className='text-slate-300 hover:underline'>
                    <Link to="/sign-in">Sign In</Link>
                </li> */}
                {/* <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/sign-up">Sign Up</Link>
                </li> */}
                {/* <li className='hidden sm:inline text-slate-300 hover:underline'>
                    <Link to="/profile">Profile</Link>
                </li> */}

          { currentUser ? (
            <Link to="/profile">
              <img src={currentUser.avatar} alt="avatar" className='w-8 h-8 rounded-full' loading="lazy" />
            </Link>
          ) : (
            <li className='hidden sm:inline text-slate-300 hover:underline'>
              <Link to="/sign-in">Sign In</Link>
            </li>
          )}

        </ul>
      </div>
    </header>
  );
}
