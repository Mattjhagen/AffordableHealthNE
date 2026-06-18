/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Menu, X, Landmark, Activity, Flame, Phone } from "lucide-react";

interface HeaderProps {
  onTakeActionClick: () => void;
}

export default function Header({ onTakeActionClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center text-white font-bold text-base shadow-md">
              NE
            </div>
            <div>
              <h1 className="font-sans font-black text-xs sm:text-sm tracking-tight text-stone-900 uppercase">
                Affordable Healthcare
              </h1>
              <span className="text-[10px] text-stone-500 font-bold tracking-widest block uppercase leading-none">
                Nebraska Campaign
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection("healthcare-issues")} 
              className="text-stone-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              The Crisis
            </button>
            <button 
              onClick={() => scrollToSection("cost-calculator")} 
              className="text-stone-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cost Calculator
            </button>
            <button 
              onClick={() => scrollToSection("congressional-demands")} 
              className="text-stone-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Congressional Action
            </button>
            <button 
              onClick={() => scrollToSection("community-stories")} 
              className="text-stone-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Story Board
            </button>
          </nav>

          {/* Action button */}
          <div className="hidden md:block">
            <button
              onClick={onTakeActionClick}
              className="px-4.5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs rounded-xl shadow-md uppercase tracking-wider transition-all cursor-pointer"
            >
              Take Action Now
            </button>
          </div>

          {/* Hamburger button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200">
          <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
            <button
              onClick={() => scrollToSection("healthcare-issues")}
              className="w-full text-left py-2 px-3 hover:bg-stone-50 rounded-lg text-stone-700 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              The Crisis
            </button>
            <button
              onClick={() => scrollToSection("cost-calculator")}
              className="w-full text-left py-2 px-3 hover:bg-stone-50 rounded-lg text-stone-700 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Cost Calculator
            </button>
            <button
              onClick={() => scrollToSection("congressional-demands")}
              className="w-full text-left py-2 px-3 hover:bg-stone-50 rounded-lg text-stone-700 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Congressional Action
            </button>
            <button
              onClick={() => scrollToSection("community-stories")}
              className="w-full text-left py-2 px-3 hover:bg-stone-50 rounded-lg text-stone-700 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Story Board
            </button>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onTakeActionClick();
                }}
                className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs rounded-xl text-center uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Take Action Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
