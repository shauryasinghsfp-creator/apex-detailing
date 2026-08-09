import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  Armchair,
  ArrowRight,
} from 'lucide-react';
import PorscheHero from '@/components/PorscheHero';

const SERVICES = [
  {
    icon: ShieldCheck,
    title: 'Paint Protection Film',
    desc: 'Self-healing, optically clear film that shields your marque from stone chips, swirls, and time itself.',
  },
  {
    icon: Sparkles,
    title: 'Multi-Stage Paint Correction',
    desc: 'Machine-polished micro-imperfections restored to a deep, flawless, mirror-grade gloss.',
  },
  {
    icon: Layers,
    title: 'Ceramic & Graphene Coatings',
    desc: 'Semi-permanent nano-ceramic chemistry engineered for hydrophobic, diamond-hard protection.',
  },
  {
    icon: Armchair,
    title: 'Bespoke Interior Restorations',
    desc: 'Hand-stitched leather, Alcantara, and woodwork returned to factory-fresh, museum-grade condition.',
  },
];

const EASE = [0.16, 1, 0.3, 1];

export default function HomePage() {
  return (
    <>
      <PorscheHero />

      {/* ---------- Services Overview ---------- */}
      <section className="relative mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="label text-gold">Our Craft</span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-bone md:text-5xl">
              Services, Pursued to Perfection
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Every vehicle that enters the atelier is treated as a singular
            commission — measured, documented, and finished to exacting standards.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl border border-glass bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-gold/30"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-bold uppercase tracking-[0.1em] text-bone">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
              <div className="mt-6 h-px w-0 bg-gradient-to-r from-gold to-transparent transition-all duration-700 ease-mechanical group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------- CTA Banner ---------- */}
      <section className="relative mx-auto max-w-6xl px-5 pb-28 md:px-6 md:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="cinematic-vignette relative overflow-hidden rounded-3xl border border-glass bg-gradient-to-br from-panel via-obsidian to-obsidian p-8 text-center md:p-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/[0.08] blur-[100px]" />
          <span className="label text-gold">Begin Your Commission</span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-medium leading-tight text-bone md:text-6xl">
            Experience the <span className="gold-text italic">APEX</span>{' '}
            Difference
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
            Reserve a private consultation and let our senior detailers architect a
            protection and restoration program bespoke to your vehicle.
          </p>
          <Link
            href="/enquire"
            className="btn-luxe group mt-10 gap-3 bg-gold px-8 py-4 text-sm text-obsidian shadow-glowGold hover:bg-gold-soft md:px-10"
          >
            Book Your Appointment
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
