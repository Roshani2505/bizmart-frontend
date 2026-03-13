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

return (

<div className="flex min-h-screen bg-slate-50">

  {/* SIDEBAR */}
  <aside className="w-64 bg-white border-r fixed h-screen">

    <div className="p-6 font-bold text-xl">
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
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
              tab === item.id
                ? "bg-green-100 text-green-700"
                : "hover:bg-gray-100"
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

    {tab === "overview" && <Overview />}

    {tab === "users" && <Section title="User Management" />}

    {tab === "vendors" && <Section title="Vendor Management" />}

    {tab === "products" && <Section title="Product Control" />}

    {tab === "orders" && <Section title="Orders Monitoring" />}

    {tab === "analytics" && <Section title="Platform Analytics" />}

  </main>

</div>

);

}

function Overview() {

const users = JSON.parse(localStorage.getItem("users")) || [];
const vendors = users.filter((u) => u.role === "vendor");

return (

<div className="space-y-8">

  <h1 className="text-2xl font-bold">
    Admin Dashboard
  </h1>

  <div className="grid grid-cols-4 gap-6">

    <Card title="Total Users" value={users.length} />

    <Card title="Total Vendors" value={vendors.length} />

    <Card title="Products" value="120" />

    <Card title="Orders" value="45" />

  </div>

</div>

);

}

function Card({ title, value }) {

return (

<div className="bg-white p-6 rounded-xl shadow">

  <p className="text-gray-500 text-sm">
    {title}
  </p>

  <h3 className="text-xl font-bold">
    {value}
  </h3>

</div>

);

}

function Section({ title }) {

return (

<div className="text-center mt-20">

  <h1 className="text-3xl font-bold">
    {title}
  </h1>

  <p className="text-gray-500 mt-2">
    Admin tools coming soon
  </p>

</div>

);

}