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
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Processing Payment..." : `Pay ₹${totalPrice}`}
        </button>

      )}

      {/* GATEWAY MODAL */}

      {showGateway && (

        <div className="border rounded-lg p-6 space-y-4 bg-gray-50">

          <h3 className="text-lg font-semibold">
            Choose Payment Method
          </h3>

          {/* METHOD SELECT */}

          <div className="flex gap-4">

            <button
              onClick={() => setMethod("upi")}
              className={`px-4 py-2 border rounded ${
                method === "upi" ? "bg-green-100" : ""
              }`}
            >
              UPI
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`px-4 py-2 border rounded ${
                method === "card" ? "bg-green-100" : ""
              }`}
            >
              Card
            </button>

            <button
              onClick={() => setMethod("netbanking")}
              className={`px-4 py-2 border rounded ${
                method === "netbanking" ? "bg-green-100" : ""
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
                className="border rounded-lg px-4 py-2 w-full"
              />

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded"
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
                className="border rounded-lg px-4 py-2 w-full"
              />

              <input
                placeholder="Card Holder Name"
                className="border rounded-lg px-4 py-2 w-full"
              />

              <div className="flex gap-3">

                <input
                  placeholder="MM/YY"
                  className="border rounded-lg px-4 py-2 w-full"
                />

                <input
                  placeholder="CVV"
                  className="border rounded-lg px-4 py-2 w-full"
                />

              </div>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Pay via Card
              </button>

            </div>

          )}

          {/* NETBANKING */}

          {method === "netbanking" && (

            <div className="space-y-3">

              <select className="border rounded-lg px-4 py-2 w-full">

                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis Bank</option>

              </select>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded"
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