import React from "react";

const MetricsSection = () => {
  return (
    <div className="max-w-7xl my-20 m-auto flex flex-col md:flex-row justify-between items-center p-6 md:p-10 bg-white w-full">
      <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Estate Insights That Matter</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Explore the impressive statistics behind our platform's performance. With over 2.4 million impressions, 500,000 engaged users, and a track record of 1,200+ satisfied clients, our impact is undeniable. Dive into our metrics to see how we've generated over 10,000 successful property transactions, garnered 800+ five-star reviews, and reached audiences in 50+ cities. Discover why our platform is trusted by leading real estate professionals worldwide.
        </p>
      </div>
      <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mern-estate-36c0f.firebasestorage.app/o/Designer%20(44).jpeg?alt=media&token=6fbd22c8-20ae-4402-826e-34d69596b1ed"
          alt="3D Illustration"
          className="rounded-full w-60 h-60 md:w-80 md:h-80 object-cover"
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right">
        <div className="border-t w-full py-2">
          <p className="text-gray-600 text-sm">Total Listings</p>
          <p className="text-xl md:text-2xl font-bold">+2M</p>
        </div>
        <div className="border-t w-full py-2">
          <p className="text-gray-600 text-sm">Active Buyers</p>
          <p className="text-xl md:text-2xl font-bold">500,000+</p>
        </div>
        <div className="border-t w-full py-2">
          <p className="text-gray-600 text-sm">Satisfied Clients</p>
          <p className="text-xl md:text-2xl font-bold">1,200+</p>
        </div>
        <div className="border-t w-full border-b py-2">
          <p className="text-gray-600 text-sm">Property Views</p>
          <p className="text-xl md:text-2xl font-bold">3.5 million+</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;