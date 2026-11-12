import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ActivePage } from '../../types';

interface BrandStorySectionProps {
  onReadStoryClick: (page: ActivePage) => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onReadStoryClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#E8E2D5] bg-[#F4EFE6]">
              <img
                src="/src/assets/images/story_kitchen_craft_1794483842264.jpg"
                alt="Amritva kitchen craft and spice roasting"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Minimal caption */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#7A7265]">
              <span>Stone-ground spices &amp; slow-roasted lentils</span>
              <span>Indore Roastery</span>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
              <Sparkles className="w-3.5 h-3.5 text-[#C28E34]" />
              <span>Our Culinary Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1C] leading-snug">
              Preserving the Lost Art of Patient Indian Roasting
            </h2>

            <div className="space-y-4 text-sm text-[#595246] leading-relaxed">
              <p>
                In an era dominated by high-speed industrial extruders and palm oil fryers, Amritva was founded with a singular conviction: genuine flavor and nutrition cannot be rushed.
              </p>
              <p>
                Every morning at our roastery in Indore, whole spices—cumin seeds, Salem turmeric, sun-dried curry leaves, and carom seeds—are stone-ground and dry-toasted over slow flames. We only use pure cold-pressed oils and A2 bilona ghee.
              </p>
              <p>
                The result is packaged snacking that feels like it came straight from your grandmother's brass kadhai—light on the palate, rich in aroma, and naturally satisfying.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onReadStoryClick('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-white border border-[#D5CDC0] text-[#1F1E1C] hover:bg-[#F2ECE1] text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
