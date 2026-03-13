import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext.jsx";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

/* ⭐ VENDOR PAGES */
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProduct from "./pages/vendor/AddProduct";
import ManageProducts from "./pages/vendor/ManageProducts";

import VendorStorefrontPage from "./pages/VendorStorefrontPage";
import ReferralLinkManagementPage from "./pages/ReferralLinkManagementPage";

import ProductComparisonPage from "./pages/ProductComparisonPage";
import ProfilePage from "./pages/ProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import WishlistPage from "./pages/WishlistPage";

/* ⭐ CATEGORY PAGES */
import CategoriesPage from "./pages/CategoriesPage";
import CategoryView from "./pages/CategoryView";

import { motion, AnimatePresence } from "framer-motion";

function AppContent() {

const location = useLocation();

/* Hide navbar/footer for ALL vendor pages */
const isVendorDashboard = location.pathname.startsWith("/vendor");

return (

<div className="min-h-screen flex flex-col bg-white dark:bg-[#121212]">

  {!isVendorDashboard && <Navbar />}

  <main className="flex-grow">

    <AnimatePresence mode="wait">

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >

        <Routes location={location}>

          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />

          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* CATEGORY PAGES */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryView />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* ⭐ VENDOR ROUTES */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/add-product" element={<AddProduct />} />
          <Route path="/vendor/products" element={<ManageProducts />} />

          <Route path="/vendor/store/:id" element={<VendorStorefrontPage />} />
          <Route path="/vendor/referrals" element={<ReferralLinkManagementPage />} />

          {/* OTHER FEATURES */}
          <Route path="/compare" element={<ProductComparisonPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

        </Routes>

      </motion.div>

    </AnimatePresence>

  </main>

  {!isVendorDashboard && <Footer />}

</div>

);
}

export default function App() {

return (

<AuthProvider>
  <ToastProvider>
    <CartProvider>
      <WishlistProvider>

        <AppContent />

        <Chatbot />

      </WishlistProvider>
    </CartProvider>
  </ToastProvider>
</AuthProvider>

);
}