import React from 'react'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBed, faBath, faDollarSign, faEye } from '@fortawesome/free-solid-svg-icons';

export default function ListingItem({listing}) {
  return (
    <div className="card m-3 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="object-cover h-56 w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/listing/${listing._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            {listing.name}
            {listing.type === "rent" && (
              <span className="ml-2 text-sm font-medium text-white bg-orange-500 rounded-full px-3 py-1">
                Rent
              </span>
            )}
            {listing.type === "sell" && (
              <span className="ml-2 text-sm font-medium text-white bg-blue-500 rounded-full px-3 py-1">
                Sell
              </span>
            )}
          </h2>
        </Link>
        <p className="text-gray-600 mt-2 line-clamp-1">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
          {listing.address}
        </p>
        <div className="flex gap-2 items-center mt-4">
          <span className="text-gray-600 bg-gray-100 py-2 px-5 rounded-md">
            <FontAwesomeIcon icon={faBed} className="mr-1" />
            {listing.bedrooms} beds
          </span>
          <span className="text-gray-600 bg-gray-100 py-2 px-5 rounded-md">
            <FontAwesomeIcon icon={faBath} className="mr-1" />
            {listing.bathrooms} baths
          </span>
        </div>
        <div className="mt-4">
          <span className="text-xl font-bold">
            ${listing.offer ? listing.discountPrice : listing.regularPrice}
          </span>
          {listing.type === "rent" && (
            <span className="text-gray-500">/month</span>
          )}
          {listing.offer && (
            <span className="line-through text-gray-400 text-lg ml-3">
              ${listing.regularPrice}
            </span>
          )}
        </div>

        {/* Pushes the button to the bottom to align all cards */}
        <div className="mt-auto">
          <Link
            to={`/listing/${listing._id}`}
            className="block text-center text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            View Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
