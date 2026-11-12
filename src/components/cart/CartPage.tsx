import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { Trash2, Plus, Minus, MessageCircle, Truck, ShoppingBag, ArrowLeft, CheckCircle2, Copy, Check } from 'lucide-react';
import { ActivePage } from '../../types';

interface CartPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalProducts,
    totalQuantity,
    customerInfo,
    updateCustomerInfo,
    generateWhatsAppMessage,
    checkoutOnWhatsApp
  } = useCart();

  const [hasOrdered, setHasOrdered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleWhatsAppCheckout = () => {
    checkoutOnWhatsApp(customerInfo);
    setHasOrdered(true);
  };

  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage(customerInfo);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#F2ECE1] flex items-center justify-center text-[#736B60]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#1F1E1C]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-sm text-[#736B60] max-w-md mx-auto leading-relaxed">
            Looks like you haven't added any handcrafted packaged delicacies yet. Browse our slow-roasted namkeen, artisanal cookies, and festive gift boxes.
          </p>
        </div>
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-2 py-3 px-6 bg-[#1F1E1C] text-[#FAF7F2] text-xs font-semibold rounded-md hover:bg-[#33302C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Products Catalogue</span>
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D5] pb-6">
        <div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs text-[#7A7265] hover:text-[#1F1E1C] flex items-center gap-1.5 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1C]">
            Shopping Cart &amp; WhatsApp Checkout
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-700 hover:underline self-start sm:self-center cursor-pointer"
        >
          Clear entire cart
        </button>
      </div>

      {hasOrdered && (
        <div className="p-4 bg-[#EBF6EE] border border-[#BDE5C8] rounded-lg text-xs text-[#1B4323] space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#20BD5A]" />
            <span>Continue on WhatsApp to confirm your order</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Your structured cart details have been transferred to WhatsApp. Please press "Send" in WhatsApp so our team can review and share your delivery schedule!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Products List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#E8E2D5] rounded-xl overflow-hidden divide-y divide-[#F2ECE1]">
            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div key={`${item.productId}-${item.variantId}`} className="p-4 sm:p-5 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg bg-[#F4EFE6] shrink-0 border border-[#E8E2D5]"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#1F1E1C] leading-snug">
                        {item.productName}
                      </h3>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-[#9E9589] hover:text-red-700 transition-colors p-1 cursor-pointer"
                        aria-label={`Remove ${item.productName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-[#7A7265] flex items-center gap-2">
                      <span>Variant: {item.weight} ({item.variantName})</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">Unit: {BRAND_CONFIG.currencySymbol}{item.price}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D5CDC0] rounded-md bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, -1)}
                          className="p-1.5 text-[#736B60] hover:text-[#1F1E1C] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums text-[#1F1E1C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, 1)}
                          className="p-1.5 text-[#736B60] hover:text-[#1F1E1C] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1F1E1C] tabular-nums">
                          {BRAND_CONFIG.currencySymbol}{itemTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Note */}
          <div className="p-4 bg-[#F2ECE1] rounded-lg text-xs text-[#595246] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-[#1F1E1C]">
              <Truck className="w-4 h-4 text-[#8E4A28]" />
              <span>Packaging &amp; Delivery Information</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              All snacks are fresh-sealed in vacuum multi-layer pouches. Orders above ₹699 qualify for complimentary domestic express courier. Delivery charges for smaller orders are confirmed on WhatsApp based on your pincode.
            </p>
          </div>
        </div>

        {/* Checkout Summary & Customer Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E8E2D5] rounded-xl p-6 space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#1F1E1C] border-b border-[#F2ECE1] pb-3">
              Order Summary
            </h2>

            {/* Calculations Table */}
            <div className="space-y-2 text-xs text-[#595246]">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold text-[#1F1E1C] tabular-nums">{totalProducts} items</span>
              </div>
              <div className="flex justify-between">
                <span>Total Package Quantity:</span>
                <span className="font-semibold text-[#1F1E1C] tabular-nums">{totalQuantity} units</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="text-[#2A3E2D] font-medium">To be confirmed via WhatsApp</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1F1E1C] pt-3 border-t border-[#F2ECE1]">
                <span>Order Subtotal:</span>
                <span className="tabular-nums text-lg">
                  {BRAND_CONFIG.currencySymbol}{subtotal}
                </span>
              </div>
            </div>

            {/* Optional Customer Information Form */}
            <div className="space-y-3 pt-2 border-t border-[#F2ECE1]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1F1E1C]">Delivery Details (Optional):</span>
                <span className="text-[11px] text-[#7A7265]">Prefills WhatsApp</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-[#595246] mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={customerInfo.name}
                    onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#595246] mb-1 font-medium">WhatsApp Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={customerInfo.phone}
                    onChange={(e) => updateCustomerInfo({ phone: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#595246] mb-1 font-medium">Street Address</label>
                  <input
                    type="text"
                    placeholder="House / Apartment, Colony, Landmark"
                    value={customerInfo.address}
                    onChange={(e) => updateCustomerInfo({ address: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#595246] mb-1 font-medium">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Pune"
                      value={customerInfo.city}
                      onChange={(e) => updateCustomerInfo({ city: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#595246] mb-1 font-medium">Pincode</label>
                    <input
                      type="text"
                      placeholder="e.g. 411001"
                      value={customerInfo.pincode}
                      onChange={(e) => updateCustomerInfo({ pincode: e.target.value })}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#595246] mb-1 font-medium">Order Instructions / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra crisp packaging / Diwali gift tag"
                    value={customerInfo.notes || ''}
                    onChange={(e) => updateCustomerInfo({ notes: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md focus:border-[#1F1E1C] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-lg font-bold text-sm bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Order on WhatsApp Now</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#7A7265] pt-1">
                <span>WhatsApp: +91 62665 72346</span>
                <button
                  onClick={handleCopyMessage}
                  className="hover:text-[#1F1E1C] flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Message'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};
