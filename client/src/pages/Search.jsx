import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-5 border-b-2 md:border-r-2 md:min-h-screen">
        <form action="" className="flex flex-col gap-2">
          <div className="justify-center items-center py-3 gap-2">
            <label className="whitespace-nowrap py-2" htmlFor="searchTerm">
              Search
            </label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none border rounded-md p-3 w-full"
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
                className="peer p-4 pe-9 block w-full font-medium border text-gray-600 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                    focus:pt-6
                    focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6
                    [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6
                    autofill:pb-2"
              >
                <option selected="">Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
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
