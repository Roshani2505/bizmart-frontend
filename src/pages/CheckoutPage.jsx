import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard, CheckCircle2 } from "lucide-react";
import PaymentForm from "../components/PaymentForm";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function CheckoutPage() {

const [paymentMethod, setPaymentMethod] = useState("online");

const { items, totalPrice, clearCart } = useCart();
const navigate = useNavigate();
const [isSuccess, setIsSuccess] = useState(false);

const handleComplete = () => {

const user = JSON.parse(localStorage.getItem("user"));
const orders = JSON.parse(localStorage.getItem("orders")) || [];

const newOrder = {
id: "BM-" + Math.floor(Math.random() * 100000),
date: new Date().toLocaleDateString(),
customer: user?.email,
total: totalPrice,
items,
status: "processing"
};

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));

setIsSuccess(true);

setTimeout(() => {
clearCart();
navigate("/orders");
},2000);

};

if(isSuccess){

return(
<div className="max-w-6xl mx-auto pt-32 text-center">

<motion.div
initial={{scale:0.8,opacity:0}}
animate={{scale:1,opacity:1}}
className="inline-flex items-center justify-center w-24 h-24 bg-[#f3e3dc] rounded-full mb-8"
>

<CheckCircle2 className="w-12 h-12 text-[#c97979]"/>

</motion.div>

<h1 className="text-4xl font-bold mb-4">
Order Confirmed!
</h1>

</div>
)

}

return(

<div className="max-w-7xl mx-auto pt-32 px-6 pb-40">

<h1 className="text-3xl font-bold mb-10">
Checkout
</h1>

<div className="grid md:grid-cols-2 gap-12">

{/* LEFT SIDE */}

<div>

<h2 className="text-xl font-semibold mb-6">
Payment Method
</h2>

<div className="space-y-4">

<label className="flex items-center gap-3 border border-[#ead7cf] p-4 rounded-lg">
<input
type="radio"
checked={paymentMethod === "online"}
onChange={() => setPaymentMethod("online")}
/>
<CreditCard size={18}/>
Online Payment
</label>

<label className="flex items-center gap-3 border border-[#ead7cf] p-4 rounded-lg">
<input
type="radio"
checked={paymentMethod === "cod"}
onChange={() => setPaymentMethod("cod")}
/>
<ShieldCheck size={18}/>
Cash on Delivery
</label>

</div>

{paymentMethod === "online" && (
<div className="mt-8">
<PaymentForm/>
</div>
)}

</div>

{/* RIGHT SIDE */}

<div className="bg-[#fff7f4] border border-[#ead7cf] rounded-xl p-6 h-fit">

<h2 className="text-xl font-semibold mb-6">
Order Summary
</h2>

<div className="space-y-4">

{items.map(item => (

<div key={item.productId} className="flex justify-between text-sm">

<span>{item.product.name} × {item.quantity}</span>

<span>
₹{item.product.price * item.quantity}
</span>

</div>

))}

</div>

<div className="border-t my-6"></div>

<div className="flex justify-between font-bold text-lg">

<span>Total</span>

<span>₹{totalPrice}</span>

</div>

<button
onClick={handleComplete}
className="w-full mt-6 bg-[#d98b8b] text-white py-3 rounded-lg hover:bg-[#c97979]"
>
Place Order
</button>

</div>

</div>

</div>

);

}