import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  cartItems: number;
}

export function Navigation({ currentPage, onPageChange, cartItems }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'blog', label: 'Blog' },
    { id: 'promotions', label: 'Promotions' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-strong backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 rounded-2xl gradient-matcha flex items-center justify-center mr-3">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] bg-clip-text text-transparent">
              AloTra
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => onPageChange(item.id)}
                className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-[#7c9885]'
                    : 'text-gray-600 hover:text-[#7c9885]'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7c9885] to-[#f5a9bc] rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full glass hover:glass-strong transition-all duration-200"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange('account')}
              className="p-2 rounded-full glass hover:glass-strong transition-all duration-200"
            >
              <User className="w-5 h-5 text-gray-600" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange('cart')}
              className="relative p-2 rounded-full glass hover:glass-strong transition-all duration-200"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#f5a9bc] text-white text-xs rounded-full flex items-center justify-center"
                >
                  {cartItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass hover:glass-strong transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="glass-strong rounded-2xl p-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-[#7c9885] text-white'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}