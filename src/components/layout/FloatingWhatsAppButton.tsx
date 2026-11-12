import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const inquiryUrl = `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
    BRAND_CONFIG.whatsapp.inquiryMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
      {/* Optional dismissible quick prompt */}
      {showTooltip && (
        <div className="mb-2 bg-[#1F1E1C] text-[#FAF7F2] p-3 rounded-lg shadow-xl text-xs max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-[#E5B56E]">Need assistance?</p>
              <p className="text-[#D4CDC3] mt-0.5 text-[11px]">
                Chat with our roastery team directly on WhatsApp for custom orders and bulk hampers.
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#8C8375] hover:text-white p-0.5"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <a
        href={inquiryUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
        aria-label="Chat on WhatsApp with Amritva Foods"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
