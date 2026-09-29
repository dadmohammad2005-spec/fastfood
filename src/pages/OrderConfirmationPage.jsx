import React from 'react';
import { CheckCircle2, Clock, MapPin, PackageCheck, Flame, ArrowRight, LayoutDashboard, Truck } from 'lucide-react';

export const OrderConfirmationPage = ({ order, setActivePage }) => {
  const sampleOrder = order || {
    id: 'ORD-9824',
    date: '2026-09-27 22:45',
    totalAmount: 26.95,
    paymentMethod: 'Credit Card (**** 4242)',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, New York, NY 10001',
    items: [
      { id: 'zinger-burger', name: 'Zinger Burger', quantity: 2, price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
      { id: 'french-fries', name: 'Golden French Fries', quantity: 1, price: 3.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=200&q=80' }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Hero Checkmark */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Order Confirmed!
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Thank You For Your Order!
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Order <span className="font-bold text-orange-400">#{sampleOrder.id}</span> has been received and sent to our kitchen.
          </p>
        </div>
      </div>

      {/* Live Tracker Bar */}
      <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400 animate-spin" />
            Estimated Delivery Time: <span className="text-orange-400">25 - 30 Mins</span>
          </h3>
          <span className="text-xs text-gray-400 hidden sm:inline">Live Order Tracker</span>
        </div>

        {/* Tracker Steps */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {[
            { label: 'Order Received', active: true, done: true },
            { label: 'In Kitchen', active: true, done: false },
            { label: 'On The Way', active: false, done: false },
            { label: 'Delivered', active: false, done: false },
          ].map((step, idx) => (
            <div key={idx} className="space-y-2 text-center">
              <div
                className={`h-2 rounded-full transition-all ${
                  step.done
                    ? 'bg-emerald-500'
                    : step.active
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 animate-pulse'
                    : 'bg-gray-800'
                }`}
              ></div>
              <p
                className={`text-[11px] font-bold ${
                  step.active ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Purchased Items List */}
        <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3">
            Order Items Summary
          </h3>
          <div className="space-y-3">
            {sampleOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-800 flex justify-between text-sm font-extrabold text-white">
            <span>Total Paid:</span>
            <span className="text-orange-400">${sampleOrder.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-gray-800 pb-3">
            Delivery Information
          </h3>

          <div className="space-y-3 text-xs text-gray-300">
            <div>
              <p className="text-gray-400 uppercase font-bold text-[10px]">Delivery Address:</p>
              <p className="text-white font-medium mt-0.5">{sampleOrder.deliveryAddress}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase font-bold text-[10px]">Payment Method:</p>
              <p className="text-white font-medium mt-0.5">{sampleOrder.paymentMethod}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase font-bold text-[10px]">Need Help?</p>
              <p className="text-xs text-orange-400 mt-0.5 font-bold">Hotline: +1 (800) 555-FAST</p>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setActivePage('dashboard')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4 text-orange-400" />
          <span>View In Dashboard</span>
        </button>

        <button
          onClick={() => setActivePage('menu')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
        >
          <span>Order More Food</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
