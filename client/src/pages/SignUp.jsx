import { set } from 'mongoose';
import React from 'react'
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
  const [formData, setFormData] = React.useState({ username: '', email: '', password: '' });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false); 
      setError(null);
      navigate('/sign-in');
      // console.log(data);
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
      console.error(error);
      
    }
  };
  return (
    
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col max-w-md mx-auto'>
          <label htmlFor="username" className='text-sm font-semibold'>Username</label>
          <input type="text" id='username' placeholder='username' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2' onChange={handleChange} />
          <label htmlFor="email" className='text-sm font-semibold'>Email</label>
          <input type="email" id='email' placeholder='name@email.com' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'onChange={handleChange}/>
          <label htmlFor="password" className='text-sm font-semibold'>Password</label>
          <input type="password" id='password' placeholder='password' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'onChange={handleChange}/>
          <button disabled={loading} type='submit' className='bg-yellow-400 text-yellow-900 font-semibold p-2 rounded-md my-2 hover:bg-yellow-300 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
        </div>
      </form>
            <div className='text-center mt-4'>
        <p className='text-sm'>Already have an account? <Link to='/sign-in' className='text-blue-600 hover:underline'>Sign In</Link></p>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}
