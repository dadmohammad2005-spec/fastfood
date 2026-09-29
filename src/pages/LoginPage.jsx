import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Flame, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = ({ setActivePage }) => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('alex.foodie@testing.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login(email, password);
      setActivePage('dashboard');
    } else {
      addToast('Please correct the highlighted form errors.', 'error');
    }
  };

  const handleDemoLogin = () => {
    setEmail('alex.foodie@testing.com');
    setPassword('password123');
    login('alex.foodie@testing.com', 'password123');
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-gray-900/90 border border-gray-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
            <Flame className="w-7 h-7 text-white fill-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-xs text-gray-400">
            Sign in to your FastFood Testing account to manage orders & favorites
          </p>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between gap-2">
          <div className="text-xs">
            <span className="font-bold text-orange-400 block">Evaluator Demo Login</span>
            <span className="text-gray-400">One-click auto sign-in</span>
          </div>
          <button
            onClick={handleDemoLogin}
            type="button"
            className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity shrink-0"
          >
            Quick Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.foodie@testing.com"
                className={`w-full pl-11 pr-4 py-3 bg-gray-950 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-orange-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-300 uppercase">
                Password
              </label>
              <button
                type="button"
                onClick={() => setActivePage('forgot-password')}
                className="text-xs font-semibold text-orange-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-11 pr-11 py-3 bg-gray-950 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-800 focus:border-orange-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 text-orange-500 focus:ring-orange-500 bg-gray-950"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-bold text-sm hover:from-red-500 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-gray-400">
          Don't have an account yet?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="font-bold text-orange-400 hover:underline ml-1"
          >
            Register / Sign Up
          </button>
        </div>

      </div>
    </div>
  );
};
