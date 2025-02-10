import React from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "This platform made finding my dream home effortless. Highly recommended!",
      name: "John Doe",
      location: "New York, USA",
      image: "https://firebasestorage.googleapis.com/v0/b/mern-estate-36c0f.firebasestorage.app/o/Designer%20(41).jpeg?alt=media&token=4dcde219-9fd5-4137-93ae-9f3c809eadfc",
    },
    {
      quote: "A seamless experience from start to finish. Great customer service!",
      name: "Jane Smith",
      location: "Los Angeles, USA",
      image: "https://firebasestorage.googleapis.com/v0/b/mern-estate-36c0f.firebasestorage.app/o/Designer%20(42).jpeg?alt=media&token=72384ad2-6015-4ff2-ac0f-d70c2df8f5a0",
    },
    {
      quote: "I was able to sell my property within days. Fantastic results!",
      name: "Robert Brown",
      location: "Chicago, USA",
      image: "https://firebasestorage.googleapis.com/v0/b/mern-estate-36c0f.firebasestorage.app/o/Designer%20(40).jpeg?alt=media&token=5b262aa0-1a67-4561-85cf-892d5c0412c7",
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
