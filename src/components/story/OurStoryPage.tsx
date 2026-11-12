import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { ArrowRight, Flame, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';
import { ActivePage } from '../../types';

interface OurStoryPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
          Our Roots &amp; Kitchen Craft
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F1E1C] leading-[1.15]">
          Honoring the Heritage of Slow-Roasted Indian Pantry Delicacies
        </h1>
        <p className="text-base text-[#595246] leading-relaxed">
          Amritva was born from a simple yearning: to restore the purity, aroma, and gentle crunch of traditional Indian snack-making that mass-industrial factories left behind.
        </p>
      </div>

      {/* Hero Documentary Image */}
      <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-[#E8E2D5] bg-[#F4EFE6]">
        <img
          src="/src/assets/images/story_kitchen_craft_1794483842264.jpg"
          alt="Artisanal kitchen roasting spices in Indore"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
          <p className="font-serif text-lg font-bold">Traditional Roasting, Zero Compromise</p>
          <p className="text-xs text-white/80 mt-1">
            Every spice blend is freshly crushed on granite millstones and cooked in small batches of under 25kg.
          </p>
        </div>
      </div>

      {/* The 3 Core Pillars of Craft */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="p-6 bg-white border border-[#E8E2D5] rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center">
            <Flame className="w-5 h-5 text-[#8E4A28]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1F1E1C]">
            Open-Flame Dry Roasting
          </h3>
          <p className="text-xs text-[#6B655B] leading-relaxed">
            Most commercial namkeen is flash-fried in cheap palm oil at scorching temperatures. We slow-roast our seeds, fox nuts, and lentils in heavy iron pans until thoroughly crisp and easy to digest.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E2D5] rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#C28E34]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1F1E1C]">
            Cold-Pressed &amp; Bilona Ghee
          </h3>
          <p className="text-xs text-[#6B655B] leading-relaxed">
            We partner with regional oil mills in Saurashtra and Madhya Pradesh for wood-churned cold-pressed groundnut oil, and source indigenous Gir cow A2 bilona ghee for our heritage cookies and barfis.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E2D5] rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#2A3E2D]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1F1E1C]">
            Aroma-Barrier Packaging
          </h3>
          <p className="text-xs text-[#6B655B] leading-relaxed">
            Without chemical preservatives (like BHA/BHT), real food spoils if exposed to air. We use nitrogen-flushed foil canisters and zip-lock kraft pouches that keep every bite crunchy for up to 6 months.
          </p>
        </div>
      </div>

      {/* Sourcing Narrative Section */}
      <div className="bg-[#F3EFE6] rounded-2xl p-8 sm:p-12 border border-[#E8E2D5]">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8E4A28] uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Indore, Madhya Pradesh</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1C]">
            From Central India's Culinary Capital to Your Tea Table
          </h2>
          <div className="space-y-4 text-sm text-[#595246] leading-relaxed">
            <p>
              Indore has long been celebrated as the snack capital of India—where the art of namkeen (savory crunch) was perfected over generations of royal patronage and bustling street markets.
            </p>
            <p>
              At Amritva, we blend this legendary taste craftsmanship with modern hygienic production standards. Every batch is tasted by our culinary founders before being nitrogen-packed and shipped directly to connoisseurs across the country.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => {
                onNavigate('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-6 bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#33302C] text-xs font-semibold rounded-md transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Products Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-3 px-5 bg-white border border-[#D5CDC0] text-[#1F1E1C] hover:bg-[#FAF7F2] text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              Contact Our Kitchen
            </button>
          </div>
        </div>
      </div>

    </main>
  );
};
