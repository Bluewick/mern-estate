import React from 'react'

export default function CreateListing() {
  return (
    <main>
        <h1 className='text-center text-2xl font-bold mt-6'>Create Listing</h1>
        <form className='flex flex-wrap flex-col sm:w-[600px] mx-auto gap-4'>
            <div>
              
                <div class="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span class="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
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

                <div class="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span class="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
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

                <div class="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span class="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
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
                        <span class="inline-flex items-center bg-yellow-500 text-yellow-500 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-100 dark:text-yellow-500">
                          {/* <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span> */}
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
                        <span class="inline-flex items-center bg-yellow-500 text-yellow-500 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-100 dark:text-yellow-500">
                          {/* <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span> */}
                          $ / month
                        </span>
                      </div>
                    </div>
                  </div>

                <div class="min-w-7 min-h-7 my-5 w-full inline-flex items-center text-xs align-middle ">
                  <span class="size-7 flex justify-center items-center shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full ">
                    4 
                  </span>
                  <p className='px-3'>Images</p>
                </div>

                <div className='flex flex-wrap gap-3 my-3 mx-3 px-5 border-l-2 border-gray-200'>
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 ">First image will be cover</span>
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 ">maximum 6</span>
                  
                  <div class="flex items-center justify-center w-full">
                      <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                              <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input id="images" multiple type="file" accept='image/*' class="hidden" />
                      </label>
                  </div> 

                  <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none">Upload</button>
                </div>
                <div className='my-10 mx-3'>

                <button type="button" class="my-5 w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Create Listing</button>
                </div>
            </div>
        </form>
    </main>
  )
}
