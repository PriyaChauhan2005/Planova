import React, { useState } from 'react';
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import logoIcon from '../../assets/logo.png';
import brandName from '../../assets/brand.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 font-jakarta">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Section */}
        <div className="flex items-center gap-3 transition-transform hover:scale-[1.02] cursor-pointer">
          <img src={logoIcon} alt="Planova Icon" className="h-10 md:h-12 w-auto object-contain" />
          <img src={brandName} alt="Planova Brand" className="h-6 md:h-7 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-500">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-planova-mint transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <SignInButton mode="modal">
            <button className="text-sm font-bold text-planova-dark hover:text-planova-mint transition-colors cursor-pointer">
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-planova-mint text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-planova-mint/25 hover:shadow-planova-mint/40 hover:-translate-y-0.5 transition-all cursor-pointer">
              Get Started for Free
            </button>
          </SignUpButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-planova-dark cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-planova-dark border-b border-gray-50 pb-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <SignInButton mode="modal">
                  <button className="w-full py-4 rounded-2xl font-bold text-planova-dark border border-gray-100">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full py-4 rounded-2xl font-bold bg-planova-mint text-white shadow-lg shadow-planova-mint/20">
                    Get Started for Free
                  </button>
                </SignUpButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;