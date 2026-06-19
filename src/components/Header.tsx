import { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  onProfileToggle: () => void;
  onScrollToSection: (id: string, tabName: string) => void;
}

export default function Header({
  activeTab,
  cartCount,
  onCartToggle,
  onProfileToggle,
  onScrollToSection,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 backdrop-blur-xl border-b border-outline-variant/15 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#121414]/95 shadow-lg'
          : 'py-6 bg-[#121414]/80 shadow-sm'
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-20 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-12">
          <button
            onClick={() => onScrollToSection('hero', 'bosh-sahifa')}
            className="font-display-lg text-[32px] text-primary tracking-tighter cursor-pointer hover:opacity-90 transition-opacity bg-transparent border-none p-0"
            id="logo-button"
          >
            WEYX
          </button>
          
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => onScrollToSection('hero', 'bosh-sahifa')}
              className={`text-label-sm font-label-sm uppercase tracking-widest cursor-pointer transition-all duration-300 pb-1 ${
                activeTab === 'bosh-sahifa'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
              }`}
              id="nav-home"
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => onScrollToSection('catalog', 'katalog')}
              className={`text-label-sm font-label-sm uppercase tracking-widest cursor-pointer transition-all duration-300 pb-1 ${
                activeTab === 'katalog'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
              }`}
              id="nav-catalog"
            >
              Katalog
            </button>
            <button
              onClick={() => onScrollToSection('about', 'biz-haqimizda')}
              className={`text-label-sm font-label-sm uppercase tracking-widest cursor-pointer transition-all duration-300 pb-1 ${
                activeTab === 'biz-haqimizda'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
              }`}
              id="nav-about"
            >
              Biz haqimizda
            </button>
            <button
              onClick={() => onScrollToSection('contact', 'aloqa')}
              className={`text-label-sm font-label-sm uppercase tracking-widest cursor-pointer transition-all duration-300 pb-1 ${
                activeTab === 'aloqa'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
              }`}
              id="nav-contact"
            >
              Aloqa
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onCartToggle}
            className="text-primary hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 relative p-1 cursor-pointer"
            aria-label="Shopping Cart"
            id="cart-toggle-btn"
          >
            <span className="material-symbols-outlined text-[28px] leading-none">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          
          <button
            onClick={onProfileToggle}
            className="text-primary hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 p-1 cursor-pointer"
            aria-label="User Profile"
            id="profile-toggle-btn"
          >
            <span className="material-symbols-outlined text-[28px] leading-none">person</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
