import { motion } from 'motion/react';

interface WeyxLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  animated?: boolean;
}

export default function WeyxLogo({
  className = '',
  size = 180,
  showText = true,
  animated = true,
}: WeyxLogoProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const logoContent = (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* SVG Monogram Grid */}
      <svg
        width={size}
        height={size * 0.9}
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(233,193,118,0.25)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          {/* Real Gold Gradient mapping */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E0B1" />
            <stop offset="30%" stopColor="#E9C176" />
            <stop offset="70%" stopColor="#A8813C" />
            <stop offset="100%" stopColor="#F5D089" />
          </linearGradient>
          
          <radialGradient id="glowFilter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E9C176" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#121414" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background glow behind the golden Monogram */}
        <circle cx="100" cy="95" r="75" fill="url(#glowFilter)" />

        {/* 4-pointed Star at Top */}
        <g>
          <path
            d="M 100 12 L 104 22 L 114 26 L 104 30 L 100 40 L 96 30 L 86 26 L 96 22 Z"
            fill="url(#goldGrad)"
          />
        </g>

        {/* Overlapping stylized elegant W & Y monogram */}
        {/* Left thick branch of the monogram */}
        <path
          d="M 45 48 C 50 48, 55 52, 60 62 L 85 125 C 87 130, 93 130, 95 125 L 115 78 L 135 125 C 137 130, 143 130, 145 125 L 170 62 C 175 52, 180 48, 185 48"
          stroke="url(#goldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right accent branch of W monogram with luxury serif endings */}
        <path
          d="M 40 48 L 52 48"
          stroke="url(#goldGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 178 48 L 190 48"
          stroke="url(#goldGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Swirling interlocking Y element looping seamlessly */}
        <path
          d="M 82 55 L 100 100 L 118 55"
          stroke="url(#goldGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Curved swashes on the bottom matching the uploaded logo's decorative curls */}
        <path
          d="M 52 135 C 75 140, 90 135, 100 122 C 110 135, 125 140, 148 135 C 140 130, 135 120, 130 110"
          stroke="url(#goldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 70 110 C 65 120, 60 130, 52 135"
          stroke="url(#goldGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div className="mt-4 space-y-1">
          {/* WEYX text with gorgeous tracking */}
          <h1 className="font-display-lg text-[32px] md:text-[38px] text-primary tracking-[0.25em] font-light leading-none">
            WEYX
          </h1>
          {/* Subtext */}
          <p className="font-label-sm text-[9px] md:text-[10px] text-primary/75 uppercase tracking-[0.45em] border-t border-primary/20 pt-2 inline-block px-4">
            EXTRAIT DE PARFUM
          </p>

          {/* Under-logo flourish divider */}
          <div className="flex items-center justify-center gap-2 pt-1 opacity-75">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <span className="text-[10px] text-primary font-serif">♦</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex justify-center"
      >
        <motion.div variants={itemVariants}>{logoContent}</motion.div>
      </motion.div>
    );
  }

  return logoContent;
}
