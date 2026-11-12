import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { BRAND_CONFIG } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { getProductShareUrl, getProductWhatsAppShareUrl, shareProduct } from '../../utils/share';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  allProducts: Product[];
  initialVariantId?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  allProducts,
  initialVariantId
}) => {
  if (!product) return null;

  const { addToCart, checkoutOnWhatsApp } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariantId || product.defaultVariantId);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync selected variant when product or initialVariantId changes
  useEffect(() => {
    setSelectedVariantId(initialVariantId || product.defaultVariantId);
    setQuantity(1);
    setActiveImageIndex(0);
    setShowShareModal(false);
    setCopiedLink(false);
  }, [product, initialVariantId]);

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const shareUrl = getProductShareUrl(product, currentVariant.id);
  const whatsappShareUrl = getProductWhatsAppShareUrl(product, currentVariant.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const handleNativeShare = async () => {
    const res = await shareProduct(product, currentVariant.id);
    if (res.method === 'clipboard' && res.shared) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, currentVariant.id, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNowWhatsApp = () => {
    addToCart(product, currentVariant.id, quantity);
    // Instant WhatsApp checkout
    checkoutOnWhatsApp();
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  const discountPercent = currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price
    ? Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E2D5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions: Share & Close */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setShowShareModal(!showShareModal)}
            className="p-2 text-[#736B60] hover:text-[#1F1E1C] bg-white/90 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 text-xs font-medium px-3"
            aria-label="Share product link"
            title="Share product link"
          >
            <Share2 className="w-4 h-4 text-[#8E4A28]" />
            <span className="hidden sm:inline">Share</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 text-[#736B60] hover:text-[#1F1E1C] bg-white/90 hover:bg-white rounded-full transition-colors cursor-pointer shadow-xs"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F4EFE6] border border-[#E8E2D5]">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#1F1E1C]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Preservation Badges (Quiet) */}
              <div className="p-4 bg-[#F2ECE1] rounded-lg space-y-2 text-xs text-[#595246]">
                <div className="flex items-center gap-2 font-medium text-[#1F1E1C]">
                  <ShieldCheck className="w-4 h-4 text-[#2A3E2D]" />
                  <span>Amritva Purity Promise</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Stone-ground spices, zero synthetic preservatives, nitrogen-flushed packaging for sealed freshness.
                </p>
              </div>
            </div>

            {/* Product Details & Purchase Module */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                {/* Unboxed category & weight */}
                <div className="flex items-center gap-2 text-xs text-[#7A7265]">
                  <span className="uppercase tracking-wider font-semibold text-[11px]">{product.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>Net: {currentVariant.weight}</span>
                  {product.inStock ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#2A3E2D] font-medium">In Stock</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-red-700 font-medium">Currently Unavailable</span>
                    </>
                  )}
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1C] leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-bold text-[#1F1E1C] tabular-nums">
                    {BRAND_CONFIG.currencySymbol}{currentVariant.price}
                  </span>
                  {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                    <span className="text-base text-[#8C8375] line-through tabular-nums">
                      {BRAND_CONFIG.currencySymbol}{currentVariant.originalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-xs font-semibold text-[#8E4A28] bg-[#F9ECE5] px-2 py-0.5 rounded">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#595246] leading-relaxed pt-2">
                  {product.description}
                </p>

                {/* Combo contents list if applicable */}
                {product.isCombo && product.comboItems && (
                  <div className="p-3 bg-[#FFFFFF] border border-[#E8E2D5] rounded-md space-y-1.5 text-xs">
                    <p className="font-semibold text-[#1F1E1C] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C28E34]" />
                      Items Included in this Hamper:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[#595246]">
                      {product.comboItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Variant Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#3D3830] block">
                  Select Package Size / Variant:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedVariantId === variant.id
                          ? 'border-[#1F1E1C] bg-white ring-1 ring-[#1F1E1C]'
                          : 'border-[#E8E2D5] bg-[#FAF7F2] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#1F1E1C]">{variant.weight}</span>
                        <span className="font-bold text-[#1F1E1C] tabular-nums">
                          {BRAND_CONFIG.currencySymbol}{variant.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A7265] mt-0.5">{variant.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#3D3830]">Quantity:</span>
                  <div className="flex items-center border border-[#D5CDC0] rounded-md bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#736B60] hover:text-[#1F1E1C] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-semibold text-sm tabular-nums text-[#1F1E1C]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#736B60] hover:text-[#1F1E1C] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedAnimation
                        ? 'bg-[#2A3E2D] text-white'
                        : 'bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#33302C]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedAnimation ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={handleBuyNowWhatsApp}
                    className="py-3 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white transition-all shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>

                {/* Sharable Product Link Controls */}
                <div className="pt-2 border-t border-[#F2ECE1] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#595246] flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-[#8E4A28]" />
                      <span>Shareable Product Link</span>
                    </span>
                    <button
                      onClick={() => setShowShareModal(!showShareModal)}
                      className="text-[11px] text-[#8E4A28] hover:underline font-medium cursor-pointer"
                    >
                      {showShareModal ? 'Hide Options' : 'Share Options'}
                    </button>
                  </div>

                  {/* Share Card & Input */}
                  <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-lg p-3 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="flex-1 bg-[#FAF7F2] text-[#3D3830] text-[11px] p-2 rounded border border-[#D5CDC0] outline-none font-mono truncate select-all"
                      />
                      <button
                        onClick={handleCopyLink}
                        className={`py-2 px-3 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          copiedLink
                            ? 'bg-[#2A3E2D] text-white'
                            : 'bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#33302C]'
                        }`}
                        title="Copy link to clipboard"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={whatsappShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-3 bg-[#EBF6EE] hover:bg-[#DDF0E2] text-[#1B4323] text-[11px] font-semibold rounded flex items-center justify-center gap-1.5 transition-colors border border-[#C5E8CC]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
                        <span>Send on WhatsApp</span>
                      </a>

                      <button
                        onClick={handleNativeShare}
                        className="py-1.5 px-3 bg-[#FAF7F2] hover:bg-[#EDE5D8] text-[#4A443C] text-[11px] font-medium rounded flex items-center gap-1.5 transition-colors border border-[#D5CDC0] cursor-pointer"
                        title="Share via device menu"
                      >
                        <ExternalLink className="w-3 h-3 text-[#7A7265]" />
                        <span>More</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-[#8C8375]">
                      Recipients can open this link directly to view {product.name} ({currentVariant.weight}) and order on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ingredients & Storage Instructions */}
              <div className="border-t border-[#E8E2D5] pt-4 space-y-3 text-xs">
                {product.ingredients && product.ingredients.length > 0 && (
                  <div>
                    <span className="font-semibold text-[#1F1E1C] block mb-1">Key Ingredients:</span>
                    <p className="text-[#6B655B] leading-relaxed">
                      {product.ingredients.join(' · ')}
                    </p>
                  </div>
                )}

                {product.storageInstructions && (
                  <div>
                    <span className="font-semibold text-[#1F1E1C] block mb-1">Storage Instructions:</span>
                    <p className="text-[#6B655B] leading-relaxed">
                      {product.storageInstructions}
                    </p>
                  </div>
                )}

                {/* Nutritional breakdown */}
                {product.nutrition && (
                  <div className="bg-[#FFFFFF] p-3 rounded-md border border-[#E8E2D5]">
                    <span className="font-semibold text-[#1F1E1C] block mb-1 text-[11px] uppercase tracking-wider">
                      Approximate Values per 100g:
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] text-[#595246] pt-1">
                      <div>
                        <span className="block text-[#878074]">Energy</span>
                        <span className="font-bold text-[#1F1E1C]">{product.nutrition.energy}</span>
                      </div>
                      <div>
                        <span className="block text-[#878074]">Protein</span>
                        <span className="font-bold text-[#1F1E1C]">{product.nutrition.protein}</span>
                      </div>
                      <div>
                        <span className="block text-[#878074]">Carbs</span>
                        <span className="font-bold text-[#1F1E1C]">{product.nutrition.carbohydrates}</span>
                      </div>
                      <div>
                        <span className="block text-[#878074]">Fats</span>
                        <span className="font-bold text-[#1F1E1C]">{product.nutrition.fats}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E8E2D5]">
              <h3 className="font-serif text-lg font-bold text-[#1F1E1C] mb-4">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedVariantId(rel.defaultVariantId);
                      setQuantity(1);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 bg-white border border-[#E8E2D5] rounded-lg hover:border-[#C7BDB0] transition-colors cursor-pointer flex items-center gap-3"
                  >
                    <img src={rel.images[0]} alt={rel.name} className="w-14 h-14 object-cover rounded bg-[#F4EFE6]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#1F1E1C] truncate">{rel.name}</p>
                      <p className="text-[11px] text-[#7A7265]">{rel.variants[0].weight}</p>
                      <p className="text-xs font-bold text-[#1F1E1C] tabular-nums mt-0.5">
                        {BRAND_CONFIG.currencySymbol}{rel.variants[0].price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
