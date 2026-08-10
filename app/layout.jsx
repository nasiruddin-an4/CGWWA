import { Inter, Outfit } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import LayoutClientWrapper from './LayoutClientWrapper';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Coast Guard Family Welfare Association',
  description: 'Dedicated to Coastal Development, Humanitarian Relief & Social Empowerment'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <LayoutClientWrapper>
            {children}
          </LayoutClientWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}