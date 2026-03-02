import React, { createContext, useContext, useState, useEffect } from "react";
import API from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const { user } = useAuth();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /* =========================
     💾 LOCAL STORAGE SYNC
  ========================== */
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* =========================
     🔥 BACKEND FETCH (SAFE)
  ========================== */
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const res = await API.get('/wishlist');

        // 🔥 IMPORTANT: only override if data exists
        if (res.data && res.data.length > 0) {
          const fixed = res.data.map(item => ({
            ...item,
            id: String(item.id), // 🔥 normalize
            images: item.images?.length
              ? item.images
              : [item.image || `https://source.unsplash.com/400x400/?${item.name}`]
          }));

          setWishlist(fixed);
        }

      } catch (err) {
        console.log("Wishlist backend not available, using local");
      }
    };

    fetchWishlist();
  }, [user]);

  /* =========================
     ➕ ADD
  ========================== */
  const addToWishlist = async (product) => {

    const cleanProduct = {
      ...product,
      id: String(product.id), // 🔥 FIX
      images: product.images?.length
        ? product.images
        : [product.image || `https://source.unsplash.com/400x400/?${product.name}`]
    };

    setWishlist(prev => {
      if (prev.find(item => item.id === cleanProduct.id)) return prev;
      return [...prev, cleanProduct];
    });

    if (user) {
      try {
        await API.post('/wishlist', { productId: cleanProduct.id });
      } catch {
        console.log("Backend wishlist add failed");
      }
    }
  };

  /* =========================
     ❌ REMOVE
  ========================== */
  const removeFromWishlist = async (id) => {

    const fixedId = String(id);

    setWishlist(prev => prev.filter(item => item.id !== fixedId));

    if (user) {
      try {
        await API.delete(`/wishlist/${fixedId}`);
      } catch {
        console.log("Backend wishlist remove failed");
      }
    }
  };

  /* =========================
     🔍 CHECK
  ========================== */
  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === String(id));
  };

  /* =========================
     🛒 MOVE TO CART
  ========================== */
  const moveToCart = (id, addToCart) => {
    const item = wishlist.find(p => p.id === String(id));
    if (!item) return;

    addToCart(item, 1);
    removeFromWishlist(id);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist,
        wishlistItems: wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}