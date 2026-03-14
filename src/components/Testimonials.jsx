import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {

  const reviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      review:
        "Amazing platform! I discovered unique products from independent sellers that I couldn't find anywhere else.",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Priya Verma",
      review:
        "Great shopping experience. Product quality and delivery speed were impressive.",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Rohan Mehta",
      review:
        "BizMart helped me find trending products easily. The UI is smooth and very easy to use.",
      rating: 3.8,
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      review:
        "I love supporting small businesses and BizMart makes it super easy to shop from them.",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Aditya Singh",
      review:
        "Very professional marketplace. Secure payments and great customer service.",
      rating: 4.1,
    },
    {
      id: 6,
      name: "Neha Gupta",
      review:
        "The product collections are amazing and I always find something new to buy.",
      rating: 3.9,
    },
  ];

  const [index, setIndex] = useState(0);
  const itemsPerView = 3;

  const visibleReviews = reviews.slice(index, index + itemsPerView);

  const handlePrev = () => {
    setIndex(Math.max(index - itemsPerView, 0));
  };

  const handleNext = () => {
    setIndex(Math.min(index + itemsPerView, reviews.length - itemsPerView));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} fill="currentColor" />);
    }

    if (hasHalf) {
      stars.push(
        <Star
          key="half"
          size={16}
          fill="currentColor"
          className="opacity-50"
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Star key={`empty-${stars.length}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-0">

      <p className="text-center text-[#9c8b84]">
        Customer Reviews
      </p>

      <h2 className="text-center text-4xl font-bold mt-2">
        What Our <span className="text-[#c97979]">Customers Say</span>
      </h2>

      <div className="relative mt-12">

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#fff7f4] border border-[#ead7cf] rounded-full p-2 z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="grid md:grid-cols-3 gap-6 px-10">

          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#fff7f4] border border-[#ead7cf] rounded-xl p-6 shadow-sm"
            >

              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  {review.rating}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {review.review}
              </p>

              <p className="mt-4 font-semibold text-[#c97979]">
                {review.name}
              </p>

            </div>
          ))}

        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#fff7f4] border border-[#ead7cf] rounded-full p-2 z-10"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </section>
  );
}