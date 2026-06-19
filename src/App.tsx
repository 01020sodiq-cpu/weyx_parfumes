import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { products } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProfileModal from './components/ProfileModal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('bosh-sahifa');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Catalog filters & state
  const [selectedCategory, setSelectedCategory] = useState('barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  // Custom VIP Guest email
  const userEmail = "01020sodiq@gmail.com";

  // Luxe notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add to cart helper
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    triggerToast(`"${product.name}" savatga qo'shildi!`);
  };

  // Update quantity inside cart drawer
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Remove item completely
  const handleRemoveItem = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    setCartItems((prevItems) => prevItems.filter((i) => i.product.id !== productId));
    if (item) {
      triggerToast(`"${item.product.name}" savatdan olib tashlandi.`);
    }
  };

  // Clear cart on successful order
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Smooth scroll handler
  const handleScrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Newsletter callback
  const handleSubscribeNewsletter = (emailAddress: string) => {
    triggerToast(`Tashakkur! ${emailAddress} obuna bo'lish so'rovi tasdiqlandi.`);
  };

  // Filter & sort logic for the products list
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'barchasi' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // default order
  });

  // Calculate cart counts
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Auto-scrolling category target selector
  const handleExploreCategorySelector = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    handleScrollToSection('catalog', 'katalog');
  };

  return (
    <div className="bg-[#121414] min-h-screen text-[#e2e2e2] selection:bg-primary selection:text-[#412d00] font-body-md overflow-x-hidden relative">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalItemsCount}
        onCartToggle={() => setIsCartOpen(true)}
        onProfileToggle={() => setIsProfileOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className="w-full">
        {/* Hero Banner Component */}
        <Hero
          onLearnMore={() => handleScrollToSection('catalog', 'katalog')}
          onExploreFragrances={() => handleScrollToSection('catalog', 'katalog')}
        />

        {/* Featured Products / Interactive Catalog Stage */}
        <section id="catalog" className="py-24 px-6 md:px-20 max-w-[1440px] mx-auto scroll-mt-20">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-primary font-label-sm text-[11px] uppercase tracking-[0.3em] opacity-80 mb-2">WEYX COUTURE SELECTION</span>
            <h2 className="font-headline-lg text-[32px] md:text-[40px] text-primary mb-4 tracking-tight">Eng mashhur atirlar</h2>
            <div className="w-24 h-[1px] bg-primary/30"></div>
          </div>

          {/* Luxury Filtering Controls */}
          <div className="mb-12 space-y-6">
            {/* Search and Sort parameters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-outline-variant/15 pb-6">
              <div className="relative w-full md:max-w-md">
                <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-primary/60 text-lg">search</span>
                <input
                  type="text"
                  placeholder="Iforlar bo'yicha qidiruv..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none pl-7 pr-4 py-2 text-on-surface focus:outline-none focus:ring-0 text-sm placeholder:text-[#9a8f80]/50"
                  id="catalog-search-input"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#9a8f80] font-semibold whitespace-nowrap">Saralash:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-primary hover:text-white transition-colors py-1 cursor-pointer text-xs uppercase tracking-wider focus:outline-none focus:ring-0 font-label-sm"
                  id="catalog-sort-select"
                >
                  <option value="default" className="bg-[#0c0f0f] text-on-surface">Asl tartibda</option>
                  <option value="price-low" className="bg-[#0c0f0f] text-on-surface">Narx: Shkalasi o'suvchi</option>
                  <option value="price-high" className="bg-[#0c0f0f] text-on-surface">Narx: Shkalasi kamayuvchi</option>
                </select>
              </div>
            </div>

            {/* Category selection Tabs */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2">
              {[
                { label: 'Barchasi', key: 'barchasi' },
                { label: 'Sharqona', key: 'sharqona' },
                { label: 'Gulli va Nozik', key: 'gulli' },
                { label: 'Daraxtnamo', key: 'daraxt' },
                { label: 'Achchiq', key: 'achchiq' },
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-5 py-2 text-[10px] md:text-label-sm font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    selectedCategory === category.key
                      ? 'bg-primary text-[#412d00] shadow-[0_0_10px_rgba(233,193,118,0.2)]'
                      : 'border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}
                  id={`filter-tab-${category.key}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Container */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 border border-outline-variant/10 rounded-sm bg-[#1a1c1c]/20 max-w-lg mx-auto">
              <span className="material-symbols-outlined text-primary text-5xl opacity-55 animate-bounce mb-3">sentiment_dissatisfied</span>
              <p className="font-body-md text-on-surface-variant">Siz izlagan ifor bo'yicha mahsulotlar topilmadi.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('barchasi');
                }}
                className="mt-4 px-6 py-2 border border-primary text-primary font-label-sm text-xs uppercase tracking-widest hover:bg-primary/5 transition-all cursor-pointer"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              id="products-grid"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={p} onAddToCart={handleAddToCart} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* Aesthetic Storytelling Banner */}
        <section id="about" className="py-32 bg-[#1a1c1c] overflow-hidden scroll-mt-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
            <div className="order-2 md:order-1 space-y-10">
              <div className="space-y-4">
                <span className="text-primary font-label-sm text-xs uppercase tracking-[0.2em] font-medium block">
                  BRAND FALSAFASI
                </span>
                <h2 className="font-headline-lg text-[40px] md:text-[48px] text-primary mb-8 leading-tight font-light tracking-tight">
                  Har bir iforda bir hikoya bor.
                </h2>
              </div>
              
              <p className="font-body-md text-on-surface-variant text-base md:text-lg leading-relaxed text-justify">
                WEYX — bu shunchaki atir emas, balki shaxsiyatingizning ko'rinmas hashamatli aksessuaridir. 
                Sayyoraning eng chekka burchaklaridan eng noyob va tabiiy moddalarni yig'ib chiqib, yuqori darajadagi parfyumeriya asarlarini taqdim qilamiz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 border border-outline-variant/30 text-center flex-1 rounded-sm bg-[#121414]/35 hover:border-primary/50 transition-colors">
                  <span className="block font-display-lg text-4xl text-primary mb-2 font-light">100%</span>
                  <span className="font-label-sm text-[10px] uppercase tracking-widest opacity-60">Tabiiy moylar</span>
                </div>
                <div className="p-6 border border-outline-variant/30 text-center flex-1 rounded-sm bg-[#121414]/35 hover:border-primary/50 transition-colors">
                  <span className="block font-display-lg text-4xl text-primary mb-2 font-light">24s+</span>
                  <span className="font-label-sm text-[10px] uppercase tracking-widest opacity-60">Chidamlilik</span>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative aspect-square p-2">
              <div className="absolute inset-4 border border-primary/20 translate-x-4 translate-y-4 rounded-sm" />
              <div className="w-full h-full overflow-hidden rounded-sm border border-outline-variant/10 relative">
                <img
                  alt="WEYX Craft"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms] cursor-pointer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIf-INF6qHlH05KSNKE3orIfJVKianjh92SPwbKRs33yeMBPU5A9f2-5C3bIHswOle3S_UqRkpNXdpMQYTuXP6kRv4V_1pir9vKPzY7WL1jXf0j0efVJsoLVN5zZ8JDWTks5qkWu8ucPmBc5Y22fqJd-BrMN8XKtO_QdzicROq0fCfDuVDLtD6wH0YQTW5zjNI0C_K45cRa4lAho5NY7nmbYMSJJJGkTSeoUw53OM1oHaaXHZmj6fNAIa2XAOfWLgyNwPDvG-jZSo"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Consultation Form */}
        <ContactSection />
      </main>

      {/* Elegant Footer with anchor hooks */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onSubscribe={handleSubscribeNewsletter}
      />

      {/* Sliders and Overlays */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail={userEmail}
      />

      {/* Exquisite minimal notification toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-55 flex items-center gap-3 px-6 py-4 bg-[#0c0f0f] border border-primary/40 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-sm"
            id="toast-notification-wrapper"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-medium text-on-surface tracking-wide">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#9a8f80] hover:text-white ml-2 cursor-pointer p-0.5"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
