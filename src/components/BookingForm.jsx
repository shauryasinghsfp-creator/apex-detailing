'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  Mail,
  Car,
  Palette,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const SERVICE_TIERS = [
  { id: 'stage-2-polish', name: 'Stage 2 Polish', desc: 'Advanced paint correction', price: 'from $650' },
  { id: 'full-body-ppf', name: 'Full Body PPF', desc: 'Self-healing film protection', price: 'from $4,900' },
  { id: 'signature-ceramic', name: 'Signature Ceramic', desc: '9H graphene ceramic coat', price: 'from $1,850' },
  { id: 'interior-restore', name: 'Interior Restoration', desc: 'Bespoke cabin renewal', price: 'from $420' },
];

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const EMPTY = {
  clientName: '',
  phone: '',
  email: '',
  carMake: '',
  carModel: '',
  carYear: '',
  carColor: '',
  serviceTier: '',
  preferredDate: '',
  notes: '',
};

const VALIDATORS = {
  clientName: (v) =>
    v.trim().length >= 2 ? '' : 'Please enter your full name.',
  phone: (v) =>
    v.replace(/\D/g, '').length >= 7 ? '' : 'Enter a valid phone number.',
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.',
  carMake: (v) => (v.trim() ? '' : 'Required'),
  carModel: (v) => (v.trim() ? '' : 'Required'),
  carYear: (v) => (v ? '' : 'Select a year'),
  carColor: (v) => (v.trim() ? '' : 'Required'),
  serviceTier: (v) => (v ? '' : 'Select a service tier'),
  preferredDate: (v) => (v ? '' : 'Pick a preferred date'),
};

