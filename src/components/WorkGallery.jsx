'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';

const FILTERS = ['All', 'PPF', 'Correction', 'Ceramic'];

const PROJECTS = [
  {
    id: 1,
    title: '911 GT3 RS',
    brand: 'Porsche',
    tag: 'PPF',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Urus Performante',
    brand: 'Lamborghini',
    tag: 'Ceramic',
    img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'SF90 Stradale',
    brand: 'Ferrari',
    tag: 'Correction',
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Taycan Turbo S',
    brand: 'Porsche',
    tag: 'PPF',
    img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: '765LT',
    brand: 'McLaren',
    tag: 'Ceramic',
    img: 'https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'DB12',
    brand: 'Aston Martin',
    tag: 'Correction',
    img: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    title: 'Huracán EVO',
    brand: 'Lamborghini',
    tag: 'PPF',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    title: '812 Competizione',
    brand: 'Ferrari',
    tag: 'Ceramic',
    img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 9,
    title: 'GT Black Series',
    brand: 'Mercedes-AMG',
    tag: 'Correction',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function WorkGallery() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tag === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                'btn-luxe relative rounded-full px-5 py-2 text-[11px]',
                isActive
                  ? 'text-obsidian'
                  : 'glass text-muted hover:text-bone'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border border-glass"
            >
              <Image
                src={p.img}
                alt={`${p.brand} ${p.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-mechanical group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Tag */}
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-gold backdrop-blur-md">
                {p.tag}
              </span>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-gold">
                  {p.brand}
                </p>
                <h3 className="mt-1 font-display text-2xl font-medium text-bone">
                  {p.title}
                </h3>
                <div className="mt-3 h-px w-0 bg-gold transition-all duration-500 group-hover:w-16" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
