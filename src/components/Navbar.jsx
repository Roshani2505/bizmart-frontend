import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  ChevronDown, 
  Store, 
  Moon,
  Sun,
  Home
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useDarkMode } from '../hooks/useDarkMode';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // ✅ SEARCH STATE
  const [search, setSearch] = useState("");

const handleSearch = () => {
  if (!search.trim()) return;
  navigate(`/products?search=${search}`);
  setIsCategoriesOpen(false); // ✅ dropdown auto close
};

  

  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const { isDark, toggle } = useDarkMode();

  const navigate = useNavigate();

  

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <Store className="w-8 h-8" />
            <span className="hidden sm:block">BizMart</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
  <div className="relative w-full">

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      placeholder="Search products..."
      className="input-field pl-10 pr-10 py-2"
    />

    {/* LEFT ICON */}
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

    {/* RIGHT ICON */}
    <button
      onClick={handleSearch}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      <Search className="w-5 h-5 text-primary" />
    </button>

  </div>
</div>
          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* ✅ CATEGORY DROPDOWN FIX */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-1 font-medium"
              >
                Categories
                <ChevronDown className={cn("w-4 h-4", isCategoriesOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 w-56 bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg py-2"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        to={`/products?category=${cat}`}
                        className="block px-4 py-2 text-sm hover:bg-slate-100"
                        onClick={() => setIsCategoriesOpen(false)} // ✅ AUTO CLOSE
                      >
                        {cat}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode */}
            <button onClick={toggle} className="p-2 rounded-full">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Home */}
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Home className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 relative">
              <Heart className="w-5 h-5" />
              {wishlistItems?.length > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}
            <div className="relative">
              {user ? (
                <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  <img 
                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
                    className="w-8 h-8 rounded-full" 
                  />
                </button>
              ) : (
                <Link to="/login" className="btn-primary">Login</Link>
              )}

              <AnimatePresence>
                {isProfileOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1e1e1e] border rounded-lg shadow-lg py-2"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>

                    <Link to="/profile" className="block px-4 py-2">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2">Orders</Link>

                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}