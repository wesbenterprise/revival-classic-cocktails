'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '@/types/database';

export default function DrinkItem({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const hasImage = item.image_url && !imageError;
  const isClickable = !!item.image_url;

  return (
    <div
      className={`group rounded-lg transition-colors duration-200 ${
        isClickable ? 'cursor-pointer' : ''
      } ${isOpen ? 'bg-revival-charcoal' : ''}`}
      onClick={isClickable ? () => setIsOpen(!isOpen) : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      } : undefined}
      aria-expanded={isClickable ? isOpen : undefined}
    >
      <div className={`${isOpen ? 'px-4 pt-4' : ''} transition-[padding] duration-200`}>
        <div className="flex items-baseline justify-between gap-4">
          {/* Name + badge + camera hint */}
          <div className="flex items-baseline gap-2 min-w-0">
            <h3 className="font-display text-lg text-revival-cream group-hover:text-revival-amber transition-colors">
              {item.name}
            </h3>
            {item.badge && (
              <span className={`
                flex-none text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full
                ${item.badge === 'new'
                  ? 'bg-revival-amber/20 text-revival-amber'
                  : 'bg-revival-muted text-revival-cream-muted'
                }
              `}>
                {item.badge}
              </span>
            )}
            {isClickable && (
              <Camera
                size={13}
                className={`flex-none transition-opacity duration-200 ${
                  isOpen
                    ? 'text-revival-amber opacity-100'
                    : 'text-revival-cream-dim opacity-0 group-hover:opacity-60'
                }`}
              />
            )}
          </div>

          {/* Dots + Price */}
          <div className="flex items-baseline gap-2 flex-none">
            <span className="hidden sm:block text-revival-border tracking-[0.3em] text-xs">
              ···········
            </span>
            {item.price && (
              <span className="text-revival-cream-muted text-sm tabular-nums">
                {item.price}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-1 text-revival-cream-dim text-sm leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Expandable image area */}
      {isClickable && (
        <div
          className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? contentHeight : 0,
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div ref={contentRef} className="px-4 pb-4 pt-3">
            <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-revival-dark">
              {hasImage ? (
                <Image
                  src={item.image_url!}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 100vw, 672px"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-revival-cream-dim">
                  <Camera size={24} className="text-revival-amber-dim" />
                  <span className="text-xs tracking-wide">Photo coming soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
