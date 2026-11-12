import { Product } from '../types';

export const getProductShareUrl = (product: Product, variantId?: string): string => {
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  const path = window.location.pathname;
  const params = new URLSearchParams();
  params.set('product', product.slug || product.id);
  if (variantId && variantId !== product.defaultVariantId) {
    params.set('variant', variantId);
  }
  return `${origin}${path}?${params.toString()}`;
};

export interface ShareResult {
  shared: boolean;
  method: 'native' | 'clipboard' | 'whatsapp';
}

export const shareProduct = async (
  product: Product,
  variantId?: string
): Promise<ShareResult> => {
  const url = getProductShareUrl(product, variantId);
  const title = `${product.name} | Amritva Artisanal Foods`;
  const text = `${product.name} — ${product.shortDesc}\nHandcrafted, slow-roasted, zero palm oil. Direct WhatsApp checkout:`;

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return { shared: true, method: 'native' };
    } catch (e: any) {
      // User cancelled or aborted native share, ignore error or fallback
      if (e.name === 'AbortError') {
        return { shared: false, method: 'native' };
      }
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(url);
    return { shared: true, method: 'clipboard' };
  } catch {
    return { shared: false, method: 'clipboard' };
  }
};

export const getProductWhatsAppShareUrl = (product: Product, variantId?: string): string => {
  const url = getProductShareUrl(product, variantId);
  const text = `Take a look at *${product.name}* from Amritva Artisanal Foods! 🌿\n\n${product.shortDesc}\n\n👉 View & Order: ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
};
