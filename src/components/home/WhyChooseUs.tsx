import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { ShieldCheck, HeartPulse, Sparkles, MessageCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const icons = [
    <HeartPulse className="w-5 h-5 text-[#8E4A28]" key="oil" />,
    <Sparkles className="w-5 h-5 text-[#C28E34]" key="spice" />,
    <ShieldCheck className="w-5 h-5 text-[#2A3E2D]" key="pack" />,
    <MessageCircle className="w-5 h-5 text-[#25D366]" key="wa" />
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="max-w-2xl text-center mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
            The Amritva Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1C]">
            Why Our Packaged Foods Taste Distinctively Fresh
          </h2>
          <p className="text-sm text-[#6B655B] leading-relaxed">
            Unlike industrial snack factories, every recipe is prepared in small batches honoring traditional roasting principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_CONFIG.pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-[#E8E2D5] rounded-xl flex flex-col space-y-3 hover:border-[#D1C7B7] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center">
                {icons[index]}
              </div>

              <h3 className="font-serif text-base font-bold text-[#1F1E1C] leading-snug">
                {pillar.title}
              </h3>

              <p className="text-xs text-[#6B655B] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
