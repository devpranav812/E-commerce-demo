import React, { useState, useEffect, useCallback } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Product, ActivePage } from './types';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsAppButton } from './components/layout/FloatingWhatsAppButton';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { PromotionalBundles } from './components/home/PromotionalBundles';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { BrandStorySection } from './components/home/BrandStorySection';
import { ProductCatalogue } from './components/shop/ProductCatalogue';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { OurStoryPage } from './components/story/OurStoryPage';
import { ContactPage } from './components/contact/ContactPage';
import { CheckCircle2, X } from 'lucide-react';

const DEFAULT_TITLE = 'Amritva Artisanal Foods | Handcrafted Indian Snacks & WhatsApp Checkout';

function AppContent() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [initialVariantId, setInitialVariantId] = useState<string | undefined>(undefined);

  const { notification, dismissNotification, openCart } = useCart();

  // Helper to sync URL search params
  const syncUrl = useCallback((page: ActivePage, product: Product | null, variantId?: string) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (page !== 'home') {
      url.searchParams.set('page', page);
    } else {
      url.searchParams.delete('page');
    }

    if (product) {
      url.searchParams.set('product', product.slug || product.id);
      if (variantId && variantId !== product.defaultVariantId) {
        url.searchParams.set('variant', variantId);
      } else {
        url.searchParams.delete('variant');
      }
      document.title = `${product.name} | Amritva Artisanal Foods`;
    } else {
      url.searchParams.delete('product');
      url.searchParams.delete('variant');
      document.title = DEFAULT_TITLE;
    }

    window.history.pushState({}, '', url.toString());
  }, []);

  const handleOpenProductDetail = useCallback((product: Product, variantId?: string) => {
    setSelectedProductForDetail(product);
    setInitialVariantId(variantId || product.defaultVariantId);
    syncUrl(activePage, product, variantId);
  }, [activePage, syncUrl]);

  const handleCloseProductDetail = useCallback(() => {
    setSelectedProductForDetail(null);
    setInitialVariantId(undefined);
    syncUrl(activePage, null);
  }, [activePage, syncUrl]);

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    if (selectedProductForDetail) {
      setSelectedProductForDetail(null);
      setInitialVariantId(undefined);
    }
    syncUrl(page, null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelectFromNav = (catId: string) => {
    setSelectedCategory(catId);
    handleNavigate('shop');
  };

  // On mount and popstate: parse URL params for deep-link
  useEffect(() => {
    const parseUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get('product') || params.get('p');
      const variantParam = params.get('variant') || params.get('v');
      const pageParam = params.get('page') as ActivePage;

      if (pageParam && ['home', 'shop', 'story', 'contact', 'cart'].includes(pageParam)) {
        setActivePage(pageParam);
      }

      if (productParam) {
        const found = PRODUCTS.find(
          p => p.slug === productParam || p.id === productParam || p.slug.toLowerCase() === productParam.toLowerCase()
        );
        if (found) {
          setSelectedProductForDetail(found);
          setInitialVariantId(variantParam || found.defaultVariantId);
          document.title = `${found.name} | Amritva Artisanal Foods`;
        } else {
          setSelectedProductForDetail(null);
          document.title = DEFAULT_TITLE;
        }
      } else {
        setSelectedProductForDetail(null);
        document.title = DEFAULT_TITLE;
      }
    };

    parseUrlState();

    window.addEventListener('popstate', parseUrlState);
    return () => window.removeEventListener('popstate', parseUrlState);
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F1E1C]">
      {/* Announcement Bar */}
      <AnnouncementBar onShopClick={() => handleNavigate('shop')} />

      {/* Main Navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Toast Notification */}
      {notification && (
        <aside
          aria-label="Notification"
          className="fixed top-22 right-4 z-50 bg-[#1F1E1C] text-[#FAF7F2] py-2.5 px-4 rounded-lg shadow-xl text-xs flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-[#3E3A33]"
        >
          <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
          <span className="font-medium">{notification}</span>
          <button
            onClick={dismissNotification}
            className="text-[#9E9589] hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Main Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection
              onExploreClick={() => handleNavigate('shop')}
              onWhatsAppOrderClick={() => {
                handleNavigate('shop');
              }}
            />
            <FeaturedProducts
              products={PRODUCTS}
              onOpenDetails={(p) => handleOpenProductDetail(p)}
              onViewAllClick={() => handleNavigate('shop')}
            />
            <PromotionalBundles
              products={PRODUCTS}
              onOpenDetails={(p) => handleOpenProductDetail(p)}
            />
            <WhyChooseUs />
            <BrandStorySection onReadStoryClick={(page) => handleNavigate(page)} />
          </>
        )}

        {activePage === 'shop' && (
          <ProductCatalogue
            products={PRODUCTS}
            onOpenDetails={(p) => handleOpenProductDetail(p)}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {activePage === 'story' && (
          <OurStoryPage onNavigate={handleNavigate} />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}

        {activePage === 'cart' && (
          <CartPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleCategorySelectFromNav}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onGoToShop={() => handleNavigate('shop')}
        onGoToCartPage={() => handleNavigate('cart')}
      />

      {/* Product Detail Modal with Sharable Link Support */}
      <ProductDetailModal
        product={selectedProductForDetail}
        initialVariantId={initialVariantId}
        onClose={handleCloseProductDetail}
        onSelectProduct={(p) => handleOpenProductDetail(p)}
        allProducts={PRODUCTS}
      />

      {/* Subtle Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
