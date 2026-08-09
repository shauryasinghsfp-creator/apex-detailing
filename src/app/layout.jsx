import '../styles/globals.css';
import SidebarNav from '@/components/SidebarNav';
import { cn } from '@/lib/cn';

export const metadata = {
  title: 'APEX DETAILING // Atelier — Precision Detailing for the World\'s Finest Automobiles',
  description:
    'A sovereign luxury car detailing studio. Paint protection film, multi-stage paint correction, ceramic & graphene coatings, and bespoke interior restorations.',
  keywords: [
    'luxury car detailing',
    'PPF',
    'paint correction',
    'ceramic coating',
    'Porsche detailing',
    'high-end detail studio',
  ],
  openGraph: {
    title: 'APEX DETAILING // Atelier',
    description:
      'Precision detailing for the world\'s finest automobiles. Book a private consultation.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian text-bone antialiased">
        <SidebarNav />
        <main className="md:pl-[248px]">{children}</main>
      </body>
    </html>
  );
}
