import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">❤️ My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500">
          Your wishlist is empty 😢
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* ✅ ACTUAL PRODUCTS RENDER */}
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}

        </div>
      )}
    </div>
  );
}

export default WishlistPage;