import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductCollections({ products = [] }) {

  const [activeTab, setActiveTab] = useState("latest");
  const [scrollIndex, setScrollIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  /* RESPONSIVE */

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(5);

    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const tabs = [
    { key: "all", label: "All Products" },
    { key: "latest", label: "Latest Products" },
    { key: "best", label: "Best Sellers" },
    { key: "featured", label: "Featured Products" }
  ];

  /* PRODUCT FILTERING */

  const latestProducts = products.filter(p => p.category === "latest");

const bestProducts = products.filter(p => p.category === "best");

const featuredProducts = products.filter(p => p.category === "featured");

  

  let filteredProducts = latestProducts;

  if (activeTab === "best") filteredProducts = bestProducts;
  if (activeTab === "featured") filteredProducts = featuredProducts;

  const visibleProducts = filteredProducts.slice(
    scrollIndex,
    scrollIndex + itemsPerView
  );

  /* SLIDER */

  const scrollLeft = () => {
    setScrollIndex(Math.max(scrollIndex - itemsPerView, 0));
  };

  const scrollRight = () => {
    setScrollIndex(
      Math.min(scrollIndex + itemsPerView, filteredProducts.length - itemsPerView)
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <p className="text-center text-gray-500">Our Products</p>

      <h2 className="text-center text-4xl font-bold mt-2">
        Our Products <span className="text-green-600">Collections</span>
      </h2>

      {/* TABS */}

      <div className="flex justify-center gap-4 mt-8 flex-wrap">

        {tabs.map(tab => (

          tab.key === "all" ? (

            <Link
              key={tab.key}
              to="/categories"
              className="px-6 py-2 rounded-full border bg-white hover:bg-gray-100"
            >
              {tab.label}
            </Link>

          ) : (

            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setScrollIndex(0);
              }}
              className={`px-6 py-2 rounded-full border ${
                activeTab === tab.key
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              {tab.label}
            </button>

          )

        ))}

      </div>

      {/* PRODUCT SLIDER */}

      <div className="relative mt-12">

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
        >
          <ChevronLeft size={20}/>
        </button>

        <div className="flex gap-6 overflow-hidden px-10">

          {visibleProducts.map(product => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[200px]"
            >
              <ProductCard product={product}/>
            </div>
          ))}

        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
        >
          <ChevronRight size={20}/>
        </button>

      </div>

    </section>
  );
}