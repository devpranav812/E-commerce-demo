import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../shop/ProductCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onViewAllClick: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onOpenDetails,
  onViewAllClick
}) => {
  const featured = products.filter(p => p.featured || p.isNew).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E2D5] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28] block mb-1">
              Curated Pantry Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1E1C]">
              Featured Signature Delicacies
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F1E1C] hover:text-[#8E4A28] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
