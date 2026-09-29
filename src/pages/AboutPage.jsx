import React from 'react';
import { Flame, ShieldCheck, Heart, Award, Users, Utensils, CheckCircle } from 'lucide-react';

export const AboutPage = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          Our Brand Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Redefining Fast Food With <span className="text-gradient-red">Uncompromised Quality</span>
        </h1>
        <p className="text-base text-gray-300 leading-relaxed">
          Founded in 2025, FastFood Testing was built on a simple philosophy: fast food shouldn't mean sacrificing fresh ingredients or bold flavors.
        </p>
      </div>

      {/* Grid Story & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white">
            Crafted By Master Chefs, Enjoyed By Everyone
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Every Zinger burger patty is double-breaded in our proprietary 11-herb coating. Our pizza dough undergoes a 24-hour fermentation process for that perfect crispy outer crust and airy inside.
          </p>
          
          <div className="space-y-3 pt-2">
            {[
              '100% Halal & Fresh Premium Cut Meat',
              'No Preservatives or Artificial Flavors',
              'Temperature Controlled Smart Delivery Bags',
              'Rigorous 5-Star Kitchen Sanitation Standards'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm shadow-lg hover:opacity-90"
            >
              Explore Our Menu
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
            alt="Kitchen Master Chef"
            className="w-full h-96 object-cover rounded-3xl border border-gray-800 shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl">
              10k+
            </div>
            <div>
              <p className="text-sm font-bold text-white">Daily Orders Served</p>
              <p className="text-xs text-gray-400">Across 15 Cities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {[
          {
            icon: ShieldCheck,
            title: 'Hygiene & Cleanliness',
            desc: 'Our kitchens adhere to HACCP global standards with daily sanitization protocols.'
          },
          {
            icon: Heart,
            title: 'Customer First',
            desc: 'Your satisfaction is guaranteed. If your order isn’t piping hot, we remake it for free.'
          },
          {
            icon: Users,
            title: 'Community & Care',
            desc: 'We support local farmers and donate surplus meals daily to community shelters.'
          }
        ].map((v, i) => {
          const Icon = v.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
