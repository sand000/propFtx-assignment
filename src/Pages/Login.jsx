import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://propftx-assignment-server.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        if (data.user.role === 'admin') navigate('/admin');
        else navigate('/user');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className=" shadow-2xl p-10 max-w-md w-full border bg-white border-orange-300">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-8 tracking-tight drop-shadow-md">
          Sign In
        </h2>
        {error && (
          <div className="mb-6 bg-orange-100 border border-orange-300 text-orange-700 px-5 py-3 rounded-lg text-center font-semibold animate-shake">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="email"
              className="block text-start text-sm font-semibold text-orange-700 mb-2 tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl border border-orange-300 bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-start text-sm font-semibold text-orange-700 mb-2 tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl border border-orange-300 bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold text-lg hover:from-orange-600 hover:to-orange-700 shadow-lg transition"
          >
            Log In
          </button>
        </form>
        <div className="mt-8 text-center text-orange-700 font-semibold">
          Don't have an account?
          <button
            className="ml-2 text-orange-500 hover:text-orange-700 hover:underline font-bold transition cursor-pointer"
            onClick={() => navigate('/signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
