import React from 'react';
import { FOOD_CATEGORIES } from '../data/foodData';
import { Utensils, Beef, Pizza, Salad, Drumstick, Sandwich, CupSoda } from 'lucide-react';

const ICON_MAP = {
  Utensils: Utensils,
  Beef: Beef,
  Pizza: Pizza,
  Fries: Salad,
  Drumstick: Drumstick,
  Sandwich: Sandwich,
  CupSoda: CupSoda,
};

export const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {FOOD_CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Utensils;
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
              isSelected
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-lg shadow-orange-500/20 scale-105'
                : 'bg-gray-900/80 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700 hover:bg-gray-850'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
