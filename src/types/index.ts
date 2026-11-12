export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'namkeen' | 'snacks' | 'cookies' | 'sweets' | 'combos';
  categoryLabel: string;
  shortDesc: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  defaultVariantId: string;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  isCombo?: boolean;
  comboItems?: string[];
  ingredients?: string[];
  storageInstructions?: string;
  nutrition?: {
    energy?: string;
    protein?: string;
    carbohydrates?: string;
    fats?: string;
    dietaryFiber?: string;
  };
  highlightBadges?: string[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  weight: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
}

export type ActivePage = 'home' | 'shop' | 'story' | 'contact' | 'cart';
