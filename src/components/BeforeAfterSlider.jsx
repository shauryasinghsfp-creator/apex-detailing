'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

const BEFORE_IMG =
  'https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?auto=format&fit=crop&w=1600&q=80';
const AFTER_IMG =
  'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1600&q=80';

export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e) => {
    setDragging(true);
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (dragging) updateFromClientX(e.clientX);
  };

  const onPointerUp = () => setDragging(false);
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 4));
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Before and after comparison"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative aspect-[16/9] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-glass focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
      >
        {/* AFTER (base layer) */}
        <Image
          src={AFTER_IMG}
          alt="After — mirror finish ceramic coated paint"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          draggable={false}
        />
        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-gold backdrop-blur-md">
          After · Ceramic
        </span>

        {/* BEFORE (clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div className="absolute inset-0" style={{ width: containerRef.current?.clientWidth ?? '100%' }}>
            <Image
              src={BEFORE_IMG}
              alt="Before — raw scratched paint"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-muted backdrop-blur-md">
          Before
        </span>

        {/* Divider handle */}
        <div
          className="absolute inset-y-0 z-10 w-px bg-gold transition-opacity duration-300"
          style={{ left: `${pos}%`, opacity: dragging ? 1 : 0.85 }}
        >
          <div className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 bg-obsidian/80 backdrop-blur-md shadow-glowGold flex items-center justify-center">
            <ChevronsLeftRight className="h-5 w-5 text-gold" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted">
        Drag to reveal the transformation
      </p>
    </div>
  );
}
