import React from "react";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, BadgeDollarSign, Headphones } from "lucide-react";

export default function PromoSection() {

  return (

    <section className="max-w-7xl mx-auto px-4 space-y-10">

      {/* FEATURES */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

        <div className="flex flex-col items-center gap-2">
          <Truck className="text-[#c97979]" size={32}/>
          <h4 className="font-semibold">Free Shipping</h4>
          <p className="text-sm text-gray-500">On All Orders Over $100</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="text-[#c97979]" size={32}/>
          <h4 className="font-semibold">Secure Payment</h4>
          <p className="text-sm text-gray-500">We ensure secure payment</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <BadgeDollarSign className="text-[#c97979]" size={32}/>
          <h4 className="font-semibold">100% Money Back</h4>
          <p className="text-sm text-gray-500">30 Days Return Policy</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Headphones className="text-[#c97979]" size={32}/>
          <h4 className="font-semibold">Online Support</h4>
          <p className="text-sm text-gray-500">24/7 Dedicated Support</p>
        </div>

      </div>


      {/* PROMO GRID */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* WOMEN STYLE */}

        <div className="rounded-xl overflow-hidden bg-[#f3e3dc] flex items-center">

          <div className="w-1/2 h-[260px] overflow-hidden">

            <img
              src="/women-style.jpeg"
              alt="Women's Fashion"
              className="w-full h-full object-cover"
            />

          </div>

          <div className="w-1/2 p-6 space-y-3">

            <p className="text-[#c97979] font-medium">
              New Arrivals
            </p>

            <h3 className="text-2xl font-bold">
              Women's Style
            </h3>

            <p className="text-gray-500">
              Up to 70% Off
            </p>

            <Link
              to="/products?category=fashion&subcategory=women"
              className="inline-block border border-[#ead7cf] px-4 py-2 rounded-full hover:bg-[#d98b8b] hover:text-white transition"
            >
              Shop Now
            </Link>

          </div>

        </div>


        {/* RIGHT GRID */}

        <div className="grid grid-cols-2 gap-6">

          {/* HANDBAG */}

          <div className="relative bg-[#f6eee9] rounded-xl p-6 flex flex-col justify-between">

            <div>

              <span className="text-xs bg-[#c97979] text-white px-2 py-1 rounded">
                25% OFF
              </span>

              <h4 className="text-xl font-bold mt-2">
                Handbag
              </h4>

            </div>

            <Link
              to="/products?category=accessories&subcategory=handbags"
              className="text-sm text-[#c97979] mt-2 hover:underline"
            >
              Shop Now →
            </Link>

            <img
              src="https://images.unsplash.com/photo-1591561954557-26941169b49e"
              alt="Handbag"
              className="absolute right-3 bottom-3 w-24"
            />

          </div>


          {/* WATCH */}

          <div className="relative bg-[#fff7f4] rounded-xl p-6 flex flex-col justify-between">

            <div>

              <span className="text-xs bg-[#c97979] text-white px-2 py-1 rounded">
                45% OFF
              </span>

              <h4 className="text-xl font-bold mt-2">
                Watch
              </h4>

            </div>

            <Link
              to="/products?category=accessories&subcategory=watches"
              className="text-sm text-[#c97979] mt-2 hover:underline"
            >
              Shop Now →
            </Link>

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Watch"
              className="absolute right-3 bottom-3 w-24"
            />

          </div>


          {/* BACKPACK */}

          <div className="relative col-span-2 bg-[#ead7cf] rounded-xl p-6 flex items-center justify-between">

            <div>

              <p className="text-gray-600">
                Accessories
              </p>

              <h4 className="text-2xl font-bold">
                Backpack
              </h4>

              <p className="text-gray-600">
                Min 40–80% Off
              </p>

              <Link
                to="/products?category=accessories&subcategory=backpacks"
                className="text-[#c97979] mt-2 block hover:underline"
              >
                Shop Now →
              </Link>

            </div>

            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
              alt="Backpack"
              className="w-36"
            />

          </div>

        </div>

      </div>

    </section>

  );
}