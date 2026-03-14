import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentForm({ onSuccess }) {

  const { totalPrice } = useCart();

  const [loading, setLoading] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [method, setMethod] = useState("upi");

  const handlePay = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowGateway(true);
    }, 1500);

  };

  const handleSubmit = () => {
    alert("Payment Successful ✅");
    onSuccess();
  };

  return (

    <div>

      {/* PAY BUTTON */}

      {!showGateway && (

        <button
          onClick={handlePay}
          className="w-full bg-[#d98b8b] text-white py-3 rounded-lg font-semibold hover:bg-[#c97979] transition"
        >
          {loading ? "Processing Payment..." : `Pay ₹${totalPrice}`}
        </button>

      )}

      {/* GATEWAY */}

      {showGateway && (

        <div className="border border-[#ead7cf] rounded-lg p-6 space-y-4 bg-[#fff7f4]">

          <h3 className="text-lg font-semibold">
            Choose Payment Method
          </h3>

          {/* METHOD SELECT */}

          <div className="flex gap-4">

            <button
              onClick={() => setMethod("upi")}
              className={`px-4 py-2 border border-[#ead7cf] rounded ${
                method === "upi" ? "bg-[#f3e3dc]" : ""
              }`}
            >
              UPI
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`px-4 py-2 border border-[#ead7cf] rounded ${
                method === "card" ? "bg-[#f3e3dc]" : ""
              }`}
            >
              Card
            </button>

            <button
              onClick={() => setMethod("netbanking")}
              className={`px-4 py-2 border border-[#ead7cf] rounded ${
                method === "netbanking" ? "bg-[#f3e3dc]" : ""
              }`}
            >
              Netbanking
            </button>

          </div>

          {/* UPI FORM */}

          {method === "upi" && (

            <div className="space-y-3">

              <input
                placeholder="Enter UPI ID (example@upi)"
                className="border border-[#ead7cf] rounded-lg px-4 py-2 w-full"
              />

              <button
                onClick={handleSubmit}
                className="bg-[#d98b8b] text-white px-6 py-2 rounded hover:bg-[#c97979] transition"
              >
                Pay via UPI
              </button>

            </div>

          )}

          {/* CARD FORM */}

          {method === "card" && (

            <div className="space-y-3">

              <input
                placeholder="Card Number"
                className="border border-[#ead7cf] rounded-lg px-4 py-2 w-full"
              />

              <input
                placeholder="Card Holder Name"
                className="border border-[#ead7cf] rounded-lg px-4 py-2 w-full"
              />

              <div className="flex gap-3">

                <input
                  placeholder="MM/YY"
                  className="border border-[#ead7cf] rounded-lg px-4 py-2 w-full"
                />

                <input
                  placeholder="CVV"
                  className="border border-[#ead7cf] rounded-lg px-4 py-2 w-full"
                />

              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#d98b8b] text-white px-6 py-2 rounded hover:bg-[#c97979] transition"
              >
                Pay via Card
              </button>

            </div>

          )}

          {/* NETBANKING */}

          {method === "netbanking" && (

            <div className="space-y-3">

              <select className="border border-[#ead7cf] rounded-lg px-4 py-2 w-full">

                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis Bank</option>

              </select>

              <button
                onClick={handleSubmit}
                className="bg-[#d98b8b] text-white px-6 py-2 rounded hover:bg-[#c97979] transition"
              >
                Continue to Bank
              </button>

            </div>

          )}

        </div>

      )}

    </div>

  );
}