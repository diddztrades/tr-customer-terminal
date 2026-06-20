import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Traders Reality Market Terminal',
  description: 'Professional market intelligence and trading setups for serious traders',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-tr-black text-tr-white">
        <div className="min-h-screen tr-grid-bg">{children}</div>
      </body>
    </html>
  );
}
