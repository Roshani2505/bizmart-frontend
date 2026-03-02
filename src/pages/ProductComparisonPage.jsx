import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Check, X, ArrowRightLeft, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function ProductComparisonPage() {
  const [selectedIds, setSelectedIds] = useState(['1', '2']);
  const { addToCart } = useCart();

  const products = selectedIds.map(id => MOCK_PRODUCTS.find(p => p.id === id)).filter(Boolean);

  const features = [
    { label: 'Price', key: 'price', format: (v) => `$${v}` },
    { label: 'Rating', key: 'rating', format: (v) => `${v} / 5` },
    { label: 'Stock', key: 'stock', format: (v) => `${v} units` },
    { label: 'Brand', key: 'brand' },
    { label: 'Material', key: 'material' },
    { label: 'Vendor', key: 'vendorName' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Product Comparison</h1>
        <p className="text-slate-500 dark:text-slate-400">Compare specifications side-by-side to make the best choice.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-r border-slate-100 dark:border-slate-800 w-64">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                    <ArrowRightLeft className="w-4 h-4" /> Comparison Matrix
                  </div>
                </th>
                {products.map((product) => (
                  <th key={product.id} className="p-6 border-b border-slate-100 dark:border-slate-800 min-w-[250px]">
                    <div className="space-y-4">
                      <img src={product.images[0]} alt={product.name} className="w-32 h-32 mx-auto rounded-lg object-cover bg-slate-100" />
                      <div className="text-center">
                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.name}</h3>
                        <p className="text-xs text-primary font-medium">{product.vendorName}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full btn-primary py-2 text-xs flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
                {products.length < 3 && (
                  <th className="p-6 border-b border-slate-100 dark:border-slate-800 min-w-[250px] bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <X className="w-6 h-6 rotate-45" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider">Add Product</p>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {features.map((feature) => (
                <tr key={feature.key} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-6 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-100 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    {feature.label}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-6 text-center text-sm text-slate-600 dark:text-slate-400">
                      {feature.format ? feature.format(product[feature.key]) : product[feature.key] || '—'}
                    </td>
                  ))}
                  {products.length < 3 && <td className="p-6 bg-slate-50/50 dark:bg-slate-800/20" />}
                </tr>
              ))}
              <tr>
                <td className="p-6 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-100 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Availability
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-6 text-center">
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">
                        <Check className="w-3 h-3" /> In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-[10px] font-bold rounded uppercase">
                        <X className="w-3 h-3" /> Out of Stock
                      </span>
                    )}
                  </td>
                ))}
                {products.length < 3 && <td className="p-6 bg-slate-50/50 dark:bg-slate-800/20" />}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
