import React from "react";

const About = () => {
  return (
    <div className=" text-gray-900">
      <div 
        className="bg-blue-600 h-96 bg-cover bg-center flex items-center justify-center text-white text-4xl md:text-5xl font-bold"
        style={{ backgroundImage: "url('https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/9660b066-74da-49ab-b6b5-d3d83d2be516/DallEGeneratedImages/dalle-ee390d85-aa51-422c-9bf9-8cf3b734fe070251663192350862677500.jpg&dcHint=JapanEast&fileToken=cf8c7a78-bc95-4f7e-87ad-4bed98cf9af0')", backgroundAttachment: "fixed" }}
      >
        About FabEstate
      </div>
      <div className="py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At FabEstate, we redefine the real estate experience by providing cutting-edge solutions, innovative property listings, and exceptional customer service. Our mission is to connect buyers and sellers with ease and efficiency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">To simplify real estate transactions and provide the best digital platform for property buyers and sellers.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">To become the leading real estate marketplace with a seamless and transparent buying and selling experience.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">We believe in integrity, innovation, and customer satisfaction, ensuring top-notch service at every step.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            With thousands of successful transactions, a dedicated team, and cutting-edge technology, we are committed to making your real estate journey seamless and rewarding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
