import React, { useRef } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';

export default function CreateListing() {
  const [files, setFiles] = React.useState([]);
  const imagesRef = useRef(null);
  const [formData, setFormData] = React.useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);


  console.log(formData);
  // console.log(files);

    const handleDragOver = (e) => {
      e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFiles = e.dataTransfer.files; // Get the dropped files
      setFiles(Array.from(droppedFiles)); // Convert FileList to an array
    };

    const handleImageSubmit = (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
        setUploading(true);
        setImageUploadError(null);
        const promises = [];

        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }

        Promise.all(promises).then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          setFiles([]);
          
        }).catch((error) => {
          setImageUploadError("Image Upload failed (max 2MB)");
          setUploading(false);
        })
      
      } else if (files.length ===0) {setImageUploadError("Please select images to upload")}
      
       else {
        setImageUploadError("Maximum 6 images allowed");
        setUploading(false);
      }
    }

    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '_'+  file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        )
      
      });
    }

    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    }

  
  return (
    <main>
        <h1 className='text-center text-2xl font-bold mt-6'>Create Listing</h1>
        <form className='flex flex-wrap flex-col sm:w-[600px] mx-auto gap-4'>
            <div>
              
                <div className="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
                    1 
                  </span>
                  <p className='px-3'>Basic Information</p>
                </div>
                <div className='mx-3 px-5 border-l-2 border-gray-200'>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder='Name' className='border p-3 rounded-md my-2 w-full' required maxLength={62} minLength={10} />
                  <label htmlFor="description">Description</label>
                  <textarea id="description" placeholder='Description' className='border p-3 rounded-md my-2 w-full' required maxLength={200} minLength={10} />
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" placeholder='Address' className='border p-3 rounded-md my-2 w-full' required maxLength={200} minLength={10} />
                  <label htmlFor="price">Price</label>
                  <input type="number" id="price" placeholder='Price' className='border p-3 rounded-md my-2 w-full' required  />
                </div>

                <div className="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
                    2 
                  </span>
                  <p className='px-3'>Property Features</p>
                </div>
                
                <div className='flex gap-2 flex-wrap items-center my-2 mx-3 px-5 border-l-2 border-gray-200'>
                  <div className='flex gap-2 bg-slate-100 p-3 border-s-blue-800 rounded-xl'>
                    <input type="checkbox" id="sell" className='w-5 h-5' />
                    <label htmlFor="sell" className='text-sm text-semibold px-2  rounded-md'>Sell</label>
                  </div>
                  <div className='flex gap-2 bg-slate-100 p-3 border-s-blue-800 rounded-xl'>
                    <input type="checkbox" id="rent" className='w-5 h-5' />
                    <label htmlFor="rent" className='text-sm text-semibold px-2  rounded-md'>Rent</label>
                  </div>
                  <div className='flex gap-2 bg-slate-100 p-3 border-s-blue-800 rounded-xl'>
                    <input type="checkbox" id="parking" className='w-5 h-5' />
                    <label htmlFor="parking" className='text-sm text-semibold px-2  rounded-md'>Parking spot</label>
                  </div>
                  <div className='flex gap-2 bg-slate-100 p-3 border-s-blue-800 rounded-xl'>
                    <input type="checkbox" id="furnished" className='w-5 h-5' />
                    <label htmlFor="furnished" className='text-sm text-semibold px-2  rounded-md'>Furnished</label>
                  </div>
                  <div className='flex gap-2 bg-slate-100 p-3 border-s-blue-800 rounded-xl'>
                    <input type="checkbox" id="offer" className='w-5 h-5' />
                    <label htmlFor="offer" className='text-sm text-semibold px-2  rounded-md'>Offer</label>
                  </div>
                  <div className='flex flex-wrap gap-5 p-5 rounded-xl border-2  border-gray-100 w-full'>
                    <div className='flex items-center gap-2'>
                      <input type="number" id='bedrooms' defaultValue={1} min='1' max='10' required className='p-3 border border-grey-300 rounded-md' />
                      <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <input type="number" id='bathrooms' defaultValue={1} min='1' max='10' required className='p-3 border border-grey-300 rounded-md' />
                      <p>Baths</p>
                    </div>
                    </div>
                </div>

                <div className="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
                    3 
                  </span>
                  <p className='px-3'>Pricing</p>
                </div>

                  <div className='flex flex-wrap gap-3 my-3 mx-3 px-5 border-l-2 border-gray-200'>

                    <div className='flex items-center gap-2'>
                      <input type="number" id='regularPrice' defaultValue={1} min='1' max='10' required className='p-3 border border-grey-300 rounded-md' />
                      <div className='flex flex-col items-start'>
                        <p>Regular Price</p>
                        {/* <span className='text-xs'>($ / month)</span> */}
                        <span className="inline-flex items-center bg-yellow-500 text-yellow-500 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-100 dark:text-yellow-500">
                          {/* <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span> */}
                          $ / month
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='discountedPrice' defaultValue={1} min='1' max='10' required className='p-3 border border-grey-300 rounded-md' />
                      <div className='flex flex-col items-start'>
                        <p>Discounted Price</p>
                        {/* <span className='text-xs'>($ / month)</span>
                         */}
                        <span className="inline-flex items-center bg-yellow-500 text-yellow-500 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-100 dark:text-yellow-500">
                          {/* <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span> */}
                          $ / month
                        </span>
                      </div>
                    </div>
                  </div>

                <div className="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span className="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
                    4 
                  </span>
                  <p className='px-3'>Images</p>
                </div>

                <div className='flex flex-wrap gap-3 my-3 mx-3 px-5 border-l-2 border-gray-200'>
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 ">First image will be cover</span>
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 ">maximum 6</span>
                  
                  <div onDragOver={handleDragOver} onDrop={handleDrop} className="flex items-center justify-center w-full">
                      <label  htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                          <div  onClick={()=>imagesRef.current.click()} className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input onChange={(e)=>setFiles(e.target.files)} id="images" multiple type="file" accept='image/*' ref={imagesRef} className="hiddenm" />
                      </label>
                  </div> 

                  <button disabled={uploading} type="button" onClick={handleImageSubmit} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:bg-yellow-500 disabled:opacity-70">{uploading ? 'Uploading...' : 'Upload'}</button>
                <p className='text-red-500 px-4 py-1 mt-2 bold'>{imageUploadError && <span className='text-red-500 px-4 py-1 mt-2 bg-red-100 rounded-md'>{imageUploadError}</span>}</p>
                <div className='flex flex-wrap w-full gap-1 mx-2 my-2 p-2 rounded-md bg-gray-50 border-2 border-dashed border-gray-200'>

                {
                  formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                    <div className='relative'>
                      <img key={url} src={url} alt="listing image" className='w-20 h-20 object-cover rounded-md' />
                      <p>{formData.imageUrls.length - index}</p>
                      <button  type="button" onClick={() => handleRemoveImage(index)} className='opacity-100  absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-200 border-2 border-white rounded-full -top-2 -end-2 hover:bg-red-600 hover:text-white hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer'>X</button>
                      {/* <div class="opacity-0  absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 hover:bg-red-600 hover:text-white hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer">X</div> */}
                    </div>
                    
                  ))
                }
                </div>
                </div>
                <div className='my-10 mx-3'>

                <button type="button" className="my-5 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Create Listing</button>
                
                </div>
            </div>
        </form>
    </main>
  )
}
