import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { X, ChevronRight } from 'lucide-react';

interface AnnouncementBarProps {
  onShopClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onShopClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const announcements = BRAND_CONFIG.announcements;

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <aside aria-label="Announcement" className="bg-[#1F1E1C] text-[#F3EFE6] text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={nextMessage}
          className="flex-1 text-center font-normal tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          title="Click to see next update"
        >
          <span>{announcements[currentIndex]}</span>
          {onShopClick && (
            <span 
              onClick={(e) => {
                e.stopPropagation();
                onShopClick();
              }}
              className="hidden sm:inline-flex items-center text-[#E5B56E] hover:underline cursor-pointer ml-1 text-[11px]"
            >
              Order fresh now <ChevronRight className="w-3 h-3 inline ml-0.5" />
            </span>
          )}
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#A39B8F] hover:text-[#FAF7F2] transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
