export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  category: string;
  rating: number;
  reviews: number;
  badge: string | null;
  emoji: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  emoji: string;
  gradient: string;
  description: string;
}

export const categories: Category[] = [
  { name: "Electronics", slug: "electronics", count: 8, emoji: "⚡", gradient: "from-info to-info/70", description: "Gadgets, audio, wearables & smart devices" },
  { name: "Accessories", slug: "accessories", count: 6, emoji: "💎", gradient: "from-[hsl(280,60%,50%)] to-[hsl(280,60%,38%)]", description: "Wallets, watches, jewelry & more" },
  { name: "Footwear", slug: "footwear", count: 5, emoji: "👟", gradient: "from-success to-success/70", description: "Running shoes, sneakers & boots" },
  { name: "Bags", slug: "bags", count: 4, emoji: "🎒", gradient: "from-warning to-warning/70", description: "Backpacks, totes & travel bags" },
  { name: "Home", slug: "home", count: 5, emoji: "🏠", gradient: "from-destructive to-destructive/70", description: "Kitchen, décor & living essentials" },
  { name: "Clothing", slug: "clothing", count: 6, emoji: "👕", gradient: "from-accent to-accent/70", description: "Casual, formal & sportswear" },
];

export const products: Product[] = [
  // Electronics
  { id: 1, name: "Wireless Earbuds Pro", price: 79.99, oldPrice: 99.99, category: "Electronics", rating: 4.8, reviews: 124, badge: "Best Seller", emoji: "🎧", description: "Premium sound quality with active noise cancellation.", isSale: true },
  { id: 2, name: "Smart Watch Series X", price: 199.99, oldPrice: 249.99, category: "Electronics", rating: 4.7, reviews: 201, badge: "New", emoji: "⌚", description: "Advanced health tracking and seamless connectivity.", isNew: true, isSale: true },
  { id: 3, name: "Bluetooth Speaker", price: 59.99, oldPrice: null, category: "Electronics", rating: 4.5, reviews: 88, badge: null, emoji: "🔊", description: "360° immersive sound with 12-hour battery life." },
  { id: 4, name: "Wireless Charging Pad", price: 29.99, oldPrice: 39.99, category: "Electronics", rating: 4.4, reviews: 56, badge: "Sale", emoji: "🔋", description: "Fast wireless charging for all Qi-enabled devices.", isSale: true },
  { id: 5, name: "USB-C Hub 7-in-1", price: 44.99, oldPrice: null, category: "Electronics", rating: 4.6, reviews: 73, badge: null, emoji: "🔌", description: "Expand connectivity with HDMI, USB, and SD card ports.", isNew: true },
  { id: 6, name: "Noise-Cancelling Headphones", price: 149.99, oldPrice: 189.99, category: "Electronics", rating: 4.9, reviews: 312, badge: "Best Seller", emoji: "🎶", description: "Studio-quality sound with premium comfort.", isSale: true },
  { id: 7, name: "Portable Power Bank", price: 34.99, oldPrice: null, category: "Electronics", rating: 4.3, reviews: 45, badge: null, emoji: "⚡", description: "20,000mAh capacity with fast charging support.", isNew: true },
  { id: 8, name: "Smart LED Desk Lamp", price: 54.99, oldPrice: 69.99, category: "Electronics", rating: 4.5, reviews: 67, badge: "New", emoji: "💡", description: "Adjustable color temperature and brightness.", isNew: true, isSale: true },

  // Accessories
  { id: 9, name: "Classic Leather Wallet", price: 49.99, oldPrice: null, category: "Accessories", rating: 4.9, reviews: 89, badge: null, emoji: "👜", description: "Genuine leather with RFID blocking technology." },
  { id: 10, name: "Minimalist Watch", price: 129.99, oldPrice: 159.99, category: "Accessories", rating: 4.7, reviews: 104, badge: "Sale", emoji: "⏱️", description: "Japanese movement with sapphire crystal glass.", isSale: true },
  { id: 11, name: "Sunglasses Aviator", price: 69.99, oldPrice: null, category: "Accessories", rating: 4.6, reviews: 78, badge: null, emoji: "🕶️", description: "Polarized UV400 lenses with titanium frame." },
  { id: 12, name: "Beanie Hat", price: 24.99, oldPrice: null, category: "Accessories", rating: 4.4, reviews: 33, badge: null, emoji: "🧢", description: "Soft merino wool blend for winter warmth.", isNew: true },
  { id: 13, name: "Silver Chain Necklace", price: 39.99, oldPrice: 49.99, category: "Accessories", rating: 4.8, reviews: 61, badge: "Sale", emoji: "📿", description: "925 sterling silver with adjustable length.", isSale: true },
  { id: 14, name: "Leather Belt", price: 34.99, oldPrice: null, category: "Accessories", rating: 4.5, reviews: 42, badge: null, emoji: "👔", description: "Full-grain leather with brushed steel buckle." },

  // Footwear
  { id: 15, name: "Running Shoes Elite", price: 129.99, oldPrice: null, category: "Footwear", rating: 4.6, reviews: 153, badge: null, emoji: "👟", description: "Lightweight responsive cushioning for performance runs." },
  { id: 16, name: "Canvas Sneakers", price: 59.99, oldPrice: 74.99, category: "Footwear", rating: 4.5, reviews: 91, badge: "Sale", emoji: "👞", description: "Classic casual style with comfort insole.", isSale: true },
  { id: 17, name: "Hiking Boots Pro", price: 149.99, oldPrice: null, category: "Footwear", rating: 4.8, reviews: 67, badge: "New", emoji: "🥾", description: "Waterproof gore-tex with Vibram outsole.", isNew: true },
  { id: 18, name: "Slip-On Loafers", price: 89.99, oldPrice: null, category: "Footwear", rating: 4.4, reviews: 38, badge: null, emoji: "🥿", description: "Premium suede with memory foam insole." },
  { id: 19, name: "Sport Sandals", price: 44.99, oldPrice: 59.99, category: "Footwear", rating: 4.3, reviews: 52, badge: "Sale", emoji: "🩴", description: "Adjustable straps with EVA cushioned footbed.", isSale: true },

  // Bags
  { id: 20, name: "Backpack Pro 30L", price: 89.99, oldPrice: 109.99, category: "Bags", rating: 4.8, reviews: 77, badge: "Sale", emoji: "🎒", description: "Water-resistant with padded laptop compartment.", isSale: true },
  { id: 21, name: "Weekender Duffle", price: 119.99, oldPrice: null, category: "Bags", rating: 4.7, reviews: 54, badge: "New", emoji: "👝", description: "Canvas and leather trim for stylish travel.", isNew: true },
  { id: 22, name: "Crossbody Messenger", price: 64.99, oldPrice: null, category: "Bags", rating: 4.5, reviews: 41, badge: null, emoji: "💼", description: "Compact daily carry with tablet pocket." },
  { id: 23, name: "Tote Bag Eco", price: 39.99, oldPrice: null, category: "Bags", rating: 4.6, reviews: 63, badge: null, emoji: "🛍️", description: "100% organic cotton with reinforced handles.", isNew: true },

  // Home
  { id: 24, name: "Ceramic Mug Set", price: 34.99, oldPrice: null, category: "Home", rating: 4.5, reviews: 42, badge: null, emoji: "☕", description: "Set of 4 handcrafted mugs in earth tones." },
  { id: 25, name: "Scented Candle Trio", price: 29.99, oldPrice: 39.99, category: "Home", rating: 4.7, reviews: 88, badge: "Sale", emoji: "🕯️", description: "Lavender, vanilla & sandalwood soy wax candles.", isSale: true },
  { id: 26, name: "Throw Blanket", price: 49.99, oldPrice: null, category: "Home", rating: 4.8, reviews: 57, badge: null, emoji: "🧶", description: "Ultra-soft fleece with fringed edges." },
  { id: 27, name: "Plant Pot Set", price: 24.99, oldPrice: null, category: "Home", rating: 4.4, reviews: 31, badge: "New", emoji: "🪴", description: "Modern geometric pots with drainage holes.", isNew: true },
  { id: 28, name: "Kitchen Timer", price: 19.99, oldPrice: 24.99, category: "Home", rating: 4.3, reviews: 26, badge: null, emoji: "⏲️", description: "Magnetic digital timer with loud alarm.", isSale: true },

  // Clothing
  { id: 29, name: "Oversized Hoodie", price: 59.99, oldPrice: null, category: "Clothing", rating: 4.7, reviews: 134, badge: "Best Seller", emoji: "🧥", description: "Heavy-weight cotton blend with kangaroo pocket." },
  { id: 30, name: "Linen Shirt", price: 44.99, oldPrice: 59.99, category: "Clothing", rating: 4.5, reviews: 72, badge: "Sale", emoji: "👕", description: "Breathable pure linen for warm weather.", isSale: true },
  { id: 31, name: "Jogger Pants", price: 39.99, oldPrice: null, category: "Clothing", rating: 4.6, reviews: 96, badge: null, emoji: "👖", description: "Tapered fit with zippered pockets.", isNew: true },
  { id: 32, name: "Denim Jacket", price: 89.99, oldPrice: 119.99, category: "Clothing", rating: 4.8, reviews: 85, badge: "Sale", emoji: "🧥", description: "Classic wash with stretch comfort denim.", isSale: true },
  { id: 33, name: "Graphic Tee", price: 29.99, oldPrice: null, category: "Clothing", rating: 4.4, reviews: 110, badge: null, emoji: "👕", description: "Screen-printed art on organic cotton." },
  { id: 34, name: "Windbreaker Jacket", price: 74.99, oldPrice: null, category: "Clothing", rating: 4.6, reviews: 48, badge: "New", emoji: "🧥", description: "Packable, water-resistant with reflective details.", isNew: true },
];

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category.toLowerCase() === slug.toLowerCase());

export const getNewArrivals = () => products.filter((p) => p.isNew);
export const getSaleProducts = () => products.filter((p) => p.isSale);
export const getFeaturedProducts = () => products.slice(0, 6);
