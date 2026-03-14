import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {

  return (

    <section
      className="relative w-full h-[600px] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero-bg.jpeg')"
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-white">

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm mb-6">
          🛍 Best Online Collection Store
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Explore Trending Products
          <span className="text-[#f0b3b3]"> From Independent Vendors</span>
        </h1>

        <p className="mt-6 text-lg text-gray-200 max-w-xl mx-auto">
          Discover curated collections and trending products in BizMart marketplace.
        </p>

        <div className="flex items-center justify-center gap-6 mt-10">

          <Link
            to="/products"
            className="flex items-center gap-2 bg-[#d98b8b] text-white px-6 py-3 rounded-full hover:bg-[#c97979]"
          >
            Shop Now <ArrowRight size={18}/>
          </Link>

          <Link
            to="/vendor/dashboard"
            className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Become a Vendor
          </Link>

        </div>

      </div>

    </section>

  );
}