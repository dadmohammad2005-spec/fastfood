import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Heart,
  Package,
  Calendar,
  ChevronRight,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { FOOD_ITEMS } from '../data/foodData';
import { FoodCard } from '../components/FoodCard';

export const DashboardPage = ({ setActivePage, onQuickView }) => {
  const { user, orders, favorites } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'favorites', 'profile'

  // Calculated Stats
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Out for Delivery').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length;
  const favoriteItems = FOOD_ITEMS.filter((item) => favorites.includes(item.id));

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      const fullFoodItem = FOOD_ITEMS.find((f) => f.id === item.id) || {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: 'Fast Food'
      };
      addToCart(fullFoodItem, item.quantity);
    });
    addToast(`Reordered items from order #${order.id}! Added to cart.`, 'success');
    setActivePage('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-red-950 via-gray-900 to-orange-950 border border-orange-500/30 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500/50 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                Verified FastFood Member
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Welcome back, {user?.name || 'Foodie'}! 👋
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              {user?.email} • Member since {user?.memberSince || '2025'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('menu')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs shadow-lg hover:from-red-500 hover:to-orange-400 transition-all shrink-0"
        >
          + Order More Food
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{totalOrdersCount}</p>
            <p className="text-xs text-gray-400 font-medium">Total Orders</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{pendingOrdersCount}</p>
            <p className="text-xs text-gray-400 font-medium">Pending Orders</p>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{completedOrdersCount}</p>
            <p className="text-xs text-gray-400 font-medium">Completed Orders</p>
          </div>
        </div>

        {/* Favorite Foods */}
        <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 fill-red-400" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{favoriteItems.length}</p>
            <p className="text-xs text-gray-400 font-medium">Favorite Dishes</p>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-800 space-x-4">
        {[
          { id: 'orders', label: 'Recent Orders', icon: Package, badge: totalOrdersCount },
          { id: 'favorites', label: 'Favorite Foods', icon: Heart, badge: favoriteItems.length },
          { id: 'profile', label: 'Profile Settings', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                isActive
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: RECENT ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Your Order History</h3>
          
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => {
                const isPending = order.status === 'Pending' || order.status === 'Preparing';
                return (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-4 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-extrabold text-white">{order.id}</span>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border ${
                              isPending
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          <span>{order.date}</span>
                          <span>•</span>
                          <span>{order.paymentMethod}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Total Amount</span>
                        <span className="text-xl font-extrabold text-white">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2.5 rounded-2xl bg-gray-950 border border-gray-800/80"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">{item.name}</p>
                            <p className="text-[11px] text-gray-400">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Reorder Action */}
                    <div className="pt-2 flex items-center justify-between text-xs text-gray-400">
                      <p className="truncate max-w-md">📍 Delivered to: {order.deliveryAddress}</p>
                      <button
                        onClick={() => handleReorder(order)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-orange-500 hover:text-white text-gray-200 font-bold transition-all shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reorder Items
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center bg-gray-900/50 rounded-3xl border border-gray-800 text-gray-400">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No orders placed yet!</p>
              <button
                onClick={() => setActivePage('menu')}
                className="mt-3 px-6 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs"
              >
                Browse Food Menu
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FAVORITE FOODS */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Your Saved Favorite Foods</h3>

          {favoriteItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteItems.map((food) => (
                <FoodCard key={food.id} food={food} onQuickView={onQuickView} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-gray-900/50 rounded-3xl border border-gray-800 text-gray-400">
              <Heart className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No favorite foods saved yet!</p>
              <p className="text-xs text-gray-500 mt-1">
                Click the heart icon on any food card to save it here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-white">Account Profile Details</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
              <input
                type="text"
                readOnly
                value={user?.name || ''}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                value={user?.email || ''}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone Number</label>
              <input
                type="text"
                readOnly
                value={user?.phone || ''}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Default Delivery Address</label>
              <textarea
                rows={2}
                readOnly
                value={user?.address || ''}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white resize-none"
              />
            </div>

            <button
              onClick={() => addToast('Profile details updated!', 'success')}
              className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold text-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
