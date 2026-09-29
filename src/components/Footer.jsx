import React from 'react';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Heart
} from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 pt-16 pb-12 relative overflow-hidden text-gray-400">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Flame className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                FastFood<span className="text-gradient-red ml-1">Testing</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Delivering piping hot, mouth-watering fast food directly to your doorstep. Prepared with fresh premium ingredients and zero compromises.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
                { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
                { icon: Youtube, href: '#', label: 'Youtube', color: 'hover:bg-red-600' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    aria-label={item.label}
                    className={`w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 ${item.color} hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Food Menu' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact & Support' },
                { id: 'cart', label: 'Shopping Cart' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-orange-500 font-bold">›</span> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours & Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon - Fri:</p>
                  <p className="text-xs text-gray-400">10:00 AM - 11:30 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Sat - Sun:</p>
                  <p className="text-xs text-gray-400">10:00 AM - 01:00 AM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Special Offers
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to get secret discounts & promo coupons!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-gray-500">🔒 We respect your privacy. No spam ever.</p>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 FastFood Testing. All rights reserved. University SE Project.</p>
          <div className="flex items-center gap-1 text-gray-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" /> for Fast Food Lovers
          </div>
        </div>
      </div>
    </footer>
  );
};
