import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const CartPage = ({ setActivePage }) => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    deliveryFee,
    tax,
    totalPrice
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-orange-400" />
            Your Shopping Cart
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review your food items, apply discount coupons, and proceed to checkout
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-3xl bg-gray-900 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-gray-700 transition-colors"
              >
                {/* Food Image & Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-gray-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                      {item.category || 'Fast Food'}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                {/* Right: Quantity Spinner & Item Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-800">
                  
                  {/* Quantity Spinner */}
                  <div className="flex items-center gap-3 bg-gray-950 px-3 py-1.5 rounded-xl border border-gray-800">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-base font-extrabold text-white block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            ))}

            {/* Delivery Progress Bar Note */}
            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-xs text-gray-300 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  {subtotal >= 35
                    ? '🎉 You qualify for FREE Delivery!'
                    : `Add $${(35 - subtotal).toFixed(2)} more to unlock FREE Delivery!`}
                </span>
              </div>
              <button
                onClick={() => setActivePage('menu')}
                className="text-orange-400 font-bold hover:underline shrink-0"
              >
                + Add Items
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-6 sticky top-28">
            <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-bold text-gray-300 uppercase">
                Have a Promo Code?
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {appliedPromo.code} ({appliedPromo.discountPercent}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Try FAST20"
                    className="w-full px-3.5 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gray-800 hover:bg-orange-500 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
              )}
            </form>

            {/* Price Calculations Breakdown */}
            <div className="space-y-3 text-xs text-gray-300 pt-2 border-t border-gray-800">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount ({appliedPromo?.code}):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span className="font-bold text-white">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%):</span>
                <span className="font-bold text-white">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-white">Total Amount:</span>
                <span className="text-2xl font-extrabold text-gradient-red">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setActivePage('checkout')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-extrabold text-sm hover:from-red-500 hover:to-amber-400 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Encrypted & Safe Checkout</span>
            </div>

          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="py-20 text-center bg-gray-900/50 rounded-3xl border border-gray-800 max-w-lg mx-auto space-y-5">
          <div className="w-20 h-20 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Your Cart is Empty!</h2>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              Looks like you haven't added any delicious food items to your cart yet.
            </p>
          </div>
          <button
            onClick={() => setActivePage('menu')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm shadow-lg hover:from-red-500 hover:to-orange-400 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Explore Food Menu
          </button>
        </div>
      )}

    </div>
  );
};
