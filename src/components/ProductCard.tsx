import { useState, useRef, MouseEvent } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [origin, setOrigin] = useState('center center');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setOrigin(`${x * 100}% ${y * 100}%`);
  };

  const handleMouseLeave = () => {
    setOrigin('center center');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative glass-card p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border border-outline-variant/10 rounded-sm"
      id={`product-card-${product.id}`}
    >
      <div className="w-full aspect-[3/4] mb-8 overflow-hidden bg-surface-container-low flex items-center justify-center relative rounded-sm">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ transformOrigin: origin }}
          src={product.imageUrl}
          referrerPolicy="no-referrer"
        />
        {product.tag && (
          <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 text-[10px] font-label-sm uppercase tracking-widest font-semibold">
            {product.tag}
          </div>
        )}
      </div>

      <span className="text-primary font-label-sm text-[12px] mb-2 opacity-60 tracking-wider">
        {product.note}
      </span>
      
      <h3 className="font-headline-lg text-[24px] text-on-surface mb-2 tracking-tight">
        {product.name}
      </h3>
      
      <p className="font-body-md text-on-surface-variant text-sm mb-6 max-w-[200px] line-clamp-2 h-[48px]">
        {product.description}
      </p>

      <div className="mt-auto w-full">
        <span className="font-display-lg text-2xl text-primary block mb-6">
          {product.priceStr}
        </span>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-3 bg-transparent border border-outline text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 font-label-sm text-[10px] uppercase tracking-[0.2em] cursor-pointer"
          id={`add-to-cart-${product.id}`}
        >
          Savatga qo'shish
        </button>
      </div>
    </div>
  );
}
