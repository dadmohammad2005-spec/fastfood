import React, { useState } from 'react';
import { CreditCard, Truck, Wallet, CheckCircle2, ShieldCheck, MapPin, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = ({ setActivePage, setCurrentOrder }) => {
  const { user, addOrder } = useAuth();
  const { cartItems, totalPrice, subtotal, deliveryFee, tax, clearCart } = useCart();
  const { addToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cod', 'wallet'
  const [address, setAddress] = useState(user?.address || '742 Evergreen Terrace, Apt 4B, New York, NY 10001');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 019-2834');
  const [notes, setNotes] = useState('Please leave at the front door.');

  // Credit Card state
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      addToast('Please provide a valid delivery address.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        items: [...cartItems],
        status: 'Pending',
        statusColor: 'amber',
        totalAmount: totalPrice,
        paymentMethod:
          paymentMethod === 'card'
            ? `Credit Card (**** ${cardNumber.slice(-4)})`
            : paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : 'Apple Pay / Digital Wallet',
        deliveryAddress: address,
        notes: notes
      };

      // 1. Add order to state
      addOrder(newOrder);
      setCurrentOrder(newOrder);

      // 2. Fire confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect:', err);
      }

      // 3. Clear cart and toast
      clearCart();
      setIsProcessing(false);
      addToast(`Order #${orderId} placed successfully! 🎉`, 'success');

      // 4. Redirect to Order Confirmation page
      setActivePage('order-confirmation');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button & Title */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <button
          onClick={() => setActivePage('cart')}
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
        <h1 className="text-2xl font-extrabold text-white">Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Delivery Details & Payment */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Delivery Address */}
          <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-400" />
              1. Delivery Address & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || 'Guest User'}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white opacity-80"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                Delivery Address *
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ring the doorbell, gate code #1234"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Step 2: Payment Method Options */}
          <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-500" />
              2. Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard, desc: 'Visa, MasterCard, Amex' },
                { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay rider in cash' },
                { id: 'wallet', label: 'Apple / Google Pay', icon: Wallet, desc: 'Instant 1-tap pay' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600/10 to-orange-500/10 border-orange-500 text-white shadow-lg'
                        : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-400' : 'text-gray-500'}`} />
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-bold text-white">{m.label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Credit Card Details Inputs */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      CVV Code
                    </label>
                    <input
                      type="text"
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-2xl bg-gray-950 border border-gray-800 text-xs text-gray-300">
                💡 Please have exact cash of <span className="font-bold text-white">${totalPrice.toFixed(2)}</span> ready for the delivery rider.
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Overview & Submit */}
        <div className="lg:col-span-4 bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-6 sticky top-28">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            Review Order
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="font-bold text-orange-400">{item.quantity}x</span>
                  <span className="text-gray-200 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-white shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-gray-300 pt-3 border-t border-gray-800">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-gray-800 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-white">Final Total:</span>
              <span className="text-xl font-extrabold text-gradient-red">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-extrabold text-sm hover:from-red-500 hover:to-amber-400 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay & Confirm Order (${totalPrice.toFixed(2)})</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
