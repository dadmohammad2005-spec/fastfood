import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Thank you! Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 1000);
  };

  const faqs = [
    {
      q: 'How long does delivery take?',
      a: 'Our average delivery time is between 20 to 30 minutes from the moment you place your order.'
    },
    {
      q: 'What is the minimum order amount for free delivery?',
      a: 'Orders over $35 qualify for 100% FREE delivery! For smaller orders, a flat fee of $3.49 applies.'
    },
    {
      q: 'Can I track my fast food order in real-time?',
      a: 'Yes! Once your order is placed, you can track its progress live on your User Dashboard.'
    },
    {
      q: 'How do I apply a promo code?',
      a: 'You can enter promo codes like FAST20 on the Cart Page before proceeding to checkout.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-white">We'd Love To Hear From You</h1>
        <p className="text-sm text-gray-400">
          Have questions about your order, feedback on our burgers, or catering inquiries? Contact our 24/7 fast-food support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Information Cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-gray-900 border border-gray-800 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
              FastFood Support Channels
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Customer Hotline</p>
                <p className="text-sm font-bold text-white mt-0.5">+1 (800) 555-FAST (3278)</p>
                <p className="text-[11px] text-emerald-400">Available 24/7 Toll Free</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email Support</p>
                <p className="text-sm font-bold text-white mt-0.5">support@fastfood-testing.com</p>
                <p className="text-[11px] text-gray-400">Replies within 15 minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Headquarters</p>
                <p className="text-sm font-bold text-white mt-0.5">742 Evergreen Terrace, Suite 400</p>
                <p className="text-xs text-gray-400">New York, NY 10001, USA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-8 bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-6">
          <h3 className="text-xl font-bold text-white">Send Us A Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Issue / Status</option>
                  <option value="Franchise">Franchise Inquiry</option>
                  <option value="Feedback">Compliment / Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                Your Message *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you today?"
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="pt-10 border-t border-gray-800 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-gray-400 mt-1">Quick answers to common questions</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:text-orange-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    activeFaq === idx ? 'rotate-180 text-orange-400' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-gray-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
