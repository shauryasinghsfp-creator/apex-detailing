import BookingForm from '@/components/BookingForm';
import { Clock, MapPin, Phone } from 'lucide-react';

export const metadata = {
  title: 'Enquire — APEX DETailing // Atelier',
  description:
    'Book a private consultation with APEX DETAILING // Atelier. Submit your vehicle and service details for a bespoke detailing program.',
};

const INFO = [
  {
    icon: Clock,
    title: 'By Appointment',
    label: 'Mon – Sat · 9:00 – 19:00',
  },
  {
    icon: MapPin,
    title: 'The Atelier',
    label: 'Private Studio · On Request',
  },
  {
    icon: Phone,
    title: 'Concierge',
    label: '+1 (555) 010-0000',
  },
];

export default function EnquirePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 md:px-6 md:pt-32">
      {/* Header */}
      <header className="mb-14">
        <span className="label text-gold">Begin Your Commission</span>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-bone md:text-6xl">
          Enquire &amp; Book
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Share the details of your vehicle and desired treatment. Our detailers will
          review your enquiry and respond with a tailored proposal and availability.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Form */}
        <div className="glass rounded-2xl p-5 md:p-10">
          <BookingForm />
        </div>

        {/* Side info */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-4">
            {INFO.map(({ icon: Icon, title, label }) => (
              <div
                key={title}
                className="glass flex items-start gap-4 rounded-xl p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-bone">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{label}</p>
                </div>
              </div>
            ))}

            <div className="glass rounded-xl p-5">
              <p className="text-xs leading-relaxed text-muted">
                <span className="font-semibold text-gold">Note:</span> your enquiry is
                dispatched directly to the atelier&rsquo;s concierge. A senior detailer
                typically responds within one business day.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
