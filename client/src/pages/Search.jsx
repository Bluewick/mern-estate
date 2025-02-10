import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showAlert, setShowAlert] = useState(true); 
  const [showMore, setShowMore] = useState(false);

  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking:
          parkingFromUrl === "true" || parkingFromUrl === true ? true : false,
        furnished:
          furnishedFromUrl === "true" || furnishedFromUrl === true
            ? true
            : false,
        offer: offerFromUrl === "true" || offerFromUrl === true ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      
      
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await response.json();
      // setListings(data);
    //   console.log(data.length)
        if (data.length === 0) {
        setShowAlert(true);
        } else if (data.length > 8) {
        setShowMore(true);
        } else {
        setShowMore(false);
        }
      setListings(data);
      setLoading(false);

    };
    fetchListings();
  }, [location.search]);

//   console.log(sidebardata);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebarData({
        ...sidebardata,
        type: e.target.id
      });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({
        ...sidebardata,
        sort,
        order
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        console.log('numberOfListings', numberOfListings)
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
        setShowMore(false);
        }
        setListings([...listings, ...data]);
        //  navigate(`/search?${searchQuery}`); // crucial addition

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
              value={sidebardata.searchTerm == null ? "" : sidebardata.searchTerm}
              // value={sidebardata.searchTerm}
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
                      {/* <input
                        id="all"
                        name="all"
                        type="checkbox"
                        className="border-gray-200 rounded disabled:opacity-50"
                        checked={sidebardata.type === "all"}
                        onChange={handleChange}
                      /> */}
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
        {/* <h1>Listing results: </h1> */}
        <div>
          {!loading && listings.length === 0 && showAlert && (
            <div
              className={`transition-opacity left-0 duration-300 ease-in-out ${
                showAlert ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                role="alert"
                className="absolute bottom-10 right-10 shadow-md mt-3 flex w-fit p-3 text-sm text-slate-600 rounded-md bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  ></path>
                </svg>
                <p className="block pr-10">No listings found </p>
                <button
                  onClick={() => {
                    setShowAlert(false);
                  }}
                  className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-slate-200 active:bg-slate-200 absolute top-1.5 right-1.5"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 text-slate-600"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="absolute top-1/2" role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <div className="grid gap-3 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center">
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>

          {showMore && (
            <div className="flex justify-center">
              <button
                onClick={onShowMoreClick}
                className="text-center w-max py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
