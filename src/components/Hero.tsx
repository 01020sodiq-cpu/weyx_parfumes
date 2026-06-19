import { motion } from 'motion/react';
import WeyxLogo from './WeyxLogo';

interface HeroProps {
  onLearnMore: () => void;
  onExploreFragrances: () => void;
}

export default function Hero({ onLearnMore, onExploreFragrances }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-[921px] flex flex-col items-center justify-center text-center px-6 md:px-20 overflow-hidden pt-20"
    >
      {/* Background glow and texture */}
      <div className="absolute inset-0 z-0">
        <div className="hero-glow absolute inset-0"></div>
        <div 
          className="absolute inset-0 opacity-25" 
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')",
            mixBlendMode: "overlay"
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-8"
      >
        {/* Branding Cluster with Premium vector logo */}
        <div className="mb-4">
          <WeyxLogo size={150} showText={true} animated={true} />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-body-md text-base md:text-body-md text-on-surface-variant max-w-2xl px-4 leading-relaxed"
        >
          Sizning ichki dunyongizni aks ettiruvchi, sirli va hashamatli iforlar san'ati. Biz har bir tomchi bilan xotiralarni uyg'otamiz.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 mt-8 w-full sm:w-auto px-4"
        >
          <button
            onClick={onLearnMore}
            className="px-12 py-4 bg-primary text-[#412d00] font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/95 hover:shadow-[0_0_25px_rgba(233,193,118,0.35)] transition-all duration-300 active:scale-95 cursor-pointer"
            id="hero-buy-now"
          >
            Hoziroq xarid qilish
          </button>
          <button
            onClick={onExploreFragrances}
            className="px-12 py-4 border border-primary text-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/10 transition-all duration-300 active:scale-95 cursor-pointer"
            id="hero-our-fragrances"
          >
            Iforlarimiz
          </button>
        </motion.div>
      </motion.div>

      {/* Down arrow scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-50 cursor-pointer hidden md:block"
        onClick={onExploreFragrances}
        id="scroll-down-arrow"
      >
        <span className="material-symbols-outlined text-primary text-3xl">keyboard_double_arrow_down</span>
      </motion.div>
    </section>
  );
}
