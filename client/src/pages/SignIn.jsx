import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

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
    // <div className='h-screen'>
    //   <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className='flex flex-col max-w-md mx-auto'>
    //       <label htmlFor="email" className='text-sm font-semibold'>Email</label>
    //       <input type="email" id='email' placeholder='name@email.com' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2' onChange={handleChange} />
    //       <label htmlFor="password" className='text-sm font-semibold'>Password</label>
    //       <input type="password" id='password' placeholder='password' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2' onChange={handleChange} />
    //       <button disabled={loading} type='submit' className='bg-yellow-400 text-yellow-900 font-semibold p-2 rounded-md my-2 hover:bg-yellow-300 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
    //       <OAuth />
    //     </div>
    //   </form>
    //   <div className='text-center mt-4'>
    //     <p className='text-sm'>Don't have an account? <Link to='/sign-up' className='text-blue-600 hover:underline'>Sign Up</Link></p>
    //   </div>
    //   {error && <p className='text-red-500 text-center'>{error}</p>}
    // </div>

        <div className="text-gray-900">

      <div className="h-screen flex flex-col items-center justify-center px-6" style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/mern-estate-36c0f.firebasestorage.app/o/Designer%20(39).jpeg?alt=media&token=07ce48d5-91fb-45ad-a82f-bb6516974962')"}}>
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center mb-6">Welcome Back</h1>

          <div className="flex flex-col space-y-4 ">
            <div>
              <label htmlFor="email" className="block text-sm py-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@email.com"
                className="w-full border bg-white bg-opacity-50 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm py-2 font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full border bg-white bg-opacity-50 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white font-semibold p-3 rounded-full hover:bg-gray-800 transition disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            <OAuth />

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>

        {error && <p className="text-red-600 font-semibold bg-white bg-opacity-90 rounded-md shadow-md backdrop-blur-lg p-3 absolute top-20 text-center mt-4">{error}</p>}
      </div>
    </div>
  )
}
