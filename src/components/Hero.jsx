import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
return (
<section className="w-full bg-white dark:bg-[#121212]">

  <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}

    <div>

      {/* Small badge */}

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm mb-6">
        🛍️ Best Online Collection Store
      </div>


      {/* Heading */}

      <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
        Discover Products That
        <span className="text-green-600"> Inspire Your Lifestyle</span>
      </h1>


      {/* Description */}

      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
        Explore trending collections from independent vendors and
        discover products curated to match your lifestyle and needs.
      </p>


      {/* Buttons */}

      <div className="flex items-center gap-6 mt-8">

        <Link
          to="/products"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          Shop Now
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/vendor/dashboard"
          className="font-semibold text-gray-700 dark:text-gray-200 hover:text-green-600"
        >
          Become a Vendor
        </Link>

      </div>


      {/* Ratings */}

      <div className="flex items-center gap-4 mt-10">

        <div className="flex -space-x-2">

          <img
            className="w-8 h-8 rounded-full border"
            src="https://randomuser.me/api/portraits/women/1.jpg"
          />

          <img
            className="w-8 h-8 rounded-full border"
            src="https://randomuser.me/api/portraits/men/2.jpg"
          />

          <img
            className="w-8 h-8 rounded-full border"
            src="https://randomuser.me/api/portraits/women/3.jpg"
          />

          <img
            className="w-8 h-8 rounded-full border"
            src="https://randomuser.me/api/portraits/men/4.jpg"
          />

        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            4.9 Ratings+
          </p>
          <p className="text-sm text-gray-500">
            Trusted by 50k+ Customers
          </p>
        </div>

      </div>

    </div>



    {/* RIGHT IMAGE */}

    <div className="flex justify-center">

      <img
  src="/rocket-shop.jpeg"
  alt="BizMart Illustration"
  className="w-[380px] md:w-[450px]"
/>

    </div>

  </div>

</section>

);
}