import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Helper/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#161b22] p-8 rounded-xl border border-[#30363d] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#58a6ff] mb-6 text-center">Welcome back</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-[#8b949e] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder:text-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#8b949e] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-[#30363d] text-white placeholder:text-[#6e7681] focus:outline-none focus:ring-2 focus:ring-[#1f6feb]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2 px-4 rounded-md font-medium transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-[#8b949e] mt-5 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-[#58a6ff] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
