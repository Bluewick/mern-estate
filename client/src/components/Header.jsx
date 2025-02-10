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
    if (!searchTerm) return;
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
    <header className="fixed top-0 left-0 block right-0 bg-white bg-opacity-80 backdrop-blur-md text-black w-full z-10" style={{ marginTop: '0px !important'}}>
      <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-blue-500">Fab</span>
          <span className="text-blue-700">Estate</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-gray-100 bg-opacity-60 p-3 rounded-md flex items-center' action="">
          <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64' 
          // value={searchTerm}
          value={searchTerm == null ? "" : searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className='text-gray-800'>
                <FaSearch className='text-gray-800' />
            </button>
        </form>
        <ul className='flex gap-4'>

                <li className='hidden sm:inline text-gray-800 hover:underline'>
                    <Link to="/">Home</Link>
                </li>
                <li className='hidden sm:inline text-gray-800 hover:underline'>
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
            <li className='hidden sm:inline'>
              <Link 
                to="/sign-in" 
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Sign In
              </Link>
            </li>

          )}

        </ul>
      </div>
    </header>
  );
}
