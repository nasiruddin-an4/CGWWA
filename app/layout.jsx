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
  description: 'Dedicated to Coastal Development, Humanitarian Relief & Social Empowerment',
  icons: {
    icon: 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248712/cgfwa/englishLogo_yztxt4.png',
  },
  openGraph: {
    title: 'Coast Guard Family Welfare Association',
    description: 'Dedicated to Coastal Development, Humanitarian Relief & Social Empowerment',
    images: [
      {
        url: 'https://res.cloudinary.com/armmzmyq/image/upload/v1787248712/cgfwa/englishLogo_yztxt4.png',
        width: 800,
        height: 600,
        alt: 'CGFWA Logo',
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <LayoutClientWrapper>
            {children}
          </LayoutClientWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}