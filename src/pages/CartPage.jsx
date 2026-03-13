import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {

const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
const navigate = useNavigate();

useEffect(() => {

const user = localStorage.getItem("user");

if (!user) {
  alert("Please login first");
  navigate("/login");
}

}, []);

if (items.length === 0) {
return (
<div className="max-w-6xl mx-auto pt-32 text-center">
<h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
<Link
to="/products"
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
Start Shopping
</Link>
</div>
);
}

return (

<div className="max-w-6xl mx-auto pt-28 px-6">

  <h1 className="text-3xl font-bold mb-8">
    Shopping Cart ({totalItems})
  </h1>

  <div className="space-y-6">

    {items.map(item => (

      <div
        key={item.productId}
        className="flex items-center gap-6 border p-4 rounded-lg"
      >

        <img
          src={item.product.images[0]}
          className="w-24 h-24 object-cover rounded"
        />

        <div className="flex-1">

          <h2 className="font-semibold text-lg">
            {item.product.name}
          </h2>

          <p className="text-gray-600">
            ₹{item.product.price}
          </p>

          <div className="flex items-center gap-3 mt-3">

            <button
              onClick={() => {
                if (item.quantity > 1)
                  updateQuantity(item.productId, item.quantity - 1)
              }}
              className="border px-3 py-1"
            >
              <Minus size={14} />
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1)
              }
              className="border px-3 py-1"
            >
              <Plus size={14} />
            </button>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-red-500 ml-4"
            >
              <Trash2 size={16} />
            </button>

          </div>

        </div>

        <div className="font-semibold">
          ₹{item.product.price * item.quantity}
        </div>

      </div>

    ))}

  </div>

  <div className="mt-10 border-t pt-6 max-w-md ml-auto">

    <div className="flex justify-between mb-3">
      <span>Items:</span>
      <span>{totalItems}</span>
    </div>

    <div className="flex justify-between mb-3">
      <span>Subtotal:</span>
      <span>₹{totalPrice}</span>
    </div>

    <div className="flex justify-between text-xl font-bold">
      <span>Total:</span>
      <span>₹{totalPrice}</span>
    </div>

    <button
      onClick={() => navigate("/checkout")}
      className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg"
    >
      Proceed to Checkout
    </button>

  </div>

</div>

);
}