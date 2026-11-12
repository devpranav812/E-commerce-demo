import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { X, MessageCircle, Truck, CheckCircle2, Copy, Check } from 'lucide-react';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    subtotal,
    totalQuantity,
    totalProducts,
    customerInfo,
    updateCustomerInfo,
    generateWhatsAppMessage,
    checkoutOnWhatsApp
  } = useCart();

  const [copied, setCopied] = useState(false);
  const [hasLaunchedWhatsApp, setHasLaunchedWhatsApp] = useState(false);

  if (!isOpen) return null;

  const handleLaunch = () => {
    checkoutOnWhatsApp(customerInfo);
    setHasLaunchedWhatsApp(true);
  };

  const handleCopy = () => {
    const text = generateWhatsAppMessage(customerInfo);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatedPreview = generateWhatsAppMessage(customerInfo);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E2D5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E2D5] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
              Direct WhatsApp Order
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1E1C]">
              Review &amp; Send to WhatsApp
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736B60] hover:text-[#1F1E1C] bg-white rounded-full transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Post-launch notification banner (not a false order-success, but exact guidance) */}
          {hasLaunchedWhatsApp && (
            <div className="p-4 bg-[#EBF6EE] border border-[#BDE5C8] rounded-lg text-xs text-[#1B4323] space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#20BD5A]" />
                <span>Continue on WhatsApp to confirm your order</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                WhatsApp has been opened with your pre-formatted order summary. Simply hit the "Send" button in WhatsApp to submit it to our team. We will immediately confirm item availability and delivery schedule!
              </p>
            </div>
          )}

          {/* Quick Order Totals Bar */}
          <div className="p-4 bg-white border border-[#E8E2D5] rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="text-[#7A7265] block">Order Summary:</span>
              <span className="font-bold text-[#1F1E1C] text-sm">
                {totalProducts} Items ({totalQuantity} Units)
              </span>
            </div>
            <div className="text-right">
              <span className="text-[#7A7265] block">Subtotal:</span>
              <span className="font-bold text-[#1F1E1C] text-base tabular-nums">
                {BRAND_CONFIG.currencySymbol}{subtotal}
              </span>
            </div>
          </div>

          {/* Optional Delivery Information Form */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1F1E1C] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8E4A28]" />
                <span>Delivery Details (Optional for WhatsApp message):</span>
              </label>
              <span className="text-[11px] text-[#7A7265]">No login needed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#595246] mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={customerInfo.name}
                  onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] focus:ring-1 focus:ring-[#1F1E1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#595246] mb-1 font-medium">Contact Mobile</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={customerInfo.phone}
                  onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] focus:ring-1 focus:ring-[#1F1E1C] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#595246] mb-1 font-medium">Delivery Address &amp; Landmark</label>
                <input
                  type="text"
                  placeholder="House / Flat No., Street, Area"
                  value={customerInfo.address}
                  onChange={(e) => updateCustomerInfo({ address: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] focus:ring-1 focus:ring-[#1F1E1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#595246] mb-1 font-medium">City</label>
                <input
                  type="text"
                  placeholder="e.g. Indore / Mumbai / Bengaluru"
                  value={customerInfo.city}
                  onChange={(e) => updateCustomerInfo({ city: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] focus:ring-1 focus:ring-[#1F1E1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#595246] mb-1 font-medium">Pincode</label>
                <input
                  type="text"
                  placeholder="e.g. 452001"
                  value={customerInfo.pincode}
                  onChange={(e) => updateCustomerInfo({ pincode: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] focus:ring-1 focus:ring-[#1F1E1C] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#595246] mb-1 font-medium">Special Delivery Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Please send gift wrapping / deliver on weekend"
                  value={customerInfo.notes || ''}
                  onChange={(e) => updateCustomerInfo({ notes: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] focus:ring-1 focus:ring-[#1F1E1C] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delivery terms clarification as specified in Section 8 */}
          <p className="text-[11px] text-[#7A7265] bg-[#F2ECE1] p-3 rounded-md">
            ℹ️ Exact delivery charges (free on orders over ₹699) and dispatch tracking will be confirmed directly with you by our team on WhatsApp before processing.
          </p>

          {/* Formatted Message Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1F1E1C]">
                Generated WhatsApp Message Preview:
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-medium text-[#7A7265] hover:text-[#1F1E1C] flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="p-3 bg-[#FFFFFF] border border-[#E8E2D5] rounded-md text-[11px] font-mono text-[#3D3830] whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
              {generatedPreview}
            </pre>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={handleLaunch}
              className="w-full py-3.5 px-4 rounded-lg font-bold text-sm bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Continue on WhatsApp ({BRAND_CONFIG.whatsapp.rawNumber})</span>
            </button>
            <p className="text-center text-[11px] text-[#8C8375] mt-2">
              Opens WhatsApp chat with our verified business number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
