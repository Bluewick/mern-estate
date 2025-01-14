import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { set } from 'mongoose'




export default function Profile() {
  const { loading, error, currentUser } = useSelector(state => state.user)
  // let profile = currentUser.avatar
  const profileRef = useRef(null)
  const [file, setFile] = React.useState(null)
  const [filePerc, setFilePerc] = React.useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(null)
  const [userListings, setUserListings] = useState([])
  const dispatch = useDispatch()

  // console.log(formData)
  // console.log(filePerc)
  // console.log(file)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
        // console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // console.log(error)
        setFileUploadError(true)
      }, 
      () => {
        console.log('Upload is complete');
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      }
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      // console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      // console.log(data)
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }

  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
      
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(null)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        setShowListingsError(data.message || 'Error fetching listings')
        return;
      }
      setUserListings(data)

    } catch (error) {
      setShowListingsError(data.message || 'Error fetching listings')
      
    }
  }

  const handleListingDelete = async (e) => {
    try {
      const res = await fetch(`/api/listing/delete/${e}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== e)
      );
    } catch (error) { 
      console.log(error.message);
    }
  }


  return (
    <div className='p-3 max-w-6xl mx-auto'>
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 mx-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='bg-white p-5 rounded-md shadow-md'>
        <div className='flex flex-col items-center justify-center'>
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={profileRef} hidden accept='image/*'  />
          <img onClick={()=>profileRef.current.click()} src={formData.avatar || currentUser.avatar} id="profile-avatar" className='rounded-full h-24 w-24 object-cover cursor-pointer hover:opacity-80 transition-opacity border-2'></img>  
          <p>
            {fileUploadError ? (
              <span className='text-red-600 text-center'>Error Uploading image. Image must be less than 2 mb.</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-green-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? ( 
              <span className='text-green-700'>{`Image uploaded successfully`}</span>
            ) : null}
          </p>
        </div>
        <input onChange={handleChange} defaultValue={currentUser.username} type="text" id="username" placeholder='username' className='border p-3 my-2 rounded-md w-full' />
        <input onChange={handleChange} defaultValue={currentUser.email} type="email" id="email" placeholder='email' className='border p-3 rounded-md my-2 w-full' />
        <input onChange={handleChange}  type="password" id="password" placeholder='password' className='border p-3 rounded-md my-2 w-full' />
        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-md w-full my-2 hover:bg-blue-600 transition-all disabled:opacity-80'>{loading ? 'Loading...' : 'Update Profile'}</button>
        <div className='flex justify-center'>
          <Link className='bg-slate-700 text-white text-center p-3 rounded-md w-full mt-3 my-2 hover:bg-slate-800 transition-all disabled:opacity-80' to={"/create-listing"}>Create Listing</Link>
        </div>
      </form>
      {/* <div className='flex justify-between gap-4 mt-3'>
        <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign Out</span>
      </div> */}

      <div className="flex w-full mt-3 justify-between rounded-lg border border-gray-100 bg-gray-50 p-1">
        <button  onClick={handleDeleteUser}  className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative hover:bg-red-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4" >
            <path
              strokeLinecap="round" strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          Delete Account
        </button>
        <button onClick={handleSignOut}
          className="inline-flex justify-end items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative hover:bg-red-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ef4444"><path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z"/></svg>

          Log Out
        </button>
        </div>
        </div>


      <p className='text-center text-red-500 mt-5'>{error ? error : null}</p>
      <p className='text-center text-green-500 mt-5'>{updateSuccess ? 'Profile updated successfully' : null}</p>

      {/* <button className=''>Show Listing</button> */}
      <div className='mt-3 flex justify-center'>
        {/* <button type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none mx-auto">
          Show Listings</button> */}
          {error && <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Alert!</span> {showListingsError}
            </div>
          </div>}
          <button onClick={handleShowListings} type="button" className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
             Show Listings</button>
      </div>
             
      {showListingsError && <div id="toast-danger" class="fixed flex right-5 bottom-5 z-10 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow " role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">{showListingsError}</div>
    <button onClick={() => setShowListingsError(null)} type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    </div>}

      <div class="grid gap-3 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
      {userListings && userListings.length > 0 && 
        userListings.map((listing, index) => (

          <div key={listing._id} class="group flex flex-col h-full my-3 w-auto sm:w-full bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md  ">
                <Link to={`/listing/${listing._id}`}>
                <div class="overflow-hidden h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
                  <img className='w-full h-full object-cover transition-transform hover:scale-110' src={listing.imageUrls[0]} alt="" />
                </div> 
                <div class="p-3 md:p-3">
                  <p class="mt-2 text-black font-medium hover:text-blue-600 ">
                    {listing.name}
                  </p>
                </div>
                </Link>
                <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 ">
                  <a onClick="" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-blue-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " href="#">
                    Edit
                  </a>
                  <a onClick={()=>handleListingDelete(listing._id)} class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " href="#">
                    Delete
                  </a>
                </div>
              </div>
        ))
      }
      </div> 
    </div>
  )
}

// firebase rules

// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }