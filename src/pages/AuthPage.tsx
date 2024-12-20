import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase } from 'lucide-react';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import VerificationForm from '../components/auth/VerificationForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'verify'>('signin');
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {mode === 'signin' && 'Welcome Back'}
          {mode === 'signup' && 'Create Account'}
          {mode === 'verify' && 'Verify Email'}
        </h1>

        {mode === 'signin' && (
          <SignInForm
            onToggleMode={() => setMode('signup')}
          />
        )}

        {mode === 'signup' && (
          <SignUpForm
            onToggleMode={() => setMode('signin')}
            onSignUpSuccess={(email) => {
              setEmail(email);
              setMode('verify');
            }}
          />
        )}

        {mode === 'verify' && (
          <VerificationForm
            email={email}
            onVerified={() => setMode('signin')}
            onResend={() => {/* Implement resend verification */}}
          />
        )}
      </div>
    </div>
  );
}