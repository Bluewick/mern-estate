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
    <div className="h-screen flex flex-col items-center justify-center px-6" style={{ backgroundImage: "url('https://home.microsoftpersonalcontent.com/contentstorage/coJsE0OdIkqu2uEOCncHOQAAAAAAAAAAaH-m4vddi7M/_layouts/15/download.aspx?UniqueId=c74f74ea-13ec-4876-bb85-1a66b822f18b&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJmOWU1NmFlMS01MTM1LTQ2YTctOWJmOC04ZjM1M2IyYTU5NjYiLCJhcHBfZGlzcGxheW5hbWUiOiJEZXNpZ25lciIsImFwcGlkIjoiNWUyNzk1ZTMtY2U4Yy00Y2ZiLWIzMDItMzVmZTVjZDAxNTk3IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2hvbWUubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJleHAiOiIxNzM5MTIwNDY2In0.on9YXzpFzUR7lNHcfoxUNpEotRVfKN3z96pfZY8eEUY5MUC_w7FiTCTFSnK_r9tCishrZBIj8bmu__IjF6nuvAk5njfkNzFy1Xkimowsev9AwiM8gDt396KH7BwM3iTIzfSn2R-NXSBlrrfAoTBs1bKrrCmEFCpW6NBmLV5Pa8C-xx-H_-vIjeS3pLknkxh10y3hwB2AdiNZsRjbh7OHQEZ4KpcEvAKN773GCyVT3UE-VZN-oXoFcwnduujiqNaRIVVRnYm4SBBlovsDFIHFddzlcSKGioIxMt2EM_4ITaVZvruptP2eKOhKloc_2kkLAfKmKy2_-vspH8BQ-n4M2PMAaPy7g1wOg64X8th7STkrofH-GMpMx_rtQc6wrO-TRVQ69YkUUfGISRAwsmwX709JInURxvm2VsmltSlB-l8.9Z-QgtWD-LkxvbVsy1Etmb7NOOitl6ckT57zAfZ6RVg&ApiVersion=2.1')"}}>
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
