import React, { useState } from 'react';
import { Product } from '../../types';
import { BRAND_CONFIG } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { Plus, Check, Eye, Share2 } from 'lucide-react';
import { shareProduct } from '../../utils/share';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId);
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, currentVariant.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleQuickShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await shareProduct(product, currentVariant.id);
    if (res.shared) {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

  const discountPercent = currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price
    ? Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)
    : null;

  return (
    <article
      onClick={() => onOpenDetails(product)}
      className="group flex flex-col bg-[#FFFFFF] border border-[#E8E2D5] rounded-lg overflow-hidden hover:border-[#D1C7B7] hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] bg-[#F4EFE6] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
          }`}
        />

        {/* Quiet Discount or New Tag (Max 1 quiet unboxed tag) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {discountPercent ? (
            <span className="text-[11px] font-semibold text-[#8E4A28] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm shadow-xs">
              Save {discountPercent}%
            </span>
          ) : product.isNew ? (
            <span className="text-[11px] font-semibold text-[#2A3E2D] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm shadow-xs">
              New Batch
            </span>
          ) : null}
        </div>

        {/* Quick View & Share Buttons on Hover */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleQuickShare}
            className="bg-white/95 text-[#1F1E1C] hover:bg-white text-xs font-medium p-1.5 rounded-md shadow-sm transition-transform active:scale-90"
            aria-label={`Share link for ${product.name}`}
            title="Share or copy product link"
          >
            {isLinkCopied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5 text-[#8E4A28]" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="bg-white/95 text-[#1F1E1C] hover:bg-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-sm flex items-center gap-1.5"
            aria-label={`Quick view details for ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata (Section 1A Zero-Pill) */}
          <div className="flex items-center gap-2 text-xs text-[#7A7265] mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{currentVariant.weight}</span>
          </div>

          <h3 className="font-serif text-base font-semibold text-[#1F1E1C] group-hover:text-[#8E4A28] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B655B] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Variant Picker (if multiple variants exist) */}
        {product.variants.length > 1 && (
          <div className="pt-1" onClick={(e) => e.stopPropagation()}>
            <label htmlFor={`variant-select-${product.id}`} className="sr-only">
              Select size for {product.name}
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedVariantId === variant.id
                      ? 'bg-[#1F1E1C] text-[#FAF7F2]'
                      : 'bg-[#F4EFE6] text-[#595246] hover:bg-[#EAE2D3]'
                  }`}
                >
                  {variant.weight}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#1F1E1C] tabular-nums">
              {BRAND_CONFIG.currencySymbol}{currentVariant.price}
            </span>
            {currentVariant.originalPrice && currentVariant.originalPrice > currentVariant.price && (
              <span className="text-xs text-[#9E9589] line-through tabular-nums">
                {BRAND_CONFIG.currencySymbol}{currentVariant.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!currentVariant.inStock}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer ${
              !currentVariant.inStock
                ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                : isAdded
                ? 'bg-[#2A3E2D] text-white'
                : 'bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#38342F] active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
};
