import React, { useState } from "react";
import {
LayoutDashboard,
Package,
ShoppingCart,
Users,
TrendingUp,
Zap,
Plus
} from "lucide-react";

import {
CartesianGrid,
Tooltip,
ResponsiveContainer,
XAxis,
YAxis,
AreaChart,
Area
} from "recharts";

const REVENUE_DATA = [
{ name: "Mon", revenue: 4500 },
{ name: "Tue", revenue: 5200 },
{ name: "Wed", revenue: 3800 },
{ name: "Thu", revenue: 6100 },
{ name: "Fri", revenue: 5900 },
{ name: "Sat", revenue: 7200 },
{ name: "Sun", revenue: 6800 }
];

export default function VendorDashboard() {

const [activeTab, setActiveTab] = useState("overview");

const products =
JSON.parse(localStorage.getItem("vendorProducts")) || [];

const orders =
JSON.parse(localStorage.getItem("orders")) || [];

return (

<div className="flex min-h-screen bg-[#f6eee9]">

<aside className="w-64 fixed top-0 left-0 h-screen bg-[#fff7f4] border-r border-[#ead7cf]">

<div className="p-6 font-bold text-xl flex items-center gap-2">
<LayoutDashboard size={20} />
VendorHub
</div>

<nav className="flex flex-col gap-2 p-4">

{[
{ id: "overview", icon: LayoutDashboard, label: "Overview" },
{ id: "products", icon: Package, label: "Products" },
{ id: "orders", icon: ShoppingCart, label: "Orders" },
{ id: "customers", icon: Users, label: "Customers" },
{ id: "analytics", icon: TrendingUp, label: "Analytics" },
{ id: "referrals", icon: Zap, label: "Referrals" }
].map((item) => {

const Icon = item.icon;

return (
<button
key={item.id}
onClick={() => setActiveTab(item.id)}
className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
activeTab === item.id
? "bg-[#f3e3dc] text-[#c97979]"
: "hover:bg-[#f3e3dc]"
}`}
>
<Icon size={18} />
{item.label}
</button>
);

})}

</nav>

<div className="p-4 border-t mt-auto">
<button
onClick={() => {
localStorage.removeItem("user");
window.location.href = "/login";
}}
className="text-[#c97979]"
>
Logout
</button>
</div>

</aside>

<main className="ml-64 p-8 w-full">

{activeTab === "overview" && (
<Overview products={products} />
)}

{activeTab === "products" && (
<ProductsTab products={products} />
)}

{activeTab === "orders" && (
<OrdersTab orders={orders} />
)}

</main>

</div>

);
}

function Overview({ products }) {

return (

<div className="space-y-8">

<div className="flex justify-between">

<h1 className="text-2xl font-bold">
Dashboard Overview
</h1>

<a
href="/vendor/add-product"
className="bg-[#d98b8b] text-white px-4 py-2 rounded-lg flex items-center gap-2"
>
<Plus size={16} />
Add Product
</a>

</div>

<div className="grid grid-cols-4 gap-6">

<Card title="Products" value={products.length} />
<Card title="Orders" value="4" />
<Card title="Revenue" value="₹45231" />
<Card title="Low Stock" value="12" />

</div>

<div className="bg-[#fff7f4] border border-[#ead7cf] p-6 rounded-xl">

<h2 className="mb-4 font-semibold">
Revenue Performance
</h2>

<div style={{ width: "100%", height: 300 }}>

<ResponsiveContainer>

<AreaChart data={REVENUE_DATA}>

<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />

<Area
type="monotone"
dataKey="revenue"
stroke="#c97979"
fill="#c9797920"
/>

</AreaChart>

</ResponsiveContainer>

</div>

</div>

</div>

);
}

function ProductsTab({ products }) {

return (

<div>

<h1 className="text-2xl font-bold mb-6">
Products
</h1>

<div className="grid grid-cols-3 gap-6">

{products.map((p) => (

<div
key={p.id}
className="bg-[#fff7f4] border border-[#ead7cf] p-4 rounded-xl"
>

<img
src={p.images[0]}
className="w-full h-40 object-cover rounded mb-3"
/>

<h3 className="font-semibold">
{p.name}
</h3>

<p className="text-[#c97979] font-bold">
₹{p.price}
</p>

</div>

))}

</div>

</div>

);
}

function OrdersTab({ orders }) {

return (

<div>

<h1 className="text-2xl font-bold mb-6">
Vendor Orders
</h1>

<div className="space-y-4">

{orders.map((order) => (

<div
key={order.id}
className="bg-[#fff7f4] border border-[#ead7cf] p-4 rounded-xl flex justify-between"
>

<div>
<p className="font-semibold">
Order #{order.id}
</p>

<p className="text-sm text-[#7a6a64]">
{order.date}
</p>
</div>

<span className="font-bold text-[#c97979]">
₹{order.total}
</span>

</div>

))}

</div>

</div>

);
}

function Card({ title, value }) {

return (

<div className="bg-[#fff7f4] border border-[#ead7cf] p-6 rounded-xl">

<p className="text-sm text-[#7a6a64]">
{title}
</p>

<h3 className="text-xl font-bold">
{value}
</h3>

</div>

);
}