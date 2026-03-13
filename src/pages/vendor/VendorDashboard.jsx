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
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const [activeTab, setActiveTab] = useState("overview");

const products =
JSON.parse(localStorage.getItem("vendorProducts")) || [];

return (
<div className="flex min-h-screen bg-slate-50">

  {/* SIDEBAR */}
  <aside className="w-64 fixed top-0 left-0 h-screen bg-white border-r">

    <div className="p-6 font-bold text-xl flex items-center gap-2">
      <LayoutDashboard size={20} />
      VendorHub
    </div>

    <nav className="flex flex-col p-4 gap-2">

      {[
        { id: "overview", icon: LayoutDashboard, label: "Overview" },
        { id: "products", icon: Package, label: "Products" },
        { id: "orders", icon: ShoppingCart, label: "Orders" },
        { id: "customers", icon: Users, label: "Customers" },
        { id: "analytics", icon: TrendingUp, label: "Analytics" },
        { id: "referrals", icon: Zap, label: "Referrals" }
      ].map((item) => (

        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
            activeTab === item.id
              ? "bg-green-100 text-green-700"
              : "hover:bg-gray-100"
          }`}
        >
          <item.icon size={18} />
          {item.label}
        </button>

      ))}

    </nav>

    <div className="p-4 mt-auto border-t">

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="text-red-500"
      >
        Logout
      </button>

    </div>

  </aside>

  {/* MAIN CONTENT */}
  <main className="ml-64 p-8 w-full">

    {activeTab === "overview" && (
      <Overview products={products} />
    )}

    {activeTab === "products" && (
      <ProductsTab products={products} />
    )}

    {activeTab !== "overview" &&
      activeTab !== "products" && (
        <Section title={activeTab} />
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
      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    >
      <Plus size={16} />
      Add Product
    </a>
  </div>

  {/* STATS */}
  <div className="grid grid-cols-4 gap-6">

    <Card title="Products" value={products.length} />
    <Card title="Orders" value="4" />
    <Card title="Revenue" value="$45,231" />
    <Card title="Low Stock" value="12" />

  </div>

  {/* CHART */}
  <div className="bg-white p-6 rounded-xl shadow">

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
            stroke="#16a34a"
            fill="#16a34a20"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  </div>

  {/* INVENTORY */}
  <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="font-semibold mb-4">
      Inventory Management
    </h2>

    <table className="w-full">

      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Product</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {products.map((p) => (

          <tr key={p.id} className="border-b">

            <td className="py-3 flex items-center gap-3">

              <img
                src={p.images[0]}
                className="w-10 h-10 rounded"
              />

              {p.name}

            </td>

            <td>₹{p.price}</td>

            <td className="text-green-600">
              In Stock
            </td>

          </tr>

        ))}

      </tbody>

    </table>

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

      <div key={p.id} className="bg-white p-4 rounded-xl shadow">

        <img
          src={p.images[0]}
          className="w-full h-40 object-cover rounded mb-3"
        />

        <h3 className="font-semibold">
          {p.name}
        </h3>

        <p className="text-green-600 font-bold">
          ₹{p.price}
        </p>

      </div>

    ))}

  </div>

</div>

);
}

function Section({ title }) {

return (
<div className="text-center mt-20 text-xl">
{title} section coming soon
</div>
);
}

function Card({ title, value }) {

return (

<div className="bg-white p-6 rounded-xl shadow">

  <p className="text-sm text-gray-500">
    {title}
  </p>

  <h3 className="text-xl font-bold">
    {value}
  </h3>

</div>

);
}