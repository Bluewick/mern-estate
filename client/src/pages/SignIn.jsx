import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  // const [error, setError] = React.useState(null);
  // const [loading, setLoading] = React.useState(false);
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart());
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false); 
      // setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError('An error occurred. Please try again later.');
      dispatch(signInFailure(error.message));
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col max-w-md mx-auto'>
          <label htmlFor="email" className='text-sm font-semibold'>Email</label>
          <input type="email" id='email' placeholder='name@email.com' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2' onChange={handleChange} />
          <label htmlFor="password" className='text-sm font-semibold'>Password</label>
          <input type="password" id='password' placeholder='password' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2' onChange={handleChange} />
          <button disabled={loading} type='submit' className='bg-yellow-400 text-yellow-900 font-semibold p-2 rounded-md my-2 hover:bg-yellow-300 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
        </div>
      </form>
      <div className='text-center mt-4'>
        <p className='text-sm'>Don't have an account? <Link to='/sign-up' className='text-blue-600 hover:underline'>Sign Up</Link></p>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}
