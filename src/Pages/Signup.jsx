import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('https://propftx-assignment-server.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Signup successful! Please login.');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white  shadow-2xl p-10 max-w-md w-full border border-orange-300">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-8 tracking-tight drop-shadow-md">
          Register User
        </h2>

        {error && (
          <div className="mb-6 bg-orange-100 border border-orange-300 text-orange-700 px-5 py-3 rounded-lg text-center font-semibold animate-shake">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-5 py-3 rounded-lg text-center font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-orange-700 mb-2 text-start"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl border border-orange-300 bg-orange-50 text-orange-900 placeholder-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition shadow-sm"
            />
          </div>
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
            Sign Up
          </button>
        </form>

        <button
          className="w-full mt-8 text-orange-700 font-semibold hover:text-orange-900 hover:underline transition cursor-pointer"
          onClick={() => navigate('/')}
          type="button"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