export default function BookingForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMsg, setServerMsg] = useState('');

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    const err = VALIDATORS[key]?.(value);
    setErrors((e) => ({ ...e, [key]: err || '' }));
  };

  const blurField = (key) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const err = VALIDATORS[key]?.(form[key]);
    setErrors((e) => ({ ...e, [key]: err || '' }));
  };

  const validateAll = () => {
    const next = {};
    Object.keys(VALIDATORS).forEach((k) => {
      const err = VALIDATORS[k]?.(form[k]);
      if (err) next[k] = err;
    });
    setErrors(next);
    setTouched({ ...EMPTY, ...Object.keys(form).reduce((a, k) => ({ ...a, [k]: true }), {}) });
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus('submitting');
    setServerMsg('');
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setServerMsg(data.message || 'Something went wrong. Please try again.');
        if (data.errors) setErrors(data.errors);
      }
    } catch {
      setStatus('error');
      setServerMsg('Network error. Please check your connection and try again.');
    }
  };

  const resetForm = () => {
    setForm(EMPTY);
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  const inputCls = (key) =>
    cn('input-luxe', touched[key] && (errors[key] ? 'invalid' : 'valid'));

  return (
    <div className="relative">
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-glass bg-panel p-10 text-center shadow-card"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10"
              >
                <CheckCircle2 className="h-8 w-8 text-gold" />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-[0.12em] text-bone">
                Enquiry Received
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Thank you, {form.clientName.split(' ')[0]}. Your request has been
                dispatched to the atelier. Our detailers will contact you shortly to
                confirm your appointment.
              </p>
              <button
                onClick={resetForm}
                className="btn-luxe mt-8 w-full justify-center bg-gold px-6 py-3 text-sm text-obsidian hover:bg-gold-soft"
              >
                Return to Form
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* ---------- Client Info ---------- */}
        <fieldset>
          <legend className="label mb-4 flex items-center gap-2 text-gold">
            <User className="h-3.5 w-3.5" /> Client Information
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="clientName" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
                <input
                  id="clientName"
                  value={form.clientName}
                  onChange={(e) => setField('clientName', e.target.value)}
                  onBlur={() => blurField('clientName')}
                  placeholder="Alexander Sterling"
                  className={cn(inputCls('clientName'), 'pl-10')}
                />
              </div>
              {errors.clientName && touched.clientName && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  onBlur={() => blurField('phone')}
                  placeholder="+1 (555) 012-3456"
                  className={cn(inputCls('phone'), 'pl-10')}
                />
              </div>
              {errors.phone && touched.phone && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.phone}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  onBlur={() => blurField('email')}
                  placeholder="you@example.com"
                  className={cn(inputCls('email'), 'pl-10')}
                />
              </div>
              {errors.email && touched.email && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.email}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* ---------- Vehicle Info ---------- */}
        <fieldset>
          <legend className="label mb-4 flex items-center gap-2 text-gold">
            <Car className="h-3.5 w-3.5" /> Vehicle Information
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="carMake" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Make
              </label>
              <input
                id="carMake"
                value={form.carMake}
                onChange={(e) => setField('carMake', e.target.value)}
                onBlur={() => blurField('carMake')}
                placeholder="Porsche"
                className={inputCls('carMake')}
              />
              {errors.carMake && touched.carMake && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.carMake}</p>
              )}
            </div>
            <div>
              <label htmlFor="carModel" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Model
              </label>
              <input
                id="carModel"
                value={form.carModel}
                onChange={(e) => setField('carModel', e.target.value)}
                onBlur={() => blurField('carModel')}
                placeholder="911 GT3 RS"
                className={inputCls('carModel')}
              />
              {errors.carModel && touched.carModel && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.carModel}</p>
              )}
            </div>
            <div>
              <label htmlFor="carYear" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Year
              </label>
              <select
                id="carYear"
                value={form.carYear}
                onChange={(e) => setField('carYear', e.target.value)}
                onBlur={() => blurField('carYear')}
                className={cn(inputCls('carYear'), 'appearance-none')}
              >
                <option value="">Select year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-panel">
                    {y}
                  </option>
                ))}
              </select>
              {errors.carYear && touched.carYear && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.carYear}</p>
              )}
            </div>
            <div>
              <label htmlFor="carColor" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Paint Color
              </label>
              <div className="relative">
                <Palette className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
                <input
                  id="carColor"
                  value={form.carColor}
                  onChange={(e) => setField('carColor', e.target.value)}
                  onBlur={() => blurField('carColor')}
                  placeholder="GT Silver Metallic"
                  className={cn(inputCls('carColor'), 'pl-10')}
                />
              </div>
              {errors.carColor && touched.carColor && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.carColor}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* ---------- Service Tier ---------- */}
        <fieldset>
          <legend className="label mb-4 flex items-center gap-2 text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> Service Tier
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICE_TIERS.map((s) => {
              const selected = form.serviceTier === s.id;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setField('serviceTier', s.id)}
                  className={cn(
                    'relative rounded-xl border p-5 text-left transition-all duration-300 ease-mechanical',
                    selected
                      ? 'border-gold/60 bg-gold/[0.07] shadow-glowGold'
                      : 'border-glass bg-white/[0.02] hover:border-white/20'
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="tier-check"
                      className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-gold"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-obsidian" />
                    </motion.span>
                  )}
                  <h4 className={cn('font-heading text-sm font-bold uppercase tracking-[0.12em]', selected ? 'text-gold' : 'text-bone')}>
                    {s.name}
                  </h4>
                  <p className="mt-1 text-xs text-muted">{s.desc}</p>
                  <span className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {s.price}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.serviceTier && touched.serviceTier && (
            <p className="mt-2 text-[11px] text-guards">{errors.serviceTier}</p>
          )}
        </fieldset>

        {/* ---------- Date & Notes ---------- */}
        <fieldset>
          <legend className="label mb-4 flex items-center gap-2 text-gold">
            <CalendarDays className="h-3.5 w-3.5" /> Preferred Date & Notes
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="preferredDate" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Preferred Date
              </label>
              <input
                id="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={(e) => setField('preferredDate', e.target.value)}
                onBlur={() => blurField('preferredDate')}
                className={cn(inputCls('preferredDate'), 'color-scheme-dark')}
              />
              {errors.preferredDate && touched.preferredDate && (
                <p className="mt-1.5 text-[11px] text-guards">{errors.preferredDate}</p>
              )}
            </div>
            <div>
              <label htmlFor="notes" className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted">
                Special Notes
              </label>
              <textarea
                id="notes"
                rows={1}
                value={form.notes}
                onChange={(e) => setField('notes', e.target.value)}
                placeholder="Optional — e.g. stone chips, swirls, specific finish request…"
                className={cn(inputCls('notes'), 'min-h-[52px] resize-none')}
              />
            </div>
          </div>
        </fieldset>

        {/* ---------- Submit ---------- */}
        {status === 'error' && serverMsg && (
          <div className="rounded-lg border border-guards/40 bg-guards/10 px-4 py-3 text-sm text-bone">
            {serverMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-luxe group w-full justify-center bg-gold px-8 py-4 text-sm text-obsidian shadow-glowGold hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Dispatching to Atelier…
            </>
          ) : (
            <>
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Submit Enquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
