'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HERO_IMG =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80';

const EASE = [0.16, 1, 0.3, 1];

export default function PorscheHero() {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);

  // Mouse-follow parallax springs (GPU-only: transform)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const imgX = useTransform(sx, (v) => v * 14);
  const imgY = useTransform(sy, (v) => v * 10);
  const glowX = useTransform(sx, (v) => v * 22);
  const glowY = useTransform(sy, (v) => v * 16);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const onMove = (e) => {
      if (ref.current && !mq.matches) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        mx.set((e.clientX - cx) / rect.width);
        my.set((e.clientY - cy) / rect.height);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="cinematic-vignette relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with subtle parallax */}
      <motion.div
        style={{ x: imgX, y: imgY }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={HERO_IMG}
          alt="Porsche in cinematic studio lighting"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </motion.div>

      {/* Gold radial glow following mouse */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[120px] will-change-transform"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 pb-16 text-center md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="label !text-gold">Est. MMXXIV — Sovereign Detail Studio</span>
          <span className="h-px w-8 bg-gold/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-bone sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Precision Detailing for the{' '}
          <span className="gold-text italic">World&rsquo;s Finest</span>{' '}
          Automobiles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted md:text-lg"
        >
          A private atelier where ceramic chemistry, paint correction, and ceramic
          artistry converge to reveal a mirror finish that defies light.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/enquire"
            className="btn-luxe group bg-gold px-8 py-4 text-sm text-obsidian shadow-glowGold hover:bg-gold-soft"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/our-work"
            className="btn-luxe glass px-8 py-4 text-sm text-bone hover:bg-white/[0.06]"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-glass pt-8"
        >
          {[
            ['10+', 'Years of Craft'],
            ['4.9 ★', 'Client Rating'],
            ['1000+', 'Vehicles Detailed'],
          ].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-heading text-2xl font-bold text-gold md:text-3xl">
                {val}
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
