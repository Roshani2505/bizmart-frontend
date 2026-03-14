import React, { useState } from "react";
import {
LayoutDashboard,
Users,
Store,
Package,
ShoppingCart,
BarChart3
} from "lucide-react";

export default function AdminDashboard() {

const [tab, setTab] = useState("overview");

const users =
JSON.parse(localStorage.getItem("users")) || [];

const vendors =
users.filter(u => u.role === "vendor");

const orders =
JSON.parse(localStorage.getItem("orders")) || [];

const revenue =
orders.reduce((sum, o) => sum + (o.total || 0), 0);

return (

<div className="flex min-h-screen bg-[#f6eee9]">

{/* SIDEBAR */}

<aside className="w-64 bg-[#fff7f4] border-r border-[#ead7cf] fixed h-screen">

<div className="p-6 font-bold text-xl text-[#2d2d2d]">
Admin Panel
</div>

<nav className="flex flex-col gap-2 p-4">

{[
{ id: "overview", icon: LayoutDashboard, label: "Overview" },
{ id: "users", icon: Users, label: "Users" },
{ id: "vendors", icon: Store, label: "Vendors" },
{ id: "products", icon: Package, label: "Products" },
{ id: "orders", icon: ShoppingCart, label: "Orders" },
{ id: "analytics", icon: BarChart3, label: "Analytics" }
].map((item) => {

const Icon = item.icon;

return (

<button
key={item.id}
onClick={() => setTab(item.id)}
className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
tab === item.id
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

</aside>

{/* MAIN */}

<main className="ml-64 p-8 w-full">

{tab === "overview" && (
<Overview
users={users}
vendors={vendors}
orders={orders}
revenue={revenue}
/>
)}

{tab === "vendors" && (
<VendorsSection users={users} />
)}

{tab !== "overview" &&
tab !== "vendors" && (
<Section title={tab} />
)}

</main>

</div>

);
}

function Overview({ users, vendors, orders, revenue }) {

return (

<div className="space-y-8">

<h1 className="text-3xl font-bold text-[#2d2d2d]">
Admin Dashboard
</h1>

<div className="grid grid-cols-4 gap-6">

<Card title="Total Users" value={users.length} />
<Card title="Total Vendors" value={vendors.length} />
<Card title="Orders" value={orders.length} />
<Card title="Revenue" value={`₹${revenue}`} />

</div>

</div>

);
}

function VendorsSection({ users }) {

const vendors =
users.filter(u => u.role === "vendor");

const approveVendor = (email) => {

const updated = users.map(u =>
u.email === email
? { ...u, approved: true }
: u
);

localStorage.setItem(
"users",
JSON.stringify(updated)
);

alert("Vendor Approved");

window.location.reload();

};

return (

<div className="space-y-4">

<h1 className="text-2xl font-bold mb-6 text-[#2d2d2d]">
Vendor Approval
</h1>

{vendors.map(v => (

<div
key={v.email}
className="bg-[#fff7f4] border border-[#ead7cf] p-4 rounded-xl shadow-sm flex justify-between items-center"
>

<div>

<h3 className="font-semibold text-[#2d2d2d]">
{v.name}
</h3>

<p className="text-sm text-[#7a6a64]">
{v.email}
</p>

</div>

<div>

{v.approved ? (

<span className="text-[#c97979] font-semibold">
Approved
</span>

) : (

<button
onClick={() => approveVendor(v.email)}
className="bg-[#d98b8b] text-white px-4 py-1 rounded-lg hover:bg-[#c97979] transition"
>
Approve
</button>

)}

</div>

</div>

))}

</div>

);
}

function Card({ title, value }) {

return (

<div className="bg-[#fff7f4] border border-[#ead7cf] p-6 rounded-xl shadow-sm">

<p className="text-[#7a6a64] text-sm">
{title}
</p>

<h3 className="text-2xl font-bold text-[#2d2d2d]">
{value}
</h3>

</div>

);

}

function Section({ title }) {

return (

<div className="text-center mt-20">

<h1 className="text-3xl font-bold text-[#2d2d2d]">
{title}
</h1>

<p className="text-[#7a6a64] mt-2">
Admin tools coming soon
</p>

</div>

);

}