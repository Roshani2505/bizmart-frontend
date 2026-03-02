import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Copy, 
  Check, 
  Calendar, 
  TrendingUp, 
  MousePointer2, 
  ShoppingBag,
  Plus,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import API from '../services/api'; // ✅ NEW

const MOCK_REFERRALS = [
  { id: '1', code: 'WINTER20', discount: 20, expiryDate: '2023-12-31', clicks: 1240, conversions: 85 },
  { id: '2', code: 'TECH10', discount: 10, expiryDate: '2023-11-15', clicks: 450, conversions: 12 },
  { id: '3', code: 'WELCOME5', discount: 5, expiryDate: '2024-06-30', clicks: 2100, conversions: 156 },
];

export default function ReferralLinkManagementPage() {

  const [copiedId, setCopiedId] = useState(null);
  const [referrals, setReferrals] = useState([]); // ✅ NEW

  // ✅ FETCH (future backend ready)
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await API.get('/referrals');
        setReferrals(res.data);
      } catch {
        console.log("Using mock referrals");
        setReferrals(MOCK_REFERRALS);
      }
    };

    fetchReferrals();
  }, []);

  const handleCopy = (id, code) => {
    const link = `https://bizmart.com/ref/${code}`;

    // ✅ SAFE COPY
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
    } else {
      const temp = document.createElement('input');
      temp.value = link;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }

    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Referral Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Create and track your referral campaigns.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 py-2.5">
          <Plus className="w-5 h-5" /> Generate New Link
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Total Clicks', value: referrals.reduce((a, r) => a + r.clicks, 0), icon: MousePointer2, color: 'text-blue-500' },
          { label: 'Total Conversions', value: referrals.reduce((a, r) => a + r.conversions, 0), icon: ShoppingBag, color: 'text-emerald-500' },
          { label: 'Avg. Conversion Rate', value: '6.7%', icon: TrendingUp, color: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="card p-6 flex items-center gap-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white">Active Referral Links</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Campaign Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded text-primary">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">{ref.code}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                      {ref.discount}% OFF
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {ref.expiryDate}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-[10px] text-slate-400">Clicks</p>
                        <p className="font-bold">{ref.clicks}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Convs</p>
                        <p className="font-bold">{ref.conversions}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleCopy(ref.id, ref.code)}>
                      {copiedId === ref.id ? "Copied" : "Copy"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}