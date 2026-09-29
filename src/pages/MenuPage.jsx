import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, Flame, UtensilsCrossed, Sparkles } from 'lucide-react';
import { FOOD_ITEMS } from '../data/foodData';
import { FoodCard } from '../components/FoodCard';
import { CategoryFilter } from '../components/CategoryFilter';

export const MenuPage = ({ selectedCategory, setSelectedCategory, onQuickView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating
  const [isSpicyOnly, setIsSpicyOnly] = useState(false);
  const [isVegOnly, setIsVegOnly] = useState(false);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Category match
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search match
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Checkbox filters
      const matchSpicy = !isSpicyOnly || item.isSpicy;
      const matchVeg = !isVegOnly || item.isVeg;

      return matchCategory && matchSearch && matchSpicy && matchVeg;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0); // default popular
    });
  }, [selectedCategory, searchQuery, sortBy, isSpicyOnly, isVegOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Fast Food Menu
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Explore Our Delicious Menu
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Select from our mouthwatering burgers, stone-baked pizzas, crispy chicken tenders, wraps, sides, and chilled beverages.
        </p>
      </div>

      {/* Controls: Search, Sort & Toggles */}
      <div className="bg-gray-900/90 border border-gray-800 p-6 rounded-3xl shadow-xl space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-7 relative">
            <Search className="w-5 h-5 text-orange-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Zinger burger, pizza, fries, shawarma..."
              className="w-full pl-12 pr-10 py-3.5 bg-gray-950 border border-gray-800 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-5 flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-gray-400 shrink-0 hidden sm:block" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 hidden sm:block">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 text-sm text-gray-200 font-semibold px-4 py-3.5 rounded-2xl focus:outline-none focus:border-orange-500"
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="price-low">💵 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="pt-2">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Dietary Quick Filter Toggles */}
        <div className="flex items-center gap-6 pt-2 border-t border-gray-800/80 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-gray-300 font-medium hover:text-white">
            <input
              type="checkbox"
              checked={isSpicyOnly}
              onChange={(e) => setIsSpicyOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 text-red-600 focus:ring-red-500 bg-gray-950"
            />
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-red-500" /> Spicy Items Only
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-gray-300 font-medium hover:text-white">
            <input
              type="checkbox"
              checked={isVegOnly}
              onChange={(e) => setIsVegOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 text-emerald-600 focus:ring-emerald-500 bg-gray-950"
            />
            <span>🌱 Vegetarian Only</span>
          </label>
        </div>

      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-2">
        <p>
          Showing <span className="font-bold text-white">{filteredItems.length}</span> food options
        </p>
        {(searchQuery || selectedCategory !== 'all' || isSpicyOnly || isVegOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setIsSpicyOnly(false);
              setIsVegOnly(false);
            }}
            className="text-orange-400 hover:underline font-semibold"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((food) => (
            <FoodCard key={food.id} food={food} onQuickView={onQuickView} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center bg-gray-900/40 rounded-3xl border border-gray-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No food items found!</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            We couldn't find any dishes matching "{searchQuery}". Try adjusting your search keyword or selected category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setIsSpicyOnly(false);
              setIsVegOnly(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors"
          >
            Reset Menu Filters
          </button>
        </div>
      )}

    </div>
  );
};
