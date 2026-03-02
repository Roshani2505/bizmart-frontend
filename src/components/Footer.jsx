import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Store, 
  Mail, 
  Phone, 
  MapPin,
  ShieldCheck,
  CreditCard,
  Truck
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#121212] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <Store className="w-8 h-8" />
              BizMart
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Empowering small businesses with a professional, multi-vendor marketplace designed for sustainable growth and seamless operations.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Marketplace</h4>
            <ul className="space-y-4">
              {['All Products', 'Featured Vendors', 'New Arrivals', 'Special Offers', 'Categories'].map((link) => (
                <li key={link}>
                  <Link to="/products" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">For Business</h4>
            <ul className="space-y-4">
              {['Sell on BizMart', 'Vendor Dashboard', 'Business Tools', 'Referral Program', 'Success Stories'].map((link) => (
                <li key={link}>
                  <Link to="/signup?role=vendor" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-primary" /> support@bizmart.com
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Phone className="w-4 h-4 text-primary" /> +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-primary mt-1" /> Plot No. 45, Sector 18,<br />Gurgaon, Haryana 122015, India
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Payment */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Payments
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Truck className="w-4 h-4 text-emerald-500" /> Global Shipping
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <CreditCard className="w-4 h-4 text-emerald-500" /> Multiple Methods
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-400">
            © 2023 BizMart Ecommerce Platform. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-widest">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
