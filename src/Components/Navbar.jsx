import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LogIn, UserPlus, Search, LayoutDashboard, UserCircle } from 'lucide-react';

export default function Navbar({ search, setSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showSearch = user?.role === 'user' && location.pathname === '/user';

  const menuItems = [
    user?.role === 'admin' && {
      label: 'Admin Dashboard',
      icon: <LayoutDashboard size={18} />,
      onClick: () => navigate('/admin'),
    },
    user?.role === 'user' && {
      label: 'User Dashboard',
      icon: <LayoutDashboard size={18} />,
      onClick: () => navigate('/user'),
    },
    !user && {
      label: 'Login',
      icon: <LogIn size={18} />,
      onClick: () => navigate('/'),
    },
    !user && {
      label: 'Signup',
      icon: <UserPlus size={18} />,
      onClick: () => navigate('/signup'),
    },
    user && {
      label: 'Logout',
      icon: <LogOut size={18} />,
      onClick: handleLogout,
    },
  ].filter(Boolean);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-orange-50 shadow h-20 items-center px-8">
        <span className="text-2xl font-extrabold text-orange-700 tracking-wide">🎬 Cinema</span>

        {showSearch && (
          <div className="flex-1 flex justify-center">
            <div className="relative w-72">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-orange-300 bg-orange-100 text-orange-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-orange-500" size={18} />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 ml-auto">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition font-medium ${
                item.label === 'Logout' || item.label === 'Signup'
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'text-orange-700 hover:bg-orange-200'
              }`}
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          {user && (
            <div className="w-10 h-10 rounded-full bg-orange-300 text-white flex items-center justify-center font-semibold">
              <UserCircle className="text-orange-800" size={24} />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-orange-50 shadow h-16 flex items-center px-4">
        <span className="text-xl font-bold text-orange-700">Cinema</span>

        <div className="ml-auto flex gap-3 items-center">
          {showSearch && (
            <button
              className="text-orange-600"
              onClick={() => setMobileSearch(!mobileSearch)}
              aria-label="Toggle search"
            >
              <Search size={24} />
            </button>
          )}

          <button
            className="text-orange-600"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Search Input */}
        {mobileSearch && (
          <div className="absolute top-16 left-0 w-full bg-white shadow p-4 z-50">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-4 py-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
        )}
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="w-72 bg-white h-full shadow-lg flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-lg font-bold text-orange-700">Cinema</span>
              <button
                className="text-orange-600"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-orange-100 text-orange-700 font-semibold transition"
                  onClick={() => {
                    item.onClick();
                    setDrawerOpen(false);
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {user && (
              <div className="p-4 border-t mt-auto flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-300 text-white flex items-center justify-center font-semibold">
                  <UserCircle className="text-orange-800" size={24} />
                </div>
                <span className="text-orange-700 font-medium">Hi, {user.name || 'User'}</span>
              </div>
            )}
          </div>
          <div className="flex-1" onClick={() => setDrawerOpen(false)} />
        </div>
      )}

      {/* Spacer */}
      <div className="h-20 md:h-20" />
    </>
  );
}
