import WorkGallery from '@/components/WorkGallery';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export const metadata = {
  title: 'Our Work — APEX DETailing // Atelier',
  description:
    'A curated portfolio of luxury car detailing commissions — PPF, paint correction, and ceramic coatings on the world\'s finest supercars.',
};

export default function OurWorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-28 pt-28 md:pt-32">
      {/* Header */}
      <header className="mb-14">
        <span className="label text-gold">The Portfolio</span>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-bone md:text-6xl">
          Our Work
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          A selection of recent commissions — each vehicle documented from intake to
          reveal, celebrating the quiet precision of a mirror finish.
        </p>
      </header>

      {/* Before / After */}
      <section className="mb-24">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <span className="label text-gold">The Transformation</span>
            <h2 className="mt-3 font-display text-3xl font-medium text-bone md:text-4xl">
              Before / After
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Drag the slider to reveal the difference between raw, swirled paint and a
            fully corrected, ceramic-coated finish.
          </p>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* Filterable gallery */}
      <section>
        <div className="mb-8">
          <span className="label text-gold">Commissions</span>
          <h2 className="mt-3 font-display text-3xl font-medium text-bone md:text-4xl">
            Selected Projects
          </h2>
        </div>
        <WorkGallery />
      </section>
    </div>
  );
}
