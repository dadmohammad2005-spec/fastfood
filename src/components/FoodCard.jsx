import React from 'react';
import { Star, Heart, Plus, Eye, Flame, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const FoodCard = ({ food, onQuickView }) => {
  const { isFavorite, toggleFavorite } = useAuth();
  const { addToCart } = useCart();
  const favorite = isFavorite(food.id);

  return (
    <div className="group relative bg-gray-900/90 rounded-3xl border border-gray-800/80 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between">
      
      {/* Top Badges & Image Header */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-950">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/40 pointer-events-none"></div>

        {/* Popular Tag */}
        {food.isPopular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Flame className="w-3 h-3 fill-white" /> Popular
          </div>
        )}

        {/* Top Right Actions (Favorite & Quick View) */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(food.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
              favorite
                ? 'bg-red-500 text-white border-red-400 scale-105'
                : 'bg-black/40 text-gray-300 border-white/10 hover:bg-black/70 hover:text-white'
            }`}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
          </button>
          
          <button
            onClick={() => onQuickView && onQuickView(food)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 flex items-center justify-center hover:bg-black/70 hover:text-white transition-all"
            title="Quick view details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Prep Time pill */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-gray-300 text-xs px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{food.prepTime}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/20">
              {food.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{food.rating}</span>
              <span className="text-gray-400 font-normal">({food.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {food.name}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
            {food.shortDescription}
          </p>
        </div>

        {/* Footer Price & Add to Cart */}
        <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white">
                ${food.price.toFixed(2)}
              </span>
              {food.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ${food.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-500 block">Taxes included</span>
          </div>

          <button
            onClick={() => addToCart(food, 1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs hover:from-red-500 hover:to-orange-400 transition-all shadow-md shadow-red-600/20 active:scale-95 group/btn"
          >
            <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
