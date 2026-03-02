import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext.jsx';
import API from '../services/api';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {

  const { showToast } = useToast();
  const [items, setItems] = useState([]);

  // ✅ FETCH CART FROM BACKEND
  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');

      // 🔥 Normalize backend data
      const formatted = res.data.map(item => ({
        productId: item.product_id,
        quantity: item.quantity,
        product: {
          id: item.product_id,
          name: item.name,
          price: item.price,
          images: [item.image], // backend gives single image
        }
      }));

      setItems(formatted);

    } catch (err) {
      console.log("Cart fetch error", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ ADD TO CART (FIXED 🔥)
  const addToCart = async (product, quantity = 1) => {
  try {
    await API.post('/cart', {
      product_id: product.id, // ✅ IMPORTANT
      quantity
    });

    showToast(`${product.name} added to cart 🛒`);

    const res = await API.get('/cart');
    setItems(res.data);

  } catch (err) {
    console.log("Cart error", err.response?.data || err.message);
  }
};

  // ✅ REMOVE ITEM
  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);

      setItems(prev => prev.filter(item => item.productId !== productId));

      showToast("Item removed ❌");

    } catch (err) {
      console.log("Remove error", err);
    }
  };

  // ✅ UPDATE QUANTITY (FIXED 🔥)
  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put('/cart', {
        product_id: productId, // ✅ FIXED
        quantity
      });

      await fetchCart();

    } catch (err) {
      console.log("Update quantity error", err);
    }
  };

  // ✅ CLEAR CART (OPTIONAL - backend route required)
  const clearCart = async () => {
    try {
      await API.delete('/cart');

      setItems([]);

      showToast("Cart cleared 🧹");

    } catch (err) {
      console.log("Clear cart error", err);
    }
  };

  // ✅ TOTALS
  const totalItems = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + ((item.product?.price || 0) * (item.quantity || 0)),
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}