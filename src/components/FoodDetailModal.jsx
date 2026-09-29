import React, { useState } from 'react';
import { X, Star, Heart, Flame, Clock, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const FoodDetailModal = ({ food, onClose }) => {
  if (!food) return null;

  const { isFavorite, toggleFavorite } = useAuth();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const favorite = isFavorite(food.id);

  const handleAddToCart = () => {
    addToCart(food, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 relative min-h-[240px] md:min-h-full bg-gray-950">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:hidden"></div>
          
          <button
            onClick={() => toggleFavorite(food.id)}
            className={`absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
              favorite
                ? 'bg-red-500 text-white border-red-400'
                : 'bg-black/50 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Info & Customization Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/20">
                {food.category}
              </span>
              {food.isSpicy && (
                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20 flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-red-400" /> Spicy
                </span>
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-2">{food.name}</h2>

            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{food.rating}</span>
                <span className="text-gray-500 font-normal">({food.reviewsCount} reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>{food.prepTime}</span>
              </div>
              <span>•</span>
              <span>{food.calories}</span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {food.longDescription || food.shortDescription}
            </p>

            {/* Ingredients list */}
            {food.ingredients && (
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Key Ingredients:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {food.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700/60"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart Action */}
          <div className="pt-4 border-t border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-300">Select Quantity:</span>
              <div className="flex items-center gap-3 bg-gray-950 px-3 py-1.5 rounded-xl border border-gray-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all shadow-xl shadow-red-600/25 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Add To Cart
              </span>
              <span className="text-base font-extrabold">
                ${(food.price * quantity).toFixed(2)}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
