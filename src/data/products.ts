import { Product } from '../types';

export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'namkeen', label: 'Namkeen' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'sweets', label: 'Sweets' },
  { id: 'combos', label: 'Special Combos' }
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-masala-namkeen',
    name: 'Roasted Masala Namkeen',
    slug: 'roasted-masala-namkeen',
    category: 'namkeen',
    categoryLabel: 'Artisanal Namkeen',
    shortDesc: 'Handcrafted roasted seed and lentil namkeen with crisp curry leaves & whole cashews.',
    description: 'Slow-roasted over mild open flames without deep frying. Blended with sun-dried curry leaves, hand-picked Goan cashews, watermelon seeds, and stone-ground yellow chillies in cold-pressed groundnut oil.',
    images: [
      '/src/assets/images/product_namkeen_platter_1794483840790.jpg',
      '/src/assets/images/hero_artisanal_snacks_1794483840154.jpg'
    ],
    variants: [
      { id: 'v-namkeen-200g', name: 'Standard Pouch', weight: '200g', price: 140, originalPrice: 165, inStock: true },
      { id: 'v-namkeen-400g', name: 'Family Pack', weight: '400g', price: 260, originalPrice: 320, inStock: true },
      { id: 'v-namkeen-800g', name: 'Party Tub (Twin)', weight: '800g', price: 490, originalPrice: 600, inStock: true }
    ],
    defaultVariantId: 'v-namkeen-200g',
    inStock: true,
    featured: true,
    isNew: false,
    ingredients: [
      'Roasted Chickpeas',
      'Whole Goan Cashews',
      'Pumpkin & Watermelon Seeds',
      'Curry Leaves',
      'Cold-Pressed Groundnut Oil',
      'Rock Salt (Sendha Namak)',
      'Dry Mango Powder (Amchur)',
      'Black Pepper'
    ],
    storageInstructions: 'Store in an airtight container away from direct sunlight. Reseal pouch tightly after opening.',
    nutrition: {
      energy: '462 kcal',
      protein: '16.4g',
      carbohydrates: '42.1g',
      fats: '24.8g',
      dietaryFiber: '7.2g'
    },
    highlightBadges: ['Zero Palm Oil', 'Slow Roasted', 'Protein Rich']
  },
  {
    id: 'prod-pistachio-cookies',
    name: 'Cardamom Pistachio Shortbread',
    slug: 'cardamom-pistachio-shortbread',
    category: 'cookies',
    categoryLabel: 'Artisanal Cookies',
    shortDesc: 'Melt-in-mouth slow-baked butter shortbread perfumed with Idukki green cardamom and Iranian pistachios.',
    description: 'Hand-shaped and baked in small batches with farm-fresh cultured butter, whole wheat flour, coarse crushed pistachios, and freshly shelled green cardamom pods. Free from artificial vanilla or leaveners.',
    images: [
      '/src/assets/images/product_artisan_cookies_1794483840930.jpg',
      '/src/assets/images/hero_artisanal_snacks_1794483840154.jpg'
    ],
    variants: [
      { id: 'v-cookies-250g', name: 'Artisan Tin', weight: '250g', price: 220, originalPrice: 250, inStock: true },
      { id: 'v-cookies-500g', name: 'Double Tin Box', weight: '500g', price: 410, originalPrice: 480, inStock: true }
    ],
    defaultVariantId: 'v-cookies-250g',
    inStock: true,
    featured: true,
    isNew: true,
    ingredients: [
      'Cultured Farm Butter',
      'Stoneground Wheat Flour',
      'Raw Cane Sugar (Khand)',
      'Crushed Iranian Pistachios',
      'California Almonds',
      'Idukki Green Cardamom',
      'Sea Salt'
    ],
    storageInstructions: 'Keep in the aroma-seal airtight tin in a cool, dry place. Best enjoyed within 45 days.',
    nutrition: {
      energy: '512 kcal',
      protein: '9.2g',
      carbohydrates: '54.0g',
      fats: '28.5g',
      dietaryFiber: '4.1g'
    },
    highlightBadges: ['Pure Butter', 'Raw Cane Sugar', 'Zero Maida']
  },
  {
    id: 'prod-royal-festive-hamper',
    name: 'Grand Heritage Gift Hamper',
    slug: 'grand-heritage-gift-hamper',
    category: 'combos',
    categoryLabel: 'Special Combos',
    shortDesc: 'A luxurious curation of 6 artisanal specialties in an embossed gift box with silk ribbon.',
    description: 'The ultimate culinary gift for celebrations and thoughtful corporate gestures. Contains Roasted Masala Namkeen (200g), Cardamom Pistachio Cookies (250g), Spiced Chana Jor (150g), Roasted Makhana (100g), Artisanal Anjeer Barfi (200g), and Rosemary Garlic Seed Mix (100g).',
    images: [
      '/src/assets/images/product_special_combo_box_1794483841513.jpg',
      '/src/assets/images/product_namkeen_platter_1794483840790.jpg'
    ],
    variants: [
      { id: 'v-combo-deluxe', name: 'Royal Heritage Box (6 Items)', weight: '1000g net', price: 890, originalPrice: 1100, inStock: true },
      { id: 'v-combo-twin', name: 'Twin Festive Box (Pack of 2)', weight: '2000g net', price: 1690, originalPrice: 2100, inStock: true }
    ],
    defaultVariantId: 'v-combo-deluxe',
    inStock: true,
    featured: true,
    isNew: false,
    isCombo: true,
    comboItems: [
      'Roasted Masala Namkeen (200g)',
      'Cardamom Pistachio Shortbread (250g)',
      'Spiced Chana Jor (150g)',
      'Tangy Turmeric Makhana (100g)',
      'Fig & Walnut Anjeer Bites (200g)',
      'Rosemary Garlic Roasted Seeds (100g)'
    ],
    ingredients: [
      'Curated assorted whole ingredients from Amritva signature pantry products.'
    ],
    storageInstructions: 'Individual products are packaged in separate nitrogen-flushed pouches inside the gift chest.',
    nutrition: {
      energy: '475 kcal (avg)',
      protein: '14.8g',
      carbohydrates: '46.0g',
      fats: '25.0g',
      dietaryFiber: '6.5g'
    },
    highlightBadges: ['Gift Ready', 'Save ₹210', 'Free Custom Card']
  },
  {
    id: 'prod-masala-makhana',
    name: 'Tangy Turmeric Roasted Makhana',
    slug: 'tangy-turmeric-roasted-makhana',
    category: 'snacks',
    categoryLabel: 'Packaged Snacks',
    shortDesc: 'Hand-popped Mithila fox nuts roasted crisp in cold-pressed oil with golden turmeric and chaat masala.',
    description: 'Puffed fox nuts directly sourced from organic farmers in Mithila, Bihar. Carefully sorted, roasted crisp in small iron kadhais, and dusted with an invigorating sprinkle of organic turmeric, roasted cumin, and black salt.',
    images: [
      '/src/assets/images/hero_artisanal_snacks_1794483840154.jpg',
      '/src/assets/images/product_namkeen_platter_1794483840790.jpg'
    ],
    variants: [
      { id: 'v-makhana-100g', name: 'Single Pouch', weight: '100g', price: 130, originalPrice: 150, inStock: true },
      { id: 'v-makhana-300g', name: 'Trio Saver Pack', weight: '300g', price: 360, originalPrice: 420, inStock: true }
    ],
    defaultVariantId: 'v-makhana-100g',
    inStock: true,
    featured: false,
    isNew: true,
    ingredients: [
      'Puffed Fox Nuts (Makhana)',
      'Cold-Pressed Olive & Groundnut Oil',
      'Salem Turmeric Powder',
      'Black Salt',
      'Dry Mint Leaves',
      'Roasted Cumin',
      'Pomegranate Seed Powder (Anardana)'
    ],
    storageInstructions: 'Store in a moisture-free airtight container. Crisp with a 2-minute pan toss if exposed to humidity.',
    nutrition: {
      energy: '380 kcal',
      protein: '11.5g',
      carbohydrates: '64.2g',
      fats: '8.4g',
      dietaryFiber: '9.6g'
    },
    highlightBadges: ['Gluten Free', 'Zero Cholesterol', 'Light Snack']
  },
  {
    id: 'prod-spiced-chana-jor',
    name: 'Traditional Spiced Chana Jor',
    slug: 'traditional-spiced-chana-jor',
    category: 'namkeen',
    categoryLabel: 'Artisanal Namkeen',
    shortDesc: 'Flattened black chickpeas slow-toasted with black pepper, dry mango, and toasted carom seeds.',
    description: 'A nostalgic street specialty elevated into clean pantry snacking. Black gram chickpeas are soaked overnight, flattened, dry roasted till delightfully brittle, and dressed with crushed spices and fresh curry leaves.',
    images: [
      '/src/assets/images/hero_artisanal_snacks_1794483840154.jpg',
      '/src/assets/images/product_namkeen_platter_1794483840790.jpg'
    ],
    variants: [
      { id: 'v-chana-150g', name: 'Snack Pouch', weight: '150g', price: 95, originalPrice: 110, inStock: true },
      { id: 'v-chana-300g', name: 'Pantry Pouch', weight: '300g', price: 180, originalPrice: 210, inStock: true }
    ],
    defaultVariantId: 'v-chana-150g',
    inStock: true,
    featured: false,
    isNew: false,
    ingredients: [
      'Flattened Desi Chana',
      'Cold-Pressed Mustard & Groundnut Oil',
      'Ajwain (Carom Seeds)',
      'Black Pepper',
      'Dry Mango Powder',
      'Sendha Namak',
      'Asafoetida (Hing)'
    ],
    storageInstructions: 'Keep sealed in cool, dry conditions. Consume within 90 days of packing.',
    nutrition: {
      energy: '410 kcal',
      protein: '19.8g',
      carbohydrates: '51.3g',
      fats: '12.4g',
      dietaryFiber: '11.2g'
    },
    highlightBadges: ['High Protein', 'Dry Toasted', 'No Artificial Acid']
  },
  {
    id: 'prod-anjeer-barfi-bites',
    name: 'Sugar-Free Fig & Nut Barfi',
    slug: 'sugar-free-fig-nut-barfi',
    category: 'sweets',
    categoryLabel: 'Artisanal Sweets',
    shortDesc: 'Natural Afghan dried figs, roasted California almonds, pistachios, and organic dates with zero refined sugar.',
    description: 'Guilt-free artisanal confection made strictly from simmered Afghan figs, Medjool dates, roasted nuts, and fragrant nutmeg cooked in pure A2 bilona ghee. Sliced into dainty bite-sized squares.',
    images: [
      '/src/assets/images/product_special_combo_box_1794483841513.jpg',
      '/src/assets/images/product_artisan_cookies_1794483840930.jpg'
    ],
    variants: [
      { id: 'v-anjeer-250g', name: 'Sweet Box', weight: '250g', price: 290, originalPrice: 340, inStock: true },
      { id: 'v-anjeer-500g', name: 'Celebration Box', weight: '500g', price: 550, originalPrice: 650, inStock: true }
    ],
    defaultVariantId: 'v-anjeer-250g',
    inStock: true,
    featured: true,
    isNew: true,
    ingredients: [
      'Afghan Dried Figs (Anjeer)',
      'Medjool Dates',
      'Roasted California Almonds',
      'Cashews',
      'Pistachios',
      'A2 Cow Bilona Ghee',
      'Cardamom & Nutmeg'
    ],
    storageInstructions: 'Store in refrigerator after opening. Consume within 30 days.',
    nutrition: {
      energy: '430 kcal',
      protein: '8.4g',
      carbohydrates: '59.0g',
      fats: '18.2g',
      dietaryFiber: '8.0g'
    },
    highlightBadges: ['Zero Refined Sugar', 'A2 Desi Ghee', 'Dry Fruit Loaded']
  },
  {
    id: 'prod-chai-time-trio',
    name: 'Chai-Time Essentials Trio',
    slug: 'chai-time-essentials-trio',
    category: 'combos',
    categoryLabel: 'Special Combos',
    shortDesc: 'The ultimate trio crafted for the 4 PM Indian tea ritual: Namkeen, Cookies & Spiced Chana.',
    description: 'Curated by our culinary founder. Includes Roasted Masala Namkeen (200g), Cardamom Pistachio Shortbread (250g), and Spiced Chana Jor (150g) in an artisanal craft tote bag.',
    images: [
      '/src/assets/images/product_artisan_cookies_1794483840930.jpg',
      '/src/assets/images/product_namkeen_platter_1794483840790.jpg'
    ],
    variants: [
      { id: 'v-chai-trio', name: 'Trio Bundle (3 Items)', weight: '600g net', price: 420, originalPrice: 485, inStock: true }
    ],
    defaultVariantId: 'v-chai-trio',
    inStock: true,
    featured: false,
    isNew: false,
    isCombo: true,
    comboItems: [
      'Roasted Masala Namkeen (200g)',
      'Cardamom Pistachio Shortbread (250g)',
      'Spiced Chana Jor (150g)'
    ],
    ingredients: [
      'Refer to individual packs: all natural ingredients with zero palm oil.'
    ],
    storageInstructions: 'Store sealed in a cool pantry.',
    nutrition: {
      energy: '450 kcal (avg)',
      protein: '14.0g',
      carbohydrates: '48.0g',
      fats: '22.0g',
      dietaryFiber: '7.0g'
    },
    highlightBadges: ['Bundle & Save', 'Perfect Tea Partner']
  },
  {
    id: 'prod-golden-potato-chips',
    name: 'Hand-Cut Sea Salt & Pepper Crisps',
    slug: 'hand-cut-sea-salt-pepper-crisps',
    category: 'snacks',
    categoryLabel: 'Packaged Snacks',
    shortDesc: 'Slow-cooked thick potato crisps tossed with freshly ground Malabar black pepper and pink rock salt.',
    description: 'Thickly sliced mountain potatoes kettle-cooked in cold-pressed groundnut oil until hearty and intensely crunchy. Finished simply with sun-dried Tellicherry pepper and pink Himalayan salt.',
    images: [
      '/src/assets/images/hero_artisanal_snacks_1794483840154.jpg'
    ],
    variants: [
      { id: 'v-chips-120g', name: 'Snack Pack', weight: '120g', price: 80, originalPrice: 90, inStock: true },
      { id: 'v-chips-240g', name: 'Twin Pack', weight: '240g', price: 150, originalPrice: 175, inStock: true }
    ],
    defaultVariantId: 'v-chips-120g',
    inStock: true,
    featured: false,
    isNew: false,
    ingredients: [
      'Farm Potatoes',
      'Cold-Pressed Groundnut Oil',
      'Tellicherry Black Pepper',
      'Pink Himalayan Salt'
    ],
    storageInstructions: 'Keep in dry conditions. Nitrogen sealed for maximum crispness.',
    nutrition: {
      energy: '520 kcal',
      protein: '6.2g',
      carbohydrates: '52.0g',
      fats: '32.1g',
      dietaryFiber: '3.8g'
    },
    highlightBadges: ['Kettle Cooked', 'Zero Artificial Flavor']
  }
];
