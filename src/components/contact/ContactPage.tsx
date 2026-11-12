import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../config/brand';
import { MessageCircle, Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('Personal Order');
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSendWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `Hello Amritva Foods! I have an inquiry regarding: ${inquiryType}.\n\n`;
    if (customerName) text += `Name: ${customerName}\n`;
    if (customerNote) text += `Message: ${customerNote}\n\n`;
    text += `Please let me know how to proceed. Thank you!`;

    const url = `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const faqs = [
    {
      q: "How does the WhatsApp ordering process work?",
      a: "Browse our catalogue, add any number of products or gift hampers with your selected package sizes to your cart, and click 'Order on WhatsApp'. A structured order summary is prefilled into your WhatsApp chat. Hit 'Send' to submit your order, and our team immediately confirms item availability and dispatch schedule."
    },
    {
      q: "How do I pay for my order?",
      a: "Once you share your order summary on WhatsApp, our team provides our verified official UPI QR code (Google Pay, PhonePe, Paytm), Net Banking details, or Cash on Delivery (available for eligible pin codes across India)."
    },
    {
      q: "What are your delivery charges and transit times?",
      a: "Orders above ₹699 qualify for complimentary domestic express delivery. For smaller orders, a nominal courier charge (₹50-₹80 depending on location) is calculated based on your destination pincode. Packages are dispatched within 24 hours and delivered within 2-4 business days."
    },
    {
      q: "Do you offer corporate gifting and wedding hampers?",
      a: "Yes! We specialize in custom-embossed wooden boxes and luxury gift hampers with personalized greeting notes for festivals, corporate appreciation, and weddings. Reach out directly on WhatsApp for bulk tier pricing."
    },
    {
      q: "Are your snacks really made without palm oil?",
      a: "100% yes. We strictly use wood cold-pressed groundnut oil and pure A2 cow ghee. Zero palm oil, zero trans-fats, and zero artificial preservatives like BHA/TBHQ are ever used in our kitchen."
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
          Customer Care &amp; Roastery Desk
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1C]">
          Get in Touch With Our Team
        </h1>
        <p className="text-sm text-[#595246] leading-relaxed">
          Have questions about our ingredients, want to arrange custom corporate hampers, or need help with your order? Our team is available directly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E8E2D5] rounded-xl p-6 space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#1F1E1C] border-b border-[#F2ECE1] pb-3">
              Direct Contact Details
            </h2>

            <div className="space-y-4 text-xs text-[#595246]">
              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#EBF6EE] text-[#25D366] rounded-lg shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1E1C] block text-sm">
                    WhatsApp Desk (Fastest)
                  </span>
                  <a
                    href={BRAND_CONFIG.whatsapp.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#20BD5A] font-bold hover:underline block mt-0.5"
                  >
                    +91 62665 72346
                  </a>
                  <p className="text-[11px] text-[#7A7265] mt-0.5">Average response: under 10 minutes</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#FAF7F2] text-[#8E4A28] rounded-lg shrink-0 border border-[#E8E2D5]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1E1C] block text-sm">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${BRAND_CONFIG.contact.email}`}
                    className="text-[#1F1E1C] hover:underline block mt-0.5"
                  >
                    {BRAND_CONFIG.contact.email}
                  </a>
                  <p className="text-[11px] text-[#7A7265] mt-0.5">For corporate inquiries &amp; distribution</p>
                </div>
              </div>

              {/* Kitchen Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#FAF7F2] text-[#595246] rounded-lg shrink-0 border border-[#E8E2D5]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1E1C] block text-sm">
                    Roastery &amp; Fulfillment
                  </span>
                  <p className="text-[#6B655B] mt-0.5 leading-relaxed">
                    {BRAND_CONFIG.contact.address}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#FAF7F2] text-[#595246] rounded-lg shrink-0 border border-[#E8E2D5]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1E1C] block text-sm">
                    Operating Hours
                  </span>
                  <p className="text-[#6B655B] mt-0.5">
                    {BRAND_CONFIG.contact.operatingHours}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Quick Message Launcher Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E8E2D5] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#1F1E1C]">
              Send an Inquiry Directly to WhatsApp
            </h2>
            <p className="text-xs text-[#7A7265]">
              Type your question below and we'll launch a direct WhatsApp conversation with our roastery coordinator.
            </p>
          </div>

          <form onSubmit={handleSendWhatsAppInquiry} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#595246] font-medium mb-1">Inquiry Category</label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none cursor-pointer"
              >
                <option value="Personal Order Assistance">Personal Order Assistance</option>
                <option value="Festive / Wedding Gift Hampers">Festive / Wedding Gift Hampers</option>
                <option value="Corporate Bulk Gifting">Corporate Bulk Gifting</option>
                <option value="Dietary & Ingredient Questions">Dietary &amp; Ingredient Questions</option>
                <option value="Dispatch / Tracking Query">Dispatch / Tracking Query</option>
              </select>
            </div>

            <div>
              <label className="block text-[#595246] font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sen"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#595246] font-medium mb-1">Your Message or Custom Request</label>
              <textarea
                rows={4}
                required
                placeholder="e.g. We need 35 boxes of the Grand Heritage Gift Hamper for Diwali delivery to our Bangalore office..."
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none leading-relaxed resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Launch WhatsApp Conversation (+91 62665 72346)</span>
            </button>
          </form>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-8 border-t border-[#E8E2D5] space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
            Customer Answers
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1F1E1C]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E8E2D5] rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#1F1E1C]">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#736B60] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#736B60] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-[#595246] leading-relaxed border-t border-[#F2ECE1]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </main>
  );
};
