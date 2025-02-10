import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import ListingItem from "../components/ListingItem";
import { FaSearch } from 'react-icons/fa'
import MetricsSection from '../components/MetricsSection';
import TestimonialSection from '../components/TestimonialSection'


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [salesListings, setSalesListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await response.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.error('Error fetching offer listings:', error);
      }
    }
    const fetchRentListings = async () => {
      try {
        const response = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await response.json();
        setRentListings(data);
        fetchSaleListings();
        } catch (error) {
        console.error('Error fetching rent listings:', error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const response = await fetch('/api/listing/get?type=sell&limit=4')
        const data = await response.json();
        setSalesListings(data);
      } catch (error) {
        console.error('Error fetching sale listings:', error);
      }
    }

    fetchOfferListings();
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setErrorMessage('Please enter location or search term.');
      return;
    }
    setErrorMessage('');
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');

    if (searchTerm === null) {
      return;
    }

    setSearchTerm(searchTerm);
  }, [location.search]);

  return (
    <div>
      <div className='mx-10 '>
        <div className='h-600 bg-blue-600 rounded-3xl flex items-center justify-center' style={{ backgroundImage: 'url("https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/9660b066-74da-49ab-b6b5-d3d83d2be516/DallEGeneratedImages/dalle-45a9644d-53c1-4997-bec2-c3461f4debe80251663192287718105400.jpg&dcHint=JapanEast&fileToken=cf8c7a78-bc95-4f7e-87ad-4bed98cf9af0")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
          <div className=''>
            <h1 className="text-4xl lg:text-6xl text-white shadow-2xl text-center font-semibold">
              Your Next Home is
            </h1>
            <h1 className="text-4xl lg:text-6xl text-white shadow-2xl mb-10 text-center font-semibold">
              Just a Click Away...
            </h1>
              <form onSubmit={handleSubmit} className='bg-white  mb-10 bg-opacity-55 shadow-2xl backdrop-blur-lg p-5 mt-15 rounded-full flex items-center' action="">
                <input type="text" placeholder="Search..." className='w-full bg-transparent focus:outline-none px-5' 
                value={searchTerm == null ? "" : searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className='text-gray-800 pr-3'>
                      <FaSearch className='text-gray-800' />
                  </button>
              </form>
              {errorMessage && <p className="text-gray-800 text-center mt-2 bg-white bg-opacity-50 p-2 rounded-md backdrop-blur-lg transition-all duration-300">{errorMessage}</p>}
          </div>
        </div>
      </div>

  

      {/* swiper
      <Swiper key={offerListings.length} navigation>
        {offerListings?.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  backgroundImage: `url(${
                    listing.imageUrls?.[0] || "fallback-image.jpg"
                  })`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="h-[500px] w-full"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* listing items  */}

      <div className="max-w-full mx-auto p-3 flex flex-col gap-3 my-10">
        {offerListings?.length > 0 && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Recent Offers
              </h2>
              <Link
                className="text-blue-600 text-sm font-medium hover:underline transition-colors"
                to={"/search?offer=true"}
              >
                Show more offers →
              </Link>
            </div>

            {/* Listings Grid */}
            <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}


      <MetricsSection />
      

        {rentListings?.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Recent Places for Rent
              </h2>
              <Link
                className="text-blue-600 text-sm font-medium hover:underline transition-colors"
                to={"/search?type=rent"}
              >
                Show more places for rent →
              </Link>
            </div>
            <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        <TestimonialSection />

        {/* Recent Places for Sale */}
        {salesListings?.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Recent Places for Sale
              </h2>
              <Link
                className="text-blue-600 text-sm font-medium hover:underline transition-colors"
                to={"/search?type=sale"}
              >
                Show more places for sale →
              </Link>
            </div>
            <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {salesListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}