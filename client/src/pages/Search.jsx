import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
    });
    
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    console.log(listings);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if ( searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' || parkingFromUrl === true ? true : false,
                furnished: furnishedFromUrl === 'true' || furnishedFromUrl === true ? true : false,
                offer: offerFromUrl === 'true' || offerFromUrl === true ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            try {
                const searchQuery = urlParams.toString();
                const response = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await response.json();
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchListings();
    }, [location.search]);

    console.log(sidebardata);

    const handleChange = (e) => {
        if (e.target.id ==='all' || e.target.id === 'rent' || e.target.id === 'sell') {
            setSidebarData({
                ...sidebardata,
                type: e.target.id
            })
        }

        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebardata, searchTerm: e.target.value});
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebarData({
                ...sidebardata,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split("_")[0] || "created_at";

            const order = e.target.value.split("_")[1] || "desc";

            setSidebarData({
                ...sidebardata,
                sort,
                order
            })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-5 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="justify-center items-center py-3 gap-2">
            <label className="whitespace-nowrap py-2" htmlFor="searchTerm">
              Search
            </label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none border rounded-md p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold py-3">Filter by</h2>
            <div>
              <ul className="max-w-sm flex flex-col">
                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
                  <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                      <input
                        id="all"
                        name="all"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.type === "all"}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      htmlFor="all"
                      className="ms-3.5 block w-full text-sm text-gray-600"
                    >
                      Rent & Sell
                    </label>
                  </div>
                </li>

                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
                  <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                      <input
                        id="rent"
                        name="rent"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.type === "rent"}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      htmlFor="rent"
                      className="ms-3.5 block w-full text-sm text-gray-600"
                    >
                      Rent
                    </label>
                  </div>
                </li>

                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
                  <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                      <input
                        id="sell"
                        name="sell"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.type === "sell"}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      htmlFor="sell"
                      className="ms-3.5 block w-full text-sm text-gray-600"
                    >
                      Sell
                    </label>
                  </div>
                </li>

                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
                  <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                      <input
                        id="offer"
                        name="offer"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.offer}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      htmlFor="offer"
                      className="ms-3.5 block w-full text-sm text-gray-600"
                    >
                      Offer
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold py-3">Features</h2>
            <div>
              <ul className="max-w-sm flex flex-col">
                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
                  <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                      <input
                        id="parking"
                        name="parking"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.parking}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      htmlFor="parking"
                      className="ms-3.5 block w-full text-sm text-gray-600"
                    >
                      Parking
                    </label>
                  </div>
                </li>

                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
                  <div className="relative flex items-start w-full">
                    <div className="flex items-center h-5">
                      <input
                        id="furnished"
                        name="furnished"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.furnished}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      htmlFor="furnished"
                      className="ms-3.5 block w-full text-sm text-gray-600"
                    >
                      Furnished
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative my-4">
              <select
                onChange={handleChange}
                defaultValue={"created_at_desc"}
                id="sort_order"
                className="peer p-4 pe-9 block w-full font-medium border text-gray-600 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6
                    focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6
                    [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6
                    autofill:pb-2"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
              <label
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500 px-5"
              >
                Sort By:
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <h1>Listing results: </h1>
      </div>
    </div>
  );
}
