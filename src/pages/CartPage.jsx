import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your cart is empty</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our professional marketplace to find what you need.
        </p>
        <Link to="/products" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
          Start Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shopping Cart</h1>
        <span className="text-slate-500 dark:text-slate-400">{totalItems} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="card p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Link to={`/product/${item.productId}`} className="font-bold text-slate-900 dark:text-white hover:text-primary transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Vendor: {item.product.vendorName}</p>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 text-center">
                  <span className="sm:hidden text-xs font-bold text-slate-400 uppercase mr-2">Price:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${item.product.price}</span>
                </div>

                <div className="col-span-1 sm:col-span-2 flex justify-center">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden h-9">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 text-right">
                  <span className="sm:hidden text-xs font-bold text-slate-400 uppercase mr-2">Total:</span>
                  <span className="font-bold text-slate-900 dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline pt-4">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="card p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                <span className="text-emerald-500 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Tax</span>
                <span className="font-semibold text-slate-900 dark:text-white">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary">${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  className="input-field pl-10 pr-20 py-2 text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:underline">
                  Apply
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
              >
                Checkout Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secure checkout powered by Stripe
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Truck className="w-4 h-4 text-emerald-500" />
                Free delivery on orders over $50
              </div>
            </div>
          </div>

          {/* AI Recommendation Mini-Card */}
          <div className="card p-4 bg-primary/5 border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Suggestion</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Based on your items, users also bought the <strong>Ergonomic Mouse Pad</strong> to complete their setup.
            </p>
            <button className="w-full btn-secondary py-2 text-xs font-bold">
              Add for $19.99
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
