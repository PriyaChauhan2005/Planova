import React from 'react';
import { motion } from 'framer-motion';
import { SignUpButton } from "@clerk/clerk-react";
import { ChevronRight, Zap } from 'lucide-react';

/**
 * Hero Component
 * The main value proposition and CTA section for the landing page.
 * Uses Framer Motion for entrance animations.
 */
const Hero = () => {
  return (
    <header className="pt-32 pb-24 px-6 text-center max-w-5xl mx-auto text-jakarta">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Status Badge */}
        <span className="inline-flex items-center gap-2 bg-planova-soft text-planova-mint px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-planova-mint/10 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-planova-mint opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-planova-mint"></span>
          </span>
          v2.0 is live for students
        </span>

        {/* Headline */}
        <h1 className="text-5xl md:text-8xl font-black text-planova-dark leading-[1.1] tracking-tight">
          Stay Consistent,<br />
          <span className="text-planova-mint">Study Smarter.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          The stress-free planner built for students. Organize assignments, track streaks, and carry forward unfinished tasks automatically.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <SignUpButton mode="modal">
            <button className="w-full sm:w-auto bg-planova-mint text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-planova-mint/30 hover:-translate-y-1 hover:shadow-planova-mint/40 transition-all cursor-pointer">
              Get Started for Free <ChevronRight size={22} />
            </button>
          </SignUpButton>
          
          <button className="w-full sm:w-auto bg-white border-2 border-gray-100 text-planova-dark px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
            <Zap size={22} className="text-planova-mint" fill="#86D3B4" /> View Demo
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 font-medium">
            Join <span className="text-planova-dark font-bold">10,000+ students</span> organizing their life.
          </p>
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;