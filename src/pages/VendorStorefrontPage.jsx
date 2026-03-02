import React, { useEffect, useState, useMemo } from 'react'; 
import { useParams } from 'react-router-dom';
import { Star, Truck, CheckCircle2, Zap, Search, Filter, Heart } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_VENDORS } from '../constants';
import ProductCard from '../components/ProductCard';
import API from '../services/api';

export default function VendorStorefrontPage() {

  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);

  // ✅ NEW STATES
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [followed, setFollowed] = useState(false);

  // ✅ FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const v = await API.get(`/vendors/${id}`);
        setVendor(v.data);
      } catch {
        setVendor(MOCK_VENDORS.find(v => v.id === id) || MOCK_VENDORS[0]);
      }

      try {
        const p = await API.get(`/products?vendorId=${id}`);
        setProducts(p.data);
      } catch {
        setProducts(MOCK_PRODUCTS.filter(p => p.vendorId === id));
      }
    };

    fetchData();
  }, [id]);

  // ✅ SEARCH + FILTER + SORT
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // 🔍 SEARCH
    if (search) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🔃 SORT
    switch (sort) {
      case 'price-low':
        data.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        data.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        data.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return data;
  }, [products, search, sort]);

  if (!vendor) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div>

      {/* ✅ BANNER */}
      <section className="relative h-[300px]">
        <img src={vendor.banner || 'https://via.placeholder.com/1200x300'} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">

          <img 
            src={vendor.logo || 'https://via.placeholder.com/150'} 
            className="w-24 h-24 rounded-full border-4 border-white/20"
          />

          <h1 className="text-3xl font-bold">{vendor.name}</h1>

          {/* ⭐ FOLLOW BUTTON */}
          <button
            onClick={() => setFollowed(!followed)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
              followed ? 'bg-red-500' : 'bg-white text-black'
            }`}
          >
            <Heart className="w-4 h-4" />
            {followed ? 'Following' : 'Follow'}
          </button>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* ✅ SIDEBAR */}
        <aside className="space-y-6">

          <div className="card p-6 space-y-3">
            <h3 className="font-bold">About</h3>
            <p className="text-sm text-slate-500">{vendor.description}</p>

            {vendor.isTopSeller && <p className="text-xs text-amber-600 flex gap-2"><Zap /> Top Seller</p>}
            {vendor.isFastShipper && <p className="text-xs text-blue-600 flex gap-2"><Truck /> Fast Shipping</p>}
            {vendor.isHighlyRated && <p className="text-xs text-green-600 flex gap-2"><CheckCircle2 /> Highly Rated</p>}
          </div>

          {/* 📊 VENDOR ANALYTICS */}
          <div className="card p-6 space-y-4">
            <h3 className="font-bold">Store Insights</h3>

            <div className="flex justify-between">
              <span>Products</span>
              <span>{products.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Avg Rating</span>
              <span>
                {(products.reduce((a, b) => a + (b.rating || 0), 0) / products.length || 0).toFixed(1)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Value</span>
              <span>
                ${products.reduce((a, b) => a + b.price, 0)}
              </span>
            </div>
          </div>

        </aside>

        {/* ✅ MAIN */}
        <div className="lg:col-span-3 space-y-6">

          {/* 🔍 SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 card">

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-10"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm font-semibold"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price Low → High</option>
              <option value="price-high">Price High → Low</option>
              <option value="rating">Top Rated</option>
            </select>

          </div>

          {/* 🛍 PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="font-bold text-lg">No products found</h3>
              <p className="text-slate-500">Try different search or filters</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}