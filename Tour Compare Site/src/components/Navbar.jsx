import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

// Helper function to concatenate class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Navbar = ({user, logout}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Compare', path: '/compare' },
    { name: 'Admin', path: '/admin' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'py-3 glass-effect border-b border-slate-200/20' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-semibold tracking-tight z-10"
          onClick={closeMobileMenu}
        >
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            TravelCompare
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground/80">{user.name}</span>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all text-foreground/80 hover:text-foreground hover:bg-secondary"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all text-foreground/80 hover:text-foreground hover:bg-secondary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 glass-effect flex flex-col items-center justify-center md:hidden animate-fade-in">
            <nav className="flex flex-col items-center space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-lg font-medium transition-all',
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-foreground'
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <span className="text-lg font-medium text-foreground/80">{user.name}</span>
                  <button 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg font-medium text-foreground/80 hover:text-foreground"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-lg font-medium bg-primary text-white px-4 py-2 rounded-full"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
