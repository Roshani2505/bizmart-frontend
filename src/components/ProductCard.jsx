import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  const isLiked = isInWishlist(product.id);

  // ✅ SAFE IMAGE
  const safeImages = product.images?.length
    ? product.images
    : [
        product.image ||
        `https://source.unsplash.com/400x400/?${encodeURIComponent(product.name || "product")}`
      ];

  useEffect(() => {
    if (!safeImages.length) return;

    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % safeImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [safeImages]);

  // ❤️ WISHLIST (NO LOGIN REQUIRED)
  const toggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const cleanProduct = {
      ...product,
      images: safeImages
    };

    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(cleanProduct);
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 800);
    }
  };

  // 🛒 CART (LOGIN REQUIRED)
  const handleCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login?redirect=/products');
      return;
    }

    addToCart(product);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 800);
  };

  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;

  return (
    <div className="card relative overflow-hidden group">

      {/* SALE */}
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
          {product.discount}% OFF
        </div>
      )}

      {/* ❤️ Animation */}
      <AnimatePresence>
        {animateHeart && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
            className="absolute top-4 right-4 text-red-500 text-xl z-20"
          >
            ❤️
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛒 Animation */}
      <AnimatePresence>
        {animateCart && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-4 right-4 text-green-500 text-xl z-20"
          >
            🛒
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❤️ BUTTON */}
      <button
        onClick={toggleWishlist}
        className={cn(
          "absolute top-2 right-2 z-20 p-1.5 rounded-full",
          isLiked ? "bg-red-500 text-white" : "bg-white/80 text-slate-400"
        )}
      >
        <Heart className="w-4 h-4" fill={isLiked ? "white" : "none"} />
      </button>

      {/* IMAGE */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={safeImages[currentImage]}
            className="w-full h-full object-cover"
          />

          {/* DOTS */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {safeImages.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i === currentImage ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-sm font-semibold">{product.name}</h3>

        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <span className="font-bold text-red-500">
                  ₹{discountedPrice}
                </span>
                <span className="text-xs line-through text-gray-400">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="font-bold">₹{product.price}</span>
            )}
          </div>

          <button
            onClick={handleCart}
            className="p-2 bg-slate-100 rounded-md hover:bg-primary hover:text-white"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}