import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { Pagination } from 'swiper/modules';
import {useSelector} from 'react-redux'
import Contact from '../components/Contact';




export default function Listing() {
  const [listing, setListing] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const {currentUser} = useSelector(state => state.user);
  const [contact, setContact] = React.useState(false);


  const params = useParams();
  useEffect(() => {
    
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(data.message)
          setLoading(false) 
          return;
        }
        setListing(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
      setError(error.message)
      setLoading(false) 
    }
    } 
    fetchListing()
  }, [params.listingId])

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && !loading && (
        <div className="min-h-[400px] flex items-center justify-center p-5">
          <div className="text-center">
            <div className="inline-flex rounded-full bg-red-100 p-4">
              <div className="rounded-full stroke-red-600 bg-red-200 p-4">
                <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17 16L22 21M22 16L17 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </div>
            <h1 className="mt-5 text-[36px] font-bold text-slate-800">Listing Not Found</h1>
            <p className="text-slate-600 mt-5 lg:w-1/2 mx-auto">
              {error.includes("Cast to ObjectId failed") 
                ? "We couldn't find the listing you're looking for. The listing may have been removed or the URL might be incorrect."
                : error || "We encountered an error while fetching the listing. Please try again later or contact support if the problem persists."}
            </p>
          </div>
        </div>
      )}
      {listing && !loading && !error && (
        <main className="max-w-7xl mx-auto p-3 my-10">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left side - Image gallery */}
            <div className="lg:w-2/3">
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true
                  }}
                  modules={[Navigation, Pagination]}
                  className="h-[500px] rounded-xl"
                >
                  {listing.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {listing.imageUrls.length > 1 && (
                  <div className="p-4 mt-4">
                    <Swiper
                      spaceBetween={10}
                      slidesPerView="auto"
                      freeMode={true}
                      watchSlidesProgress={true}
                      className="h-24"
                    >
                      {listing.imageUrls.map((url, index) => (
                        <SwiperSlide key={index} style={{width: 'auto'}}>
                          <img
                            src={url}
                            alt={`Property thumbnail ${index + 1}`}
                            className="h-full w-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                            onClick={() => document.querySelector('.swiper-pagination-bullet:nth-child(' + (index + 1) + ')').click()}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Property details */}
            <div className="lg:w-1/3">
              <div className="sticky top-5">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <h1 className="text-2xl font-semibold mb-4">{listing.name}</h1>
                  <p className="text-gray-600 mb-4">{listing.address}</p>
                  
                  <div className="flex gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                    {listing.offer && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Special Offer
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">
                      ${listing.offer ? listing.discountPrice : listing.regularPrice}
                    </span>
                    {listing.type === 'rent' && <span className="text-gray-500">/month</span>}
                    {listing.offer && (
                      <span className="line-through text-gray-400 text-lg">
                        ${listing.regularPrice}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3Z"/>
                        <path d="M21 12H3"/>
                        <path d="M6 12V21"/>
                        <path d="M18 12V21"/>
                      </svg>
                      <span className="text-gray-700 text-sm font-semibold">{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12H20M4 12V20H20V12M4 12V4H20V12"/>
                        <path d="M8 12V16"/>
                        <path d="M16 12V16"/>
                      </svg>
                      <span className="text-gray-700 text-sm font-semibold">{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M7 8H17"/>
                        <path d="M7 12H17"/>
                        <path d="M7 16H17"/>
                      </svg>
                      <span className="text-gray-700 text-sm font-semibold">{listing.parking ? 'Parking spot' : 'No parking'}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"/>
                        <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"/>
                      </svg>
                      <span className="text-gray-700 text-sm font-semibold">{listing.furnished ? 'Furnished' : 'Not furnished'}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {listing.description}
                    </p>
                  </div>
                  {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button onClick={() => setContact(true)} className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition">
                      Contact Landlord
                    </button>
                  )}
                  {contact && <Contact listing={listing} />}

                  {!currentUser && (
                    <Link to="/sign-up">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition">
                        Sign Up to Contact Landlord
                      </button>
                    </Link>
                  )}

                  {currentUser && listing.userRef === currentUser._id &&
                  <a href={`/update-listing/${listing._id}`} class="w-full py-3 px-4 mt-5 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white border border-gray-300 text-blue-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ">
                  {/* <Link to={`/update-listing/${listing._id}`}> */}
                    Edit
                  {/* </Link> */}
                  </a>
                  }

                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      </div>
  )
}
