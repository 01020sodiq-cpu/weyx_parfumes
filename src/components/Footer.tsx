import { useState, FormEvent } from 'react';

interface FooterProps {
  onScrollToSection: (id: string, tabName: string) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ onScrollToSection, onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubscribe(email);
    setEmail('');
  };

  return (
    <footer className="w-full pt-20 pb-10 bg-[#0c0f0f] border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-20 max-w-[1440px] mx-auto">
        <div className="col-span-1">
          <button
            onClick={() => onScrollToSection('hero', 'bosh-sahifa')}
            className="font-display-lg text-3xl text-primary mb-6 block bg-transparent border-none p-0 cursor-pointer text-left"
            id="footer-logo-btn"
          >
            WEYX
          </button>
          
          <p className="text-sm font-body-md text-on-surface-variant max-w-xs leading-relaxed">
            Hashamatli iforlar va eksklyuziv kolleksiyalar uyi. Weyx Parfumes provides a world of mystery, exclusivity, and sensory indulgence.
          </p>

          <div className="flex gap-4 mt-8">
            <a href="#" className="text-primary hover:opacity-70 transition-opacity p-1">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a href="mailto:info@weyx.uz" className="text-primary hover:opacity-70 transition-opacity p-1">
              <span className="material-symbols-outlined text-xl">mail</span>
            </a>
            <a href="tel:+998711234567" className="text-primary hover:opacity-70 transition-opacity p-1">
              <span className="material-symbols-outlined text-xl">call</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-label-sm text-label-sm uppercase text-primary mb-6 tracking-widest font-semibold">Havolalar</h4>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => onScrollToSection('about', 'biz-haqimizda')}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md cursor-pointer text-left p-0 bg-transparent border-none"
              >
                Maxfiylik siyosati
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection('catalog', 'katalog')}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md cursor-pointer text-left p-0 bg-transparent border-none"
              >
                Yetkazib berish
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection('catalog', 'katalog')}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md cursor-pointer text-left p-0 bg-transparent border-none"
              >
                To'lov usullari
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection('contact', 'aloqa')}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md cursor-pointer text-left p-0 bg-transparent border-none"
              >
                Savollar
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-sm text-label-sm uppercase text-primary mb-6 tracking-widest font-semibold">Kolleksiyalar</h4>
          <ul className="space-y-4 text-sm font-body-md">
            <li>
              <button
                onClick={() => onScrollToSection('catalog', 'katalog')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left bg-transparent border-none p-0"
              >
                Yozgi iforlar
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection('catalog', 'katalog')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left bg-transparent border-none p-0"
              >
                Kechki bazm uchun
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection('catalog', 'katalog')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left bg-transparent border-none p-0"
              >
                Uniseks
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection('catalog', 'katalog')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-left bg-transparent border-none p-0"
              >
                Maxsus sovg'alar
              </button>
            </li>
          </ul>
        </div>

        <div id="footer-newsletter">
          <h4 className="font-label-sm text-label-sm uppercase text-primary mb-6 tracking-widest font-semibold">Yangi yangiliklar</h4>
          <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
            Eng so'nggi iforlar va chegirmalardan xabardor bo'ling.
          </p>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Emailingiz"
              className="w-full bg-transparent border-b border-primary/30 py-2 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
              id="newsletter-email-input"
            />
            <button type="submit" className="absolute right-0 bottom-2 text-primary hover:scale-110 transition-transform cursor-pointer p-1">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-outline-variant/10 text-center px-6">
        <p className="text-label-sm font-label-sm uppercase text-on-surface-variant tracking-widest text-[11px]">
          © 2024 WEYX Parfumes. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
