import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Lock,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleComplete = () => {

  // ✅ CREATE ORDER OBJECT
  const newOrder = {
    id: "BM-" + Math.floor(Math.random() * 100000),
    date: new Date().toLocaleDateString(),
    total: totalPrice,
    status: "processing",
    items: items
  };

  // ✅ SAVE TO LOCAL STORAGE
  const existing = JSON.parse(localStorage.getItem("orders")) || [];
  localStorage.setItem("orders", JSON.stringify([newOrder, ...existing]));

  setIsSuccess(true);

  setTimeout(() => {
    clearCart();
    navigate('/orders'); // ✅ direct orders page
  }, 2000);
};
  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </motion.div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Thank you for your purchase. Your order #BM-92841 has been placed and is being processed.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('/orders')} className="btn-secondary px-8 py-3">View Order</button>
          <button onClick={() => navigate('/')} className="btn-primary px-8 py-3">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/cart')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* PROGRESS */}
          <div className="flex items-center justify-between relative mb-12">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
            {[1,2,3].map((n) => (
              <div key={n} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= n ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > n ? <CheckCircle2 className="w-6 h-6" /> : n}
                </div>
                <span className={`text-xs font-bold ${step >= n ? 'text-primary' : 'text-slate-400'}`}>
                  {n === 1 ? 'Shipping' : n === 2 ? 'Payment' : 'Review'}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
                <div className="card p-6 space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary"/> Shipping Info
                  </h2>

                  <input className="input-field" placeholder="Full Name"/>
                  <input className="input-field" placeholder="Address"/>
                  <input className="input-field" placeholder="City"/>
                  <input className="input-field" placeholder="Postal Code"/>
                </div>

                <button onClick={handleNext} className="w-full btn-primary py-4 mt-4">
                  Continue
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
                <div className="card p-6 space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary"/> Payment
                  </h2>

                  <input className="input-field" placeholder="Card Number"/>
                  <input className="input-field" placeholder="Expiry"/>
                  <input className="input-field" placeholder="CVV"/>
                </div>

                <div className="flex gap-4 mt-4">
                  <button onClick={handleBack} className="flex-1 btn-secondary py-4">Back</button>
                  <button onClick={handleNext} className="flex-1 btn-primary py-4">Next</button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
                <div className="card p-6 space-y-4">
                  <h2 className="text-xl font-bold">Review Order</h2>

                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img 
                          src={item.product.images?.[0] || 'https://via.placeholder.com/100'} 
                          className="w-12 h-12 rounded"
                        />
                        <span>{item.product.name}</span>
                      </div>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-4">
                  <button onClick={handleBack} className="flex-1 btn-secondary py-4">Back</button>
                  <button onClick={handleComplete} className="flex-1 btn-primary py-4">Place Order</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* RIGHT SIDE */}
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-bold">Summary</h2>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${(totalPrice * 0.08).toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${(totalPrice * 1.08).toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-5 h-5 text-emerald-500"/>
            Secure Checkout
          </div>
        </div>

      </div>
    </div>
  );
}