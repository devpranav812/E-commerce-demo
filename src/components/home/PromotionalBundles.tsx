import React from 'react';
import { Product } from '../../types';
import { BRAND_CONFIG } from '../../config/brand';
import { useCart } from '../../context/CartContext';
import { Gift, Plus, Check, Sparkles } from 'lucide-react';

interface PromotionalBundlesProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const PromotionalBundles: React.FC<PromotionalBundlesProps> = ({
  products,
  onOpenDetails
}) => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState<string | null>(null);

  const combos = products.filter(p => p.isCombo);

  const handleAddCombo = (combo: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(combo, combo.defaultVariantId, 1);
    setAddedId(combo.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  if (combos.length === 0) return null;

  return (
    <section className="py-16 bg-[#F3EFE6] border-y border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8E4A28] mb-1">
            <Gift className="w-4 h-4" />
            <span>Special Combinations &amp; Gifting</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1C]">
            Artisanal Gift Chests &amp; Tea-Time Bundles
          </h2>
          <p className="text-sm text-[#595246] mt-2 leading-relaxed">
            Thoughtfully paired for family celebrations, host gifts, and everyday tea rituals. Packed in recyclable embossed rigid keepsake boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {combos.map(combo => {
            const variant = combo.variants[0];
            const isAdded = addedId === combo.id;
            const savings = variant.originalPrice ? variant.originalPrice - variant.price : null;

            return (
              <div
                key={combo.id}
                onClick={() => onOpenDetails(combo)}
                className="bg-white rounded-xl border border-[#E8E2D5] overflow-hidden flex flex-col md:flex-row hover:border-[#D1C7B7] hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                {/* Visual */}
                <div className="md:w-5/12 aspect-[4/3] md:aspect-auto relative bg-[#FAF7F2] overflow-hidden shrink-0">
                  <img
                    src={combo.images[0]}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {savings && (
                    <span className="absolute top-3 left-3 bg-[#8E4A28] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-xs">
                      Save {BRAND_CONFIG.currencySymbol}{savings}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7265]">
                      {combo.categoryLabel} · {variant.weight}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1F1E1C] leading-snug group-hover:text-[#8E4A28] transition-colors">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-[#595246] line-clamp-2 leading-relaxed">
                      {combo.shortDesc}
                    </p>

                    {/* Included items */}
                    {combo.comboItems && (
                      <div className="pt-2 text-[11px] text-[#595246] space-y-1">
                        <span className="font-semibold text-[#1F1E1C] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C28E34]" />
                          Includes:
                        </span>
                        <ul className="list-disc pl-4 space-y-0.5 text-[#6B655B]">
                          {combo.comboItems.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="line-clamp-1">{item}</li>
                          ))}
                          {combo.comboItems.length > 3 && (
                            <li className="text-[10px] italic">+{combo.comboItems.length - 3} more items</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#1F1E1C] tabular-nums">
                        {BRAND_CONFIG.currencySymbol}{variant.price}
                      </span>
                      {variant.originalPrice && (
                        <span className="text-xs text-[#8C8375] line-through tabular-nums">
                          {BRAND_CONFIG.currencySymbol}{variant.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddCombo(combo, e)}
                      className={`py-2 px-3.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-[#2A3E2D] text-white'
                          : 'bg-[#1F1E1C] text-[#FAF7F2] hover:bg-[#33302C] active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
