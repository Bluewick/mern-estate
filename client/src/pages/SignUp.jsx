import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import OAuth from '../components/OAuth';


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
        setError("Invalid username or password");
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
    
    // <div>
    //   <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className='flex flex-col max-w-md mx-auto'>
    //       <label htmlFor="username" className='text-sm font-semibold'>Username</label>
    //       <input type="text" id='username' placeholder='username' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2' onChange={handleChange} />
    //       <label htmlFor="email" className='text-sm font-semibold'>Email</label>
    //       <input type="email" id='email' placeholder='name@email.com' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'onChange={handleChange}/>
    //       <label htmlFor="password" className='text-sm font-semibold'>Password</label>
    //       <input type="password" id='password' placeholder='password' className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 my-2'onChange={handleChange}/>
    //       <button disabled={loading} type='submit' className='bg-yellow-400 text-yellow-900 font-semibold p-2 rounded-md my-2 hover:bg-yellow-300 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
    //       <OAuth />
    //     </div>
    //   </form>
    //         <div className='text-center mt-4'>
    //     <p className='text-sm'>Already have an account? <Link to='/sign-in' className='text-blue-600 hover:underline'>Sign In</Link></p>
    //   </div>
    //   {error && <p className='text-red-500 text-center'>{error}</p>}
    // </div>

    <div className="text-gray-900">
    <div className="h-screen flex flex-col items-center justify-center px-6" style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/mern-estate-36c0f.firebasestorage.app/o/Designer%20(39).jpeg?alt=media&token=07ce48d5-91fb-45ad-a82f-bb6516974962')"}}>
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Create Your Account</h1>

        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="username" className="py-2 block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full border border-gray-300 bg-white bg-opacity-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="py-2 block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@email.com"
              className="w-full border border-gray-300 bg-white bg-opacity-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="py-2 block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 bg-white bg-opacity-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white font-semibold p-3 rounded-full hover:bg-gray-800 transition disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <OAuth />

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>

      {error && <p className="text-red-600 font-semibold bg-white bg-opacity-90 rounded-md shadow-md backdrop-blur-lg p-3 absolute top-20 text-center mt-4">{error}</p>}
    </div>
  </div>
  )
}
