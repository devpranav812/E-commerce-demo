import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, CustomerInfo } from '../types';
import { BRAND_CONFIG } from '../config/brand';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, delta: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  totalProducts: number;
  totalQuantity: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  customerInfo: CustomerInfo;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  generateWhatsAppMessage: (customDetails?: Partial<CustomerInfo>) => string;
  generateWhatsAppUrl: (customDetails?: Partial<CustomerInfo>) => string;
  checkoutOnWhatsApp: (customDetails?: Partial<CustomerInfo>) => void;
  notification: string | null;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'amritva_cart_v1';
const CUSTOMER_STORAGE_KEY = 'amritva_customer_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        notes: ''
      };
    } catch {
      return {
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        notes: ''
      };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist customer details
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo));
    } catch (e) {
      console.error('Failed to save customer details', e);
    }
  }, [customerInfo]);

  const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
    setCustomerInfo(prev => ({ ...prev, ...info }));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const dismissNotification = () => setNotification(null);

  const addToCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const selectedVariantId = variantId || product.defaultVariantId;
    const variant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

    if (!variant || !variant.inStock) {
      showNotification('This variant is currently out of stock.');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          variantName: variant.name,
          weight: variant.weight,
          price: variant.price,
          originalPrice: variant.originalPrice,
          quantity: Math.max(1, quantity),
          image: product.images[0],
          category: product.categoryLabel
        };
        return [...prev, newItem];
      }
    });

    showNotification(`Added ${product.name} (${variant.weight}) to your cart.`);
  };

  const updateQuantity = (productId: string, variantId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.productId === productId && item.variantId === variantId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.variantId === variantId)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalProducts = useMemo(() => cart.length, [cart]);
  
  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  // Generate structured message exactly adhering to prompt instructions
  const generateWhatsAppMessage = (customDetails?: Partial<CustomerInfo>): string => {
    const details = { ...customerInfo, ...(customDetails || {}) };
    
    let msg = "Hello! I would like to place an order.\n\n";
    msg += "*MY ORDER*\n\n";

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      msg += `${index + 1}. ${item.productName}\n`;
      msg += `   Variant: ${item.weight} (${item.variantName})\n`;
      msg += `   Quantity: ${item.quantity}\n`;
      msg += `   Price: ${BRAND_CONFIG.currencySymbol}${item.price} each\n`;
      msg += `   Total: ${BRAND_CONFIG.currencySymbol}${itemTotal}\n\n`;
    });

    msg += "------------------------\n\n";
    msg += `Total Products: ${totalProducts}\n`;
    msg += `Total Quantity: ${totalQuantity}\n`;
    msg += `Subtotal: ${BRAND_CONFIG.currencySymbol}${subtotal}\n\n`;

    const hasCustomerDetails = details.name || details.phone || details.address || details.city;

    if (hasCustomerDetails) {
      msg += "*DELIVERY DETAILS*\n";
      if (details.name) msg += `Name: ${details.name}\n`;
      if (details.phone) msg += `Phone: ${details.phone}\n`;
      if (details.address) msg += `Address: ${details.address}\n`;
      if (details.city) msg += `City: ${details.city}${details.pincode ? ` - ${details.pincode}` : ''}\n`;
      if (details.notes) msg += `Instructions: ${details.notes}\n`;
      msg += "\n";
    }

    msg += "Please confirm my order and share the delivery details.\n\n";
    msg += "Thank you!";

    return msg;
  };

  const generateWhatsAppUrl = (customDetails?: Partial<CustomerInfo>): string => {
    const rawMessage = generateWhatsAppMessage(customDetails);
    const encoded = encodeURIComponent(rawMessage);
    return `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encoded}`;
  };

  const checkoutOnWhatsApp = (customDetails?: Partial<CustomerInfo>) => {
    if (cart.length === 0) {
      showNotification('Your cart is empty. Add products before ordering.');
      return;
    }
    const url = generateWhatsAppUrl(customDetails);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalProducts,
        totalQuantity,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        customerInfo,
        updateCustomerInfo,
        generateWhatsAppMessage,
        generateWhatsAppUrl,
        checkoutOnWhatsApp,
        notification,
        dismissNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
