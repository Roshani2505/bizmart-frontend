import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
ShieldCheck,
CreditCard,
CheckCircle2,
ArrowLeft,
MapPin
} from "lucide-react";

import PaymentForm from "../components/PaymentForm";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {

const [step, setStep] = useState(1);
const [paymentMethod, setPaymentMethod] = useState("online");

const { items, totalPrice, clearCart } = useCart();
const navigate = useNavigate();
const [isSuccess, setIsSuccess] = useState(false);

const handleNext = () => setStep(step + 1);
const handleBack = () => setStep(step - 1);

const handleComplete = () => {

const handleComplete = () => {

const user = JSON.parse(localStorage.getItem("user"));

const orders = JSON.parse(localStorage.getItem("orders")) || [];

const newOrder = {
id: "BM-" + Math.floor(Math.random() * 100000),
date: new Date().toLocaleDateString(),
customer: user?.email,
total: totalPrice,
items,
status: paymentMethod === "cod" ? "COD Pending" : "Paid"
};

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));

setIsSuccess(true);

setTimeout(() => {
clearCart();
navigate("/orders");
}, 2000);

};

const existing = JSON.parse(localStorage.getItem("orders")) || [];

localStorage.setItem(
  "orders",
  JSON.stringify([newOrder, ...existing])
);

setIsSuccess(true);

setTimeout(() => {
  clearCart();
  navigate("/orders");
}, 2000);

};

if (isSuccess) {
return (
<div className="max-w-6xl mx-auto pt-32 px-6 pb-20 text-center">

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
    >
      <CheckCircle2 className="w-12 h-12 text-green-600" />
    </motion.div>

    <h1 className="text-4xl font-bold mb-4">
      Order Confirmed!
    </h1>

    <p className="text-gray-500 mb-8">
      Thank you for your purchase.
    </p>

    <div className="flex justify-center gap-4">
      <button
        onClick={() => navigate("/orders")}
        className="px-6 py-3 border rounded-lg"
      >
        View Orders
      </button>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        Back Home
      </button>
    </div>

  </div>
);

}

return (

<div className="max-w-7xl mx-auto pt-32 px-6 pb-20">

  {/* HEADER */}

  <div className="flex items-center gap-4 mb-10">

    <button
      onClick={() => navigate("/cart")}
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <ArrowLeft size={22}/>
    </button>

    <h1 className="text-3xl font-bold">
      Checkout
    </h1>

  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

    {/* LEFT */}

    <div className="lg:col-span-2">

      {/* STEPS */}

      <div className="flex justify-between mb-10">

        {["Shipping", "Payment", "Review"].map((label, i) => (

          <div key={i} className="flex flex-col items-center gap-2">

            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
                step >= i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </div>

            <span className="text-sm">{label}</span>

          </div>

        ))}

      </div>

      <AnimatePresence mode="wait">

        {/* STEP 1 SHIPPING */}

        {step === 1 && (

          <motion.div
            key="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin size={20}/>
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  placeholder="Full Name"
                  className="border rounded-lg px-4 py-3"
                />

                <input
                  placeholder="Address"
                  className="border rounded-lg px-4 py-3"
                />

                <input
                  placeholder="City"
                  className="border rounded-lg px-4 py-3"
                />

                <input
                  placeholder="Postal Code"
                  className="border rounded-lg px-4 py-3"
                />

              </div>

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={() => navigate("/cart")}
                className="flex-1 border py-3 rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg"
              >
                Continue
              </button>

            </div>

          </motion.div>

        )}

        {/* STEP 2 PAYMENT */}

        {step === 2 && (

          <motion.div
            key="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">

              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CreditCard size={20}/>
                Payment Method
              </h2>

              {/* ONLINE PAYMENT */}

              <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">

                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-green-600"
                />

                <span>UPI / Card / Netbanking</span>

              </label>

              {/* COD */}

              <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">

                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-green-600"
                />

                <span>Cash on Delivery</span>

              </label>

              {/* PAYMENT BUTTON */}

              {paymentMethod === "online" ? (
                <PaymentForm onSuccess={handleNext}/>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full bg-green-600 text-white py-3 rounded-lg"
                >
                  Continue with COD
                </button>
              )}

            </div>

            <button
              onClick={handleBack}
              className="mt-4 border px-6 py-3 rounded-lg"
            >
              Back
            </button>

          </motion.div>

        )}

        {/* STEP 3 REVIEW */}

        {step === 3 && (

          <motion.div
            key="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <div className="bg-white border rounded-xl p-6 space-y-4">

              <h2 className="text-xl font-semibold">
                Review Order
              </h2>

              {items.map((item) => (

                <div
                  key={item.productId}
                  className="flex justify-between"
                >

                  <span>
                    {item.product.name} x {item.quantity}
                  </span>

                  <span>
                    ₹{item.product.price * item.quantity}
                  </span>

                </div>

              ))}

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={handleBack}
                className="flex-1 border py-3 rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleComplete}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg"
              >
                Place Order
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

    {/* RIGHT SUMMARY */}

    <div className="bg-white border rounded-xl p-6 h-fit">

      <h2 className="text-xl font-semibold mb-6">
        Summary
      </h2>

      <div className="flex justify-between mb-3">
        <span>Subtotal</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="flex justify-between mb-3">
        <span>Tax</span>
        <span>₹{(totalPrice * 0.08).toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>₹{(totalPrice * 1.08).toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
        <ShieldCheck size={18}/>
        Secure Checkout
      </div>

    </div>

  </div>

</div>

);
}