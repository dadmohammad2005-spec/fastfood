import React, { useState } from 'react';
import {
  Flame,
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  Search,
  ChevronDown,
  LayoutDashboard,
  Heart,
  LogOut,
  Utensils,
  PhoneCall,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = ({ activePage, setActivePage, searchQuery, setSearchQuery }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Utensils },
    { id: 'menu', label: 'Menu', icon: Flame },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <Flame className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block leading-none">
                FastFood<span className="text-gradient-red ml-1">Testing</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-orange-400 tracking-widest block mt-0.5">
                Premium Delivery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-gray-900/60 p-1.5 rounded-full border border-gray-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md shadow-red-600/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            
            {/* Quick Search trigger toggle for Menu page */}
            <button
              onClick={() => handleNavClick('menu')}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all duration-200 hidden sm:flex items-center gap-2 text-sm"
              title="Search Menu"
            >
              <Search className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-gray-400 font-medium hidden lg:inline">Search food...</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-850 border border-gray-800 text-gray-200 hover:border-orange-500/50 hover:text-white transition-all duration-200 group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-950 animate-pulse shadow-md">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Auth Controls */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-lg object-cover border border-orange-500/40"
                  />
                  <span className="text-sm font-semibold text-gray-200 hidden md:inline max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-xs text-gray-400 uppercase font-medium">Logged in as</p>
                      <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-orange-400" />
                      User Dashboard
                    </button>

                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-red-400" />
                      Favorite Foods
                    </button>

                    <div className="border-t border-gray-800 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl hover:from-red-500 hover:to-orange-400 transition-all shadow-lg shadow-red-600/25 active:scale-95"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 md:hidden hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold'
                      : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-800 pt-3">
            {isLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 text-white font-semibold"
                >
                  <LayoutDashboard className="w-5 h-5 text-orange-400" />
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600/10 text-red-400 font-semibold border border-red-500/20"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-3 rounded-xl bg-gray-900 border border-gray-800 text-white font-semibold text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold text-center shadow-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
