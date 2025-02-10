import React from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "This platform made finding my dream home effortless. Highly recommended!",
      name: "John Doe",
      location: "New York, USA",
      image: "https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/9660b066-74da-49ab-b6b5-d3d83d2be516/DallEGeneratedImages/dalle-1800e8ab-4d17-4c8d-b0db-54ae08f765ce0251663186421781916000.jpg&dcHint=JapanEast&fileToken=cf8c7a78-bc95-4f7e-87ad-4bed98cf9af0",
    },
    {
      quote: "A seamless experience from start to finish. Great customer service!",
      name: "Jane Smith",
      location: "Los Angeles, USA",
      image: "https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/9660b066-74da-49ab-b6b5-d3d83d2be516/DallEGeneratedImages/dalle-6175007a-6947-429f-8991-d614d069da540251663186174245761200.jpg&dcHint=JapanEast&fileToken=cf8c7a78-bc95-4f7e-87ad-4bed98cf9af0",
    },
    {
      quote: "I was able to sell my property within days. Fantastic results!",
      name: "Robert Brown",
      location: "Chicago, USA",
      image: "https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/9660b066-74da-49ab-b6b5-d3d83d2be516/DallEGeneratedImages/dalle-f7cafd75-32ec-48ed-b352-0019e3e098670251663186302380450100.jpg&dcHint=JapanEast&fileToken=cf8c7a78-bc95-4f7e-87ad-4bed98cf9af0",
    },
  ];

  return (
    <div className="my-20 py-12 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Our Clients Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-700 py-10 font-semibold italic">"{testimonial.quote}"</p>
            <h3 className="text-lg font-semibold mt-4">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
