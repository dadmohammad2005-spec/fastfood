import React from 'react';
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
  Star,
  Award,
  BadgePercent,
  Clock,
  Heart
} from 'lucide-react';
import { FOOD_ITEMS } from '../data/foodData';
import { FoodCard } from '../components/FoodCard';
import { CategoryFilter } from '../components/CategoryFilter';

export const HomePage = ({ setActivePage, onQuickView, selectedCategory, setSelectedCategory }) => {
  const popularItems = FOOD_ITEMS.filter((item) => item.isPopular);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-8 overflow-hidden">
        {/* Ambient Glow background */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600/10 to-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider shadow-inner">
                <Flame className="w-4 h-4 fill-orange-400 animate-bounce" />
                <span>Fast & Fresh Food Delivery</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Craving Hot & Crispy <br className="hidden sm:inline" />
                <span className="text-gradient-red">Fast Food</span> Delivered Fast?
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Satisfy your hunger with our mouth-watering Zinger Burgers, cheesy pizzas, golden fries, and crispy wings. Freshly made and delivered piping hot in under 30 minutes!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-extrabold text-base hover:from-red-500 hover:to-amber-400 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-gray-200 font-bold text-base hover:text-white hover:border-gray-700 transition-all flex items-center justify-center gap-2"
                >
                  <span>View Full Menu</span>
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-8 border-t border-gray-800/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Under 30 Min</h4>
                    <p className="text-[11px] text-gray-400">Superfast delivery</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Fresh</h4>
                    <p className="text-[11px] text-gray-400">Quality checked</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">4.9 ★ Rating</h4>
                    <p className="text-[11px] text-gray-400">50,000+ reviews</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Hero Fast Food Image with Floating Badges */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                
                {/* Decorative Circular Background Accent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-orange-500/30 rounded-full blur-2xl transform scale-95"></div>

                {/* Main Hero Image */}
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                  alt="Delicious Zinger Fast Food Burger"
                  className="relative z-10 w-full h-[400px] sm:h-[480px] object-cover rounded-3xl border-2 border-orange-500/30 shadow-2xl shadow-orange-500/20 animate-float"
                />

                {/* Floating Card 1: Special Offer */}
                <div className="absolute top-6 -left-6 z-20 bg-gray-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-gray-800 shadow-2xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                    <BadgePercent className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Get 20% OFF</p>
                    <p className="text-[11px] text-orange-400 font-medium">Use code FAST20</p>
                  </div>
                </div>

                {/* Floating Card 2: Rating Badge */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl border border-gray-800 shadow-2xl hidden sm:flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                    <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                    <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9 / 5.0</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Happy Food Lovers</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Explore Our Menu
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Top Food Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            See All Menu <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setActivePage('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>

      {/* POPULAR FOOD ITEMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            Customer Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Our Most Popular Dishes
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Hand-crafted with secret spice recipes and fresh ingredients. Order your favorite now!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.slice(0, 8).map((food) => (
            <FoodCard key={food.id} food={food} onQuickView={onQuickView} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-orange-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-orange-500/10"
          >
            View All 12+ Food Items
          </button>
        </div>
      </section>

      {/* SPECIAL PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-gray-900 to-orange-950 border border-red-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Limited Time Promo
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Get <span className="text-gradient-gold">20% Discount</span> On Your First Order!
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Use code <span className="font-mono bg-gray-800 text-amber-400 px-2.5 py-1 rounded-lg font-bold border border-amber-500/40">FAST20</span> at checkout to instantly enjoy 20% off all burgers and pizzas.
              </p>
              <button
                onClick={() => {
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all shadow-lg"
              >
                Claim Offer Now
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
                alt="Pizza Deal"
                className="w-full max-w-sm rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white">Why Choose FastFood Testing?</h2>
          <p className="text-sm text-gray-400 mt-2">We bring restaurant-grade quality fast food right to your table.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Fast 25-Min Delivery',
              desc: 'Our fleet of swift delivery riders ensures your food arrives piping hot every single time.',
              color: 'text-red-400 bg-red-500/10 border-red-500/20'
            },
            {
              icon: Award,
              title: '100% Fresh Ingredients',
              desc: 'We source farm-fresh vegetables, organic chicken tenders, and authentic cheeses daily.',
              color: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
            },
            {
              icon: ShieldCheck,
              title: 'Best Price Guarantee',
              desc: 'Premium quality food at unbeatable prices with continuous discounts and cashback rewards.',
              color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-all text-center space-y-4"
              >
                <div className={`w-14 h-14 rounded-2xl border ${item.color} flex items-center justify-center mx-auto`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
