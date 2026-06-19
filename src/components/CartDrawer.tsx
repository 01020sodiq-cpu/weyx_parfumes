import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const formattedSubtotal = new Intl.NumberFormat('uz-UZ').format(subtotal) + " so'm";

  const handlePhoneChange = (val: string) => {
    // Basic formatting helper
    if (val.startsWith('+998')) {
      setPhone(val);
    } else if (val === '') {
      setPhone('+998 ');
    } else {
      setPhone('+998 ' + val.replace(/\D/g, ''));
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !address || phone.trim().length < 9) {
      alert("Iltimos barcha maydonlarni to'g'ri to'ldiring.");
      return;
    }
    // Generate order ID
    const randomId = 'WEYX-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutStep('success');
  };

  const handleCloseSuccess = () => {
    onClearCart();
    setCheckoutStep('cart');
    setName('');
    setPhone('+998 ');
    setAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            id="cart-overlay-backdrop"
          />

          {/* Slider Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#0c0f0f] border-l border-outline-variant/20 z-50 p-6 flex flex-col justify-between overflow-y-auto"
            id="cart-drawer-container"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-6 border-b border-outline-variant/15">
              <h2 className="font-display-lg text-2xl text-primary tracking-tight">Shopping Cart</h2>
              <button
                onClick={onClose}
                className="text-primary hover:opacity-80 transition-opacity p-1 cursor-pointer"
                id="close-cart-btn"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Content Switcher */}
            {checkoutStep === 'cart' && (
              <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center py-12">
                    <span className="material-symbols-outlined text-primary text-[60px] opacity-40">shopping_bag</span>
                    <p className="font-body-md text-on-surface-variant">Savat hozircha bo'sh.</p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 border border-primary text-primary font-label-sm text-xs uppercase tracking-widest hover:bg-primary/5 transition-all"
                    >
                      Xarid qilishni boshlash
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6 overflow-y-auto pr-2 max-h-[60vh]">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-4 p-4 border border-outline-variant/10 bg-[#121414] rounded-sm"
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-20 h-24 object-cover rounded-sm border border-outline-variant/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h3 className="font-headline-lg text-lg text-on-surface line-clamp-1">{item.product.name}</h3>
                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-on-surface-variant hover:text-red-400 transition-colors p-0 cursor-pointer"
                                  title="O'chirish"
                                >
                                  <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                              </div>
                              <span className="text-[10px] text-primary/70 tracking-widest font-semibold uppercase block mt-1">
                                {item.product.note}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center border border-outline/30 rounded-sm">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                                  className="px-2 py-0.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="px-3 text-sm text-on-surface font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                                  className="px-2 py-0.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-sm font-semibold text-primary">{item.product.priceStr}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-outline-variant/15 pt-6 mt-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-on-surface-variant uppercase tracking-widest text-xs">Jami summa:</span>
                        <span className="font-display-lg text-2xl text-primary font-semibold">{formattedSubtotal}</span>
                      </div>
                      <button
                        onClick={() => setCheckoutStep('checkout')}
                        className="w-full py-4 bg-primary text-[#422d00] font-label-sm uppercase tracking-widest hover:bg-primary-container transition-all text-sm font-semibold cursor-pointer"
                      >
                        Buyurtma berish
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {checkoutStep === 'checkout' && (
              <div className="flex-1 py-6 flex flex-col justify-between overflow-y-auto">
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div className="flex items-center gap-2 pb-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="text-primary hover:text-on-surface transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg align-middle">arrow_back</span>
                    </button>
                    <span className="text-xs uppercase tracking-widest text-on-surface-variant">Savatga qaytish</span>
                  </div>

                  <h3 className="font-display-lg text-xl text-primary mb-4">Rasmiylashtirish</h3>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold">Ismingiz *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Misol: Shodiyor"
                        className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold">Telefon raqamingiz *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="+998 90 123 45 67"
                        className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold font-mono">Yetkazib berish manzili *</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Shahar, tuman, ko'cha, uy / xonadon"
                        className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-[#121414] p-4 border border-outline-variant/15 space-y-2 rounded-sm text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Mahsulotlar soni:</span>
                      <span className="font-semibold text-on-surface">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} dona</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Yetkazib berish:</span>
                      <span className="text-primary font-semibold uppercase tracking-widest text-xs">Tekin</span>
                    </div>
                    <div className="border-t border-outline-variant/10 pt-2 flex justify-between font-semibold mt-2">
                      <span className="text-on-surface">Jami summa:</span>
                      <span className="text-primary">{formattedSubtotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-[#422d00] font-label-sm uppercase tracking-widest hover:bg-primary-container transition-all font-semibold cursor-pointer"
                  >
                    Xaridni yakunlash
                  </button>
                </form>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="flex-1 py-12 flex flex-col justify-center items-center text-center space-y-6">
                <span className="material-symbols-outlined text-primary text-[80px] leading-none animate-pulse">verified</span>
                
                <h3 className="font-display-lg text-2xl text-primary tracking-tight">Buyurtmangiz Qabul Kilindi!</h3>
                
                <p className="font-body-md text-on-surface-variant max-w-sm text-sm">
                  Tashakkur, <strong className="text-on-surface font-semibold">{name}</strong>! Weyx Parfumes-ning eksklyuziv olamidan tanlovingiz muvaffaqiyatli rasmiylashtirildi.
                </p>

                <div className="bg-[#121414] border border-primary/20 p-4 w-full rounded-sm">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary block mb-1 font-semibold">Buyurtma Ref:</span>
                  <span className="font-mono text-lg font-bold text-on-surface tracking-wider">{orderId}</span>
                </div>

                <p className="font-body-md text-xs text-on-surface-variant italic">
                  Ifor mutaxassisimiz 15 daqiqa ichida yetkazib berish tafsilotlarini kelishish uchun siz bilan bog'lanadi.
                </p>

                <button
                  onClick={handleCloseSuccess}
                  className="w-full py-3 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all font-label-sm uppercase tracking-widest text-xs cursor-pointer"
                >
                  Bosh sahifaga qaytish
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
