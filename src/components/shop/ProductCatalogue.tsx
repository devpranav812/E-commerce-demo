import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
import { CATEGORIES } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface ProductCatalogueProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  products,
  onOpenDetails,
  selectedCategory,
  onSelectCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        if (!query) return matchesCategory;

        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.shortDesc.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        const matchesIngredients = p.ingredients?.some(ing => ing.toLowerCase().includes(query));

        return matchesCategory && (matchesName || matchesDesc || matchesIngredients);
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.variants[0].price - b.variants[0].price;
        }
        if (sortBy === 'price-desc') {
          return b.variants[0].price - a.variants[0].price;
        }
        if (sortBy === 'newest') {
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        }
        // Featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Catalogue Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8E4A28]">
          Packaged Delicacies Catalogue
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1E1C]">
          Browse Artisanal Provisions
        </h1>
        <p className="text-sm text-[#6B655B] max-w-2xl leading-relaxed">
          Order single packs, family tubs, or assorted festive hampers. Select your desired quantities and checkout directly via WhatsApp for lightning-fast dispatch.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-[#E8E2D5] shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C8375] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by snack, ingredient (e.g. makhana, cashews)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md text-xs text-[#1F1E1C] placeholder-[#8C8375] focus:outline-none focus:border-[#1F1E1C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8375] hover:text-[#1F1E1C]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-[#736B60] shrink-0" />
            <label htmlFor="sort-dropdown" className="font-semibold text-[#595246] whitespace-nowrap">Sort by:</label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 bg-[#FAF7F2] border border-[#D5CDC0] rounded-md text-xs text-[#1F1E1C] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">New Harvest / Batches</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Tabs (Segmented functional controls §1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#F2ECE1] pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1F1E1C] text-[#FAF7F2]'
                  : 'bg-[#FAF7F2] text-[#595246] hover:bg-[#EDE5D8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#7A7265]">
        <span>
          Showing <strong className="text-[#1F1E1C]">{filteredProducts.length}</strong> items
          {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
          {searchQuery && ` for "${searchQuery}"`}
        </span>

        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
            }}
            className="text-xs text-[#8E4A28] hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xl border border-[#E8E2D5] p-8 space-y-4">
          <p className="font-serif text-lg font-bold text-[#1F1E1C]">
            No snacks found matching your criteria
          </p>
          <p className="text-xs text-[#736B60] max-w-sm mx-auto">
            Try searching for a different keyword like "namkeen", "cookies", or "makhana", or clear your filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
            }}
            className="py-2 px-4 bg-[#1F1E1C] text-[#FAF7F2] text-xs font-semibold rounded-md hover:bg-[#33302C] cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}
    </main>
  );
};
