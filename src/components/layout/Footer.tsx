import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { CATEGORIES } from '../../data/products';
import { ActivePage } from '../../types';
import { MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onSelectCategory?: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const handleCategoryClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    onNavigate('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#191817] text-[#EDE7DE] pt-16 pb-12 border-t border-[#2E2C29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2E2C29]">
          
          {/* Brand Info (2 columns on large) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2] block">
              {BRAND_CONFIG.name}
            </span>
            <p className="text-sm text-[#A8A196] leading-relaxed max-w-sm">
              {BRAND_CONFIG.shortDescription}
            </p>
            <div className="pt-2 text-xs text-[#878074] space-y-1">
              <p>FSSAI Lic. No: 11422850000312</p>
              <p>Crafted &amp; Roasted with pride in Indore, India.</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#878074]">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-[#CDC6BB]">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story &amp; Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Support
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#878074]">
              Pantry Categories
            </p>
            <ul className="space-y-2 text-sm text-[#CDC6BB]">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct WhatsApp & Contact */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#878074]">
              WhatsApp Desk
            </p>
            <div className="space-y-2.5 text-xs text-[#CDC6BB]">
              <a
                href={BRAND_CONFIG.whatsapp.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#E5B56E] hover:underline"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-[#25D366]" />
                <span className="font-semibold">+91 62665 72346</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-start gap-2 text-[#A8A196]">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-start gap-2 text-[#A8A196]">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
              <p className="text-[11px] text-[#736B60] pt-1">
                Mon - Sat: 9:00 AM – 8:00 PM IST
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736B60]">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>WhatsApp Direct Order Fulfillment</span>
            <span aria-hidden="true">·</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
