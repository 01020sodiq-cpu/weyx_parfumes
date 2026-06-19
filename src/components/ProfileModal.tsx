import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WeyxLogo from './WeyxLogo';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function ProfileModal({ isOpen, onClose, userEmail }: ProfileModalProps) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [typedEmail, setTypedEmail] = useState('');

  const displayEmail = isLoggedOut ? '' : (customEmail || userEmail);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (typedEmail) {
      setCustomEmail(typedEmail);
      setIsLoggedOut(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedOut(true);
    setCustomEmail('');
    setTypedEmail('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            id="profile-overlay-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0c0f0f] border border-outline-variant/30 p-8 z-55 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]"
            id="profile-modal-container"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-primary hover:opacity-80 transition-opacity cursor-pointer p-1"
              id="close-profile-btn"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {displayEmail ? (
              // Active VIP Profile Card view (Obsidian & Gold theme)
              <div className="space-y-6">
                <div className="text-center space-y-2 flex flex-col items-center">
                  <WeyxLogo size={100} showText={false} animated={true} />
                  <h2 className="font-display-lg text-2xl text-primary tracking-tight mt-2">WEYX VIP Elite Club</h2>
                  <p className="font-mono text-[11px] text-primary/80 uppercase tracking-widest bg-primary/10 px-3 py-1 inline-block rounded-full">
                    GUEST MEMBER PRIVILEGE
                  </p>
                </div>

                <div className="border border-outline-variant/20 p-6 bg-[#1a1c1c] space-y-4 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#a6beb0] font-semibold font-mono">Member Email</span>
                      <p className="font-semibold text-on-surface text-base break-all select-all font-mono">{displayEmail}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-widest text-primary/60 font-semibold font-mono">Tier Level</span>
                      <p className="font-bold text-primary text-sm font-mono">Gold Privilege</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/10 text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#9a8f80]">Member ID</span>
                      <p className="font-semibold text-on-surface font-mono">W-825409</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#9a8f80]">Exclusive Status</span>
                      <p className="font-semibold text-primary font-mono">Active (VIP)</p>
                    </div>
                  </div>
                </div>

                {/* Simulated order history */}
                <div className="space-y-4">
                  <h3 className="font-display-lg text-lg text-primary">Sotib olish tarixi</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-outline-variant/10 bg-[#121414] text-xs">
                      <div>
                        <p className="font-semibold text-on-surface">Midnight Oud (Extrait de Parfum)</p>
                        <p className="text-on-surface-variant font-mono">Buyurtma № W-6821 • 15.06.2026</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-[#d0e8d9]/15 text-[#b4ccbe] rounded-full uppercase tracking-widest font-bold text-[9px]">
                          Yetkazilgan
                        </span>
                        <p className="text-primary font-semibold mt-1 font-mono">1,250,000 so'm</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-outline-variant/10 bg-[#121414] text-xs opacity-85">
                      <div>
                        <p className="font-semibold text-on-surface">Royal Sandal</p>
                        <p className="text-on-surface-variant font-mono">Buyurtma № W-5521 • Yaqinda</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-yellow-500/10 text-primary rounded-full uppercase tracking-widest font-bold text-[9px] animate-pulse">
                          Tayyorlanmoqda
                        </span>
                        <p className="text-primary font-semibold mt-1 font-mono">1,450,000 so'm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logout Action */}
                <div className="pt-4 flex justify-between gap-4">
                  <span className="text-xs text-on-surface-variant italic self-center">VIP imtiyozlari faol.</span>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 border border-red-500/35 text-red-400 hover:bg-red-500/10 transition-colors font-label-sm text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            ) : (
              // Login/Signup form
              <div className="space-y-6">
                <div className="text-center space-y-2 flex flex-col items-center">
                  <WeyxLogo size={110} showText={false} animated={true} />
                  <h2 className="font-display-lg text-2xl text-primary tracking-tight mt-4">VIP Elite Tizimga kirish</h2>
                  <p className="font-body-md text-sm text-on-surface-variant max-w-sm mx-auto">
                    Klubga a'zo bo'ling, eksklyuziv iforlar kolleksiyalari va mahsus takliflarga ega bo'ling.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#9a8f80] font-semibold font-mono">Email manzilingiz *</label>
                    <input
                      type="email"
                      required
                      placeholder="emailingiz@example.com"
                      value={typedEmail}
                      onChange={(e) => setTypedEmail(e.target.value)}
                      className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-[#9a8f80] font-semibold font-mono">Parol (ixtiyoriy)</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="bg-transparent border-b border-outline/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-[#412d00] font-label-sm text-xs uppercase tracking-widest hover:bg-primary-container transition-all font-semibold mt-4 cursor-pointer"
                  >
                    Klubga kirish
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-on-surface-variant">
                    Hisobingiz yo'qmi? Uni bizning saytimizda xaridni rasmiylashtirish davomida bepul yaratishingiz mumkin.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
