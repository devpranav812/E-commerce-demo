import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { ActivePage } from '../../types';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const { totalQuantity, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
            >
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#1F1E1C] block leading-none">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#736B60] block mt-1 font-medium">
                Artisanal Pantry
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A443C]">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-[#1F1E1C] transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                activePage === 'home' ? 'text-[#1F1E1C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1F1E1C]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop')}
              className={`hover:text-[#1F1E1C] transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                activePage === 'shop' ? 'text-[#1F1E1C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1F1E1C]' : ''
              }`}
            >
              Shop Catalogue
            </button>
            <button
              onClick={() => handleNav('story')}
              className={`hover:text-[#1F1E1C] transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                activePage === 'story' ? 'text-[#1F1E1C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1F1E1C]' : ''
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-[#1F1E1C] transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                activePage === 'contact' ? 'text-[#1F1E1C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1F1E1C]' : ''
              }`}
            >
              Contact & WhatsApp
            </button>
          </nav>

          {/* Zone 3: Primary Action (Cart & Direct Chat) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BRAND_CONFIG.whatsapp.baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-[#5C5449] hover:text-[#1F1E1C] px-2.5 py-1.5 rounded transition-colors"
              title="Chat directly on WhatsApp"
            >
              <span>WhatsApp: +91 62665 72346</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#33302C] px-3.5 py-2 rounded-md transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
              aria-label={`Open shopping cart with ${totalQuantity} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold whitespace-nowrap">Cart</span>
              <span className="text-xs bg-[#FAF7F2] text-[#1F1E1C] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center tabular-nums">
                {totalQuantity}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A443C] hover:text-[#1F1E1C] focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#E8E2D5] space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activePage === 'home' ? 'bg-[#F2ECE1] text-[#1F1E1C] font-semibold' : 'text-[#4A443C]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop')}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activePage === 'shop' ? 'bg-[#F2ECE1] text-[#1F1E1C] font-semibold' : 'text-[#4A443C]'
              }`}
            >
              Shop Catalogue
            </button>
            <button
              onClick={() => handleNav('story')}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activePage === 'story' ? 'bg-[#F2ECE1] text-[#1F1E1C] font-semibold' : 'text-[#4A443C]'
              }`}
            >
              Our Story &amp; Kitchen
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                activePage === 'contact' ? 'bg-[#F2ECE1] text-[#1F1E1C] font-semibold' : 'text-[#4A443C]'
              }`}
            >
              Contact &amp; WhatsApp
            </button>
            <div className="pt-2 border-t border-[#E8E2D5]">
              <a
                href={BRAND_CONFIG.whatsapp.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#1F1E1C] bg-[#EBE4D8] rounded-md"
              >
                <span>Direct WhatsApp Inquiry</span>
                <span className="font-semibold">+91 62665 72346</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
