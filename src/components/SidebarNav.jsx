'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Images, CalendarCheck, X, Menu } from 'lucide-react';
import { cn } from '@/lib/cn';

const LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/our-work', label: 'Our Work', icon: Images },
  { href: '/enquire', label: 'Enquire', icon: CalendarCheck },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const NavList = ({ onNavigate }) => (
    <nav className="flex flex-col gap-2">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="group relative flex items-center gap-3 rounded-lg px-4 py-3"
          >
            {active && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-lg bg-white/[0.06] hairline"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 h-[18px] w-[18px] transition-colors duration-300',
                active ? 'text-gold' : 'text-muted group-hover:text-bone'
              )}
              strokeWidth={active ? 2 : 1.5}
            />
            <span
              className={cn(
                'relative z-10 font-heading text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
                active ? 'text-bone' : 'text-muted group-hover:text-bone'
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                'absolute right-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-gold transition-opacity duration-300',
                active ? 'opacity-100' : 'opacity-0'
              )}
            />
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ---------- Desktop fixed sidebar ---------- */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[248px] flex-col border-r border-glass bg-obsidian/80 backdrop-blur-xl md:flex">
        <div className="flex flex-col items-start gap-2 px-7 pb-8 pt-9">
          <span className="font-heading text-[15px] font-bold uppercase tracking-[0.28em] text-bone">
            APEX
          </span>
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.46em] text-gold">
            // Atelier
          </span>
        </div>

        <div className="mx-7 mb-8 h-px bg-gradient-to-r from-gold/40 via-white/10 to-transparent" />

        <div className="flex-1 px-5">
          <div className="mb-4 px-4">
            <span className="label">Navigation</span>
          </div>
          <NavList />
        </div>

        <div className="px-7 pb-8">
          <div className="mb-3 h-px bg-white/[0.06]" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted/70">
            Precision Detailing
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted/50">
            Est. MMXXIV
          </p>
        </div>
      </aside>

{/* ---------- Mobile top bar ---------- */}
      <header className="pt-safe fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-glass bg-obsidian/80 px-5 py-4 backdrop-blur-xl md:hidden">
        <div className="flex flex-col leading-none">
          <span className="font-heading text-[13px] font-bold uppercase tracking-[0.26em] text-bone">
            APEX
          </span>
          <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.42em] text-gold">
            // Atelier
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="btn-luxe glass h-10 w-10 rounded-lg"
        >
          <Menu className="h-5 w-5 text-bone" />
        </button>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-glass bg-obsidian md:hidden"
            >
              <div className="flex items-center justify-between border-b border-glass px-6 py-5">
                <div className="flex flex-col leading-none">
                  <span className="font-heading text-[13px] font-bold uppercase tracking-[0.26em] text-bone">
                    APEX
                  </span>
                  <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.42em] text-gold">
                    // Atelier
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="btn-luxe glass h-10 w-10 rounded-lg"
                >
                  <X className="h-5 w-5 text-bone" />
                </button>
              </div>
              <div className="flex-1 px-4 py-6">
                <div className="mb-4 px-4">
                  <span className="label">Navigation</span>
                </div>
                <NavList onNavigate={() => setMobileOpen(false)} />
              </div>
              <div className="px-7 pb-8">
                <div className="mb-3 h-px bg-white/[0.06]" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted/70">
                  Precision Detailing
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
