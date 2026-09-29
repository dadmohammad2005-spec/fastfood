import React, { useState } from 'react';
import { KeyRound, Mail, ArrowRight, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage = ({ setActivePage }) => {
  const { addToast } = useToast();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password, 4: Success
  const [email, setEmail] = useState('alex.foodie@testing.com');
  const [otp, setOtp] = useState(['5', '8', '2', '9', '1', '0']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      addToast('A 6-digit verification code has been sent to your email.', 'info');
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      addToast('Code verified successfully! Enter your new password.', 'success');
    }, 800);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
      addToast('Password reset successfully! You can now log in.', 'success');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md w-full space-y-8 bg-gray-900/90 border border-gray-800 p-8 rounded-3xl shadow-2xl relative z-10">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Reset Password</h2>
          <p className="text-xs text-gray-400">
            {step === 1 && 'Enter your registered email address to receive an OTP code'}
            {step === 2 && `Enter the 6-digit verification code sent to ${email}`}
            {step === 3 && 'Choose a strong new password for your account'}
            {step === 4 && 'Your password has been updated!'}
          </p>
        </div>

        {/* STEP 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.foodie@testing.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification Code */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-11 h-12 text-center text-lg font-bold bg-gray-950 border border-gray-800 rounded-xl text-orange-400 focus:outline-none focus:border-orange-500"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all"
            >
              {isLoading ? 'Verifying Code...' : 'Verify Code'}
            </button>

            <p className="text-center text-xs text-gray-400">
              Didn't get the code?{' '}
              <button
                type="button"
                onClick={() => addToast('Resent verification code.', 'info')}
                className="text-orange-400 font-bold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}

        {/* STEP 3: Reset New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm hover:from-red-500 hover:to-orange-400 transition-all"
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        )}

        {/* STEP 4: Success Message */}
        {step === 4 && (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Password Updated!</h3>
            <p className="text-xs text-gray-300">
              You can now sign in with your new credentials.
            </p>
            <button
              onClick={() => setActivePage('login')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm"
            >
              Back To Login
            </button>
          </div>
        )}

        {/* Back Link */}
        {step !== 4 && (
          <div className="text-center text-xs text-gray-400">
            Remembered your password?{' '}
            <button
              onClick={() => setActivePage('login')}
              className="font-bold text-orange-400 hover:underline ml-1"
            >
              Back to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
