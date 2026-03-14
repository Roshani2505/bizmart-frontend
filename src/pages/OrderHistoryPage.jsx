import React, { useEffect, useState } from "react";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

export default function OrderHistoryPage() {

const [orders, setOrders] = useState([]);

useEffect(() => {
const saved = localStorage.getItem("orders");
setOrders(saved ? JSON.parse(saved) : []);
}, []);

const getStatusIcon = (status) => {
if (status === "processing") return <Clock className="text-yellow-500" size={18} />;
if (status === "shipped") return <Truck className="text-blue-500" size={18} />;
if (status === "delivered") return <CheckCircle2 className="text-green-500" size={18} />;
return <Package size={18} />;
};

if (orders.length === 0) {
return (
<div className="max-w-7xl mx-auto pt-32 text-center">

<h2 className="text-2xl font-bold mb-2">
No Orders Yet 😔
</h2>

<p className="text-[#7a6a64]">
Start shopping to see your orders here.
</p>

</div>
);
}

return (

<div className="max-w-7xl mx-auto pt-28 pb-20 px-6">

<h1 className="text-3xl font-bold mb-10 flex items-center gap-2">
📦 My Orders
</h1>

<div className="space-y-8">

{orders.map((order) => (

<div
key={order.id}
className="bg-[#fff7f4] border border-[#ead7cf] rounded-xl shadow-sm overflow-hidden"
>

{/* ORDER HEADER */}

<div className="flex flex-wrap justify-between gap-6 p-6 border-b">

<div>
<p className="text-xs text-gray-400">
Order ID
</p>
<p className="font-semibold">
{order.id}
</p>
</div>

<div>
<p className="text-xs text-gray-400">
Date
</p>
<p className="font-semibold">
{order.date}
</p>
</div>

<div>
<p className="text-xs text-gray-400">
Total
</p>
<p className="font-semibold">
₹{order.total}
</p>
</div>

<div className="flex items-center gap-2">
{getStatusIcon(order.status)}
<span className="capitalize text-sm">
{order.status || "processing"}
</span>
</div>

</div>

{/* ORDER ITEMS */}

<div className="p-6 space-y-4">

{order.items.map((item, i) => (

<div
key={i}
className="flex items-center gap-4"
>

<img
src={item.product.images?.[0]}
alt={item.product.name}
className="w-20 h-20 object-cover rounded-lg"
/>

<div className="flex-1">

<p className="font-semibold">
{item.product.name}
</p>

<p className="text-sm text-[#7a6a64]">
Qty: {item.quantity}
</p>

</div>

<div className="font-semibold">
₹{item.product.price * item.quantity}
</div>

</div>

))}

</div>

</div>

))}

</div>

</div>

);

}