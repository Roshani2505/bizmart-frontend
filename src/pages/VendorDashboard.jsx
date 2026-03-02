import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Search,
  Filter,
  Download,
  Plus,
  Zap
} from 'lucide-react';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  AreaChart,
  Area
} from 'recharts';
import { MOCK_PRODUCTS } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4500 },
  { name: 'Tue', revenue: 5200 },
  { name: 'Wed', revenue: 3800 },
  { name: 'Thu', revenue: 6100 },
  { name: 'Fri', revenue: 5900 },
  { name: 'Sat', revenue: 7200 },
  { name: 'Sun', revenue: 6800 },
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex bg-slate-50 dark:bg-[#121212]">

      {/* ✅ FIXED SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 h-screen bg-white dark:bg-[#1e1e1e] border-r border-slate-200 dark:border-slate-800">
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <LayoutDashboard className="w-6 h-6" />
            VendorHub
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'orders', icon: ShoppingCart, label: 'Orders' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
            { id: 'referrals', icon: Zap, label: 'Referrals' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                activeTab === item.id 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* ✅ USER + LOGOUT */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 mb-3">
            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&h=100&auto=format&fit=crop" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">TechHub</p>
              <p className="text-xs text-slate-500">Vendor</p>
            </div>
          </div>

          <button 
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ✅ MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">

        {activeTab === 'overview' && <Overview />}
        {activeTab === 'products' && <Section title="Products Dashboard 📦" />}
        {activeTab === 'orders' && <Section title="Orders Management 🧾" />}
        {activeTab === 'customers' && <Section title="Customers Data 👥" />}
        {activeTab === 'analytics' && <Section title="Analytics 📊" />}
        {activeTab === 'referrals' && <Section title="Referral System 🔗" />}

      </main>
    </div>
  );
}

////////////////////////////////////////////////////////////

function Overview() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Revenue', value: '$45,231', icon: TrendingUp },
          { label: 'Orders', value: '1,245', icon: ShoppingCart },
          { label: 'Customers', value: '892', icon: Users },
          { label: 'Low Stock', value: '12', icon: AlertCircle },
        ].map((stat, i) => (
          <div key={i} className="card p-6">
            <stat.icon className="mb-2 text-primary" />
            <p className="text-sm">{stat.label}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#0f766e" fill="#0f766e20" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

////////////////////////////////////////////////////////////

function Section({ title }) {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-slate-500 mt-2">Coming soon... (backend integration later)</p>
    </div>
  );
}