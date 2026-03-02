import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import API from '../services/api';

export default function HomePage() {

  const [products, setProducts] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
  ];

  // 🔥 CATEGORY DATA
  const categories = [
    { name: "Electronics", color: "bg-blue-100" },
    { name: "Fashion", color: "bg-pink-100" },
    { name: "Toys & Game", color: "bg-green-100" },
    { name: "Accessories", color: "bg-yellow-100" },
    { name: "Books", color: "bg-purple-100" }
  ];

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/products');

        // 🔥 FIX: backend image → frontend images[]
        const fixed = res.data.map(p => ({
          ...p,
          images: p.images || [p.image || "https://via.placeholder.com/300"]
        }));

        setProducts(fixed);

      } catch {
        setProducts(MOCK_PRODUCTS);
      }
    };
    fetchData();
  }, []);

  // HERO AUTO
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mostViewed = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  const newArrivals = [...products].slice(8, 16);

  const salesProducts = products.some(p => p.discount)
    ? products.filter(p => p.discount).slice(0, 8)
    : [...products].slice(16, 24);

  const holiProducts = [
    {
      id: "h1",
      name: "Holi Color Pack",
      price: 499,
      discount: 20,
      category: "Holi",
      images: ["https://images.unsplash.com/photo-1615916571200-3a0dbd0d66c2"]
    },
    {
      id: "h2",
      name: "Water Pichkari Gun",
      price: 299,
      discount: 15,
      category: "Holi",
      images: ["https://images.unsplash.com/photo-1589998059171-988d887df646"]
    },
    {
      id: "h3",
      name: "White Holi T-Shirt",
      price: 699,
      discount: 25,
      category: "Holi",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"]
    }
  ];

  return (
    <div className="space-y-12 pb-12">

      {/* HERO */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={`${img}?auto=format&fit=crop&w=1920&q=80`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === heroIndex ? "opacity-60" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div className="max-w-xl space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              Empowering Small Businesses
            </h1>

            <p className="text-slate-300">
              Discover trending products with smart recommendations.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link 
                to="/login?redirect=/products"
                className="btn-primary px-5 py-2 text-sm flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                to="/signup?role=vendor"
                className="px-5 py-2 text-sm border border-white/30 text-white rounded-lg bg-white/10 hover:bg-white/20"
              >
                Become a Vendor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔥 CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">🛍 Product Categories</h2>

        <div className="flex gap-4 flex-wrap">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`px-6 py-3 rounded-xl ${cat.color} hover:scale-105 transition font-medium`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* MOST VIEWED */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">🔥 Most Viewed</h2>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {mostViewed.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">🆕 New Arrivals</h2>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {newArrivals.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* SALES */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-red-500">💸 Big Sale</h2>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {salesProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* HOLI */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-pink-500">🌈 Holi Festive Sale</h2>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {holiProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}