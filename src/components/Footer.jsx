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
<footer className="bg-[#fff7f4] border-t border-[#ead7cf] pt-16 pb-8">
<div className="max-w-7xl mx-auto px-4">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

      {/* Brand */}
      <div className="space-y-6">

        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-[#c97979]">
          <Store className="w-8 h-8 text-[#c97979] stroke-[1.8]"/>
          BizMart
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed">
          Empowering small businesses with a professional multi-vendor marketplace designed for sustainable growth.
        </p>

        <div className="flex gap-4">

          {[Facebook, Twitter, Instagram, Linkedin].map((Icon,i)=>(
            <a
              key={i}
              href="#"
              className="p-2 bg-[#f3e3dc] rounded-full text-[#c97979] hover:bg-[#e8c9c9]"
            >
              <Icon className="w-5 h-5 stroke-[1.8]"/>
            </a>
          ))}

        </div>

      </div>

      {/* Marketplace */}

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#c97979]">
          Marketplace
        </h4>

        <ul className="space-y-4">
          {['All Products','Featured Vendors','New Arrivals','Special Offers','Categories'].map(link=>(
            <li key={link}>
              <Link to="/products" className="text-sm text-gray-600 hover:text-[#c97979]">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Business */}

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#c97979]">
          For Business
        </h4>

        <ul className="space-y-4">
          {['Sell on BizMart','Vendor Dashboard','Business Tools','Referral Program','Success Stories'].map(link=>(
            <li key={link}>
              <Link to="/signup?role=vendor" className="text-sm text-gray-600 hover:text-[#c97979]">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-[#c97979]">
          Contact Us
        </h4>

        <ul className="space-y-4 text-sm text-gray-600">

          <li className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#c97979] stroke-[1.8]"/> support@bizmart.com
          </li>

          <li className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#c97979] stroke-[1.8]"/> +91 98765 43210
          </li>

          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#c97979] stroke-[1.8] mt-1"/>
            Plot No.45 Sector 18 Gurgaon Haryana
          </li>

        </ul>
      </div>

    </div>

    {/* Trust Section */}

    <div className="pt-8 border-t border-[#ead7cf] flex flex-col md:flex-row items-center justify-center gap-12">

      <div className="flex flex-wrap justify-center gap-12 text-sm font-semibold text-[#c97979] uppercase tracking-widest">

        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#c97979] stroke-[1.8]"/> Secure Payments
        </div>

        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-[#c97979] stroke-[1.8]"/> Global Shipping
        </div>

        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-[#c97979] stroke-[1.8]"/> Multiple Methods
        </div>

      </div>

    </div>

    <div className="mt-16 text-center text-sm text-[#c97979] font-medium">
      © 2023 BizMart Ecommerce Platform
    </div>

  </div>
</footer>

);
}