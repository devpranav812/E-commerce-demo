import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Flame, Sparkles, Clock } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

interface HeroSectionProps {
  onExploreClick: () => void;
  onWhatsAppOrderClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onWhatsAppOrderClick
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E8E2D5]">
      {/* Main 2-Column Split Hero (Single Focal Anchor §1.C) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed editorial kicker (Section 1A: Zero-Pill) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8E4A28] tracking-wider uppercase">
              <span>Handcrafted Small Batches</span>
              <span aria-hidden="true">·</span>
              <span>Indore Roastery</span>
              <span aria-hidden="true">·</span>
              <span>Zero Palm Oil</span>
            </div>

            {/* Display Headline with balanced wrap (§1.D) */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1F1E1C] leading-[1.15] text-balance">
              Slow-Roasted Indian Delicacies. Freshly Packaged For Your Pantry.
            </h1>

            <p className="text-base text-[#595246] leading-relaxed max-w-2xl">
              Authentic roasted namkeen, heritage whole-wheat shortbread, and celebratory dryfruit hampers. Prepared with stone-ground regional spices and pure cold-pressed oils. Hand-packaged and confirmed directly over WhatsApp.
            </p>

            {/* Action buttons (Single-line controls §2) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="py-3 px-6 bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#33302C] text-xs font-semibold rounded-md transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWhatsAppOrderClick}
                className="py-3 px-5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded-md transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Quick WhatsApp Order</span>
              </button>
            </div>

            {/* Free shipping & delivery trust note */}
            <div className="pt-2 text-xs text-[#7A7265] flex items-center gap-3">
              <span className="font-medium text-[#1F1E1C]">Free delivery over ₹699</span>
              <span aria-hidden="true">·</span>
              <span>Direct WhatsApp confirmation: +91 62665 72346</span>
            </div>

          </div>

          {/* Hero Visual Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-xl border border-[#E8E2D5] bg-[#F4EFE6]">
              <img
                src="/src/assets/images/hero_artisanal_snacks_1794483840154.jpg"
                alt="Amritva artisanal packaged namkeen and roasted snacks"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-serif text-sm font-semibold">Artisanal Makhana, Namkeen &amp; Hand-cut Crisps</p>
                <p className="text-[11px] text-white/80 mt-0.5">Vacuum-sealed to preserve crisp texture &amp; aroma</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full-width 4-column KPI strip below hero (§5 #13) */}
      <div className="border-t border-[#E8E2D5] bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#4A443C]">
            <div className="flex items-center gap-3">
              <Flame className="w-4 h-4 text-[#8E4A28] shrink-0" />
              <div>
                <p className="font-bold text-[#1F1E1C]">Slow Flame Roasting</p>
                <p className="text-[11px] text-[#736B60]">Never deep-fried in palm oil</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#2A3E2D] shrink-0" />
              <div>
                <p className="font-bold text-[#1F1E1C]">Zero Preservatives</p>
                <p className="text-[11px] text-[#736B60]">100% natural cold-pressed oil</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#C28E34] shrink-0" />
              <div>
                <p className="font-bold text-[#1F1E1C]">Stone-Ground Spices</p>
                <p className="text-[11px] text-[#736B60]">Salem turmeric &amp; Malabar pepper</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#595246] shrink-0" />
              <div>
                <p className="font-bold text-[#1F1E1C]">Swift WhatsApp Dispatch</p>
                <p className="text-[11px] text-[#736B60]">Dispatched in 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
