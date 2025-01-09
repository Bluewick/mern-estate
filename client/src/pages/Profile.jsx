import { useSelector } from 'react-redux'
import { useRef, useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'



export default function Profile() {
  const { loading, error, currentUser } = useSelector(state => state.user)
  // let profile = currentUser.avatar
  const profileRef = useRef(null)
  const [file, setFile] = React.useState(null)
  const [filePerc, setFilePerc] = React.useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
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



  return (
    <div className='p-3 max-w-lg mx-auto'>
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
      </form>
      <div className='flex justify-between gap-4 mt-5'>
        <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-center text-red-500 mt-5'>{error ? error : null}</p>
      <p className='text-center text-green-500 mt-5'>{updateSuccess ? 'Profile updated successfully' : null}</p>
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