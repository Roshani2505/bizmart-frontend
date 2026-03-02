import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; // ✅ FIX

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorStorefrontPage from './pages/VendorStorefrontPage';
import ReferralLinkManagementPage from './pages/ReferralLinkManagementPage';
import ProductComparisonPage from './pages/ProductComparisonPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage'; // ✅ NEW
import { ToastProvider } from './context/ToastContext.jsx';
import { motion, AnimatePresence } from 'motion/react';
import Chatbot from './components/Chatbot';

function AppContent() {
  const location = useLocation();
  const isVendorDashboard = location.pathname.startsWith('/vendor/dashboard');

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
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/store/:id" element={<VendorStorefrontPage />} />
              <Route path="/vendor/referrals" element={<ReferralLinkManagementPage />} />
              <Route path="/compare" element={<ProductComparisonPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />

              {/* ✅ FIXED */}
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
      <ToastProvider> {/* ✅ SABSE UPAR */}
        <CartProvider>
          <WishlistProvider>
            <Router>
              <AppContent />
              <Chatbot/>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
    
  );
}