import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { WhatsAppCheckoutModal } from './WhatsAppCheckoutModal';

interface CartDrawerProps {
  onGoToShop: () => void;
  onGoToCartPage: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onGoToShop, onGoToCartPage }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalProducts,
    totalQuantity
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity duration-300">
        <div className="absolute inset-0" onClick={closeCart} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E8E2D5]">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1F1E1C]" />
                <h2 className="font-serif text-lg font-bold text-[#1F1E1C]">
                  Your Pantry Cart
                </h2>
                <span className="text-xs bg-[#F2ECE1] text-[#595246] px-2 py-0.5 rounded-full font-semibold tabular-nums">
                  {totalQuantity}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-[#736B60] hover:text-[#1F1E1C] rounded-md transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F2ECE1] flex items-center justify-center text-[#736B60]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1F1E1C]">
                      Your cart is empty
                    </h3>
                    <p className="text-xs text-[#736B60] mt-1 max-w-xs leading-relaxed">
                      Discover our small-batch roasted namkeen, heritage sweets, and freshly baked cookies.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      onGoToShop();
                    }}
                    className="py-2.5 px-6 bg-[#1F1E1C] text-[#FAF7F2] text-xs font-semibold rounded-md hover:bg-[#33302C] transition-colors cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#7A7265] pb-1 border-b border-[#E8E2D5]">
                    <span>{totalProducts} Distinct items in order</span>
                    <button
                      onClick={clearCart}
                      className="text-red-700 hover:underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>

                  {cart.map((item) => {
                    const itemTotal = item.price * item.quantity;
                    return (
                      <div
                        key={`${item.productId}-${item.variantId}`}
                        className="p-3 bg-white border border-[#E8E2D5] rounded-lg flex gap-3 items-start"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-md bg-[#F4EFE6] shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-semibold text-[#1F1E1C] leading-snug line-clamp-1">
                              {item.productName}
                            </h4>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="text-[#9E9589] hover:text-red-700 transition-colors p-0.5 cursor-pointer"
                              aria-label={`Remove ${item.productName}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] text-[#7A7265]">
                            Size: {item.weight} ({item.variantName})
                          </p>

                          <div className="flex items-center justify-between pt-1">
                            {/* Stepper */}
                            <div className="flex items-center border border-[#D5CDC0] rounded bg-[#FAF7F2]">
                              <button
                                onClick={() => updateQuantity(item.productId, item.variantId, -1)}
                                className="p-1 text-[#736B60] hover:text-[#1F1E1C] cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#1F1E1C]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.variantId, 1)}
                                className="p-1 text-[#736B60] hover:text-[#1F1E1C] cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="text-xs font-bold text-[#1F1E1C] tabular-nums">
                                {BRAND_CONFIG.currencySymbol}{itemTotal}
                              </span>
                              <span className="block text-[10px] text-[#9E9589] tabular-nums">
                                @ {BRAND_CONFIG.currencySymbol}{item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Drawer Footer with Calculations */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E8E2D5] bg-white space-y-3">
                <div className="space-y-1.5 text-xs text-[#595246]">
                  <div className="flex justify-between">
                    <span>Total Quantity:</span>
                    <span className="font-semibold text-[#1F1E1C] tabular-nums">{totalQuantity} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges:</span>
                    <span className="text-[#2A3E2D] font-medium">Confirmed on WhatsApp</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#1F1E1C] pt-2 border-t border-[#F2ECE1]">
                    <span>Subtotal:</span>
                    <span className="tabular-nums text-base">
                      {BRAND_CONFIG.currencySymbol}{subtotal}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full py-3 px-4 rounded-lg font-bold text-xs bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Order on WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        closeCart();
                        onGoToCartPage();
                      }}
                      className="w-full py-2 px-3 rounded-md text-xs font-medium border border-[#D5CDC0] text-[#1F1E1C] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Full Cart View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={closeCart}
                      className="w-full py-2 px-3 rounded-md text-xs font-medium text-[#736B60] hover:text-[#1F1E1C] transition-colors cursor-pointer"
                    >
                      Keep Browsing
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* WhatsApp Checkout Review Modal */}
      <WhatsAppCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
};
