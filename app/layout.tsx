import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { navItems } from '@/data';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Peter Elishea Abdelaty Awad - Frontend Developer',
  description:
    'Frontend Developer with 4+ years of experience specializing in React, Next.js, and TypeScript. Building modern, performant web applications with Tailwind CSS and ShadCN/UI. Based in Cairo, Egypt.',
  keywords: [
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'ShadCN/UI',
    'Cairo',
    'Egypt',
    'Web Development',
    'React Query',
    'Zustand',
  ],
  authors: [{ name: 'Peter Elishea Abdelaty Awad' }],
  creator: 'Peter Elishea Abdelaty Awad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://peterawad.com',
    title: 'Peter Elishea Abdelaty Awad - Frontend Developer',
    description:
      'Frontend Developer with 4+ years of experience specializing in React, Next.js, and TypeScript. Building modern, performant web applications.',
    siteName: 'Peter Awad Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Peter Awad - Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peter Elishea Abdelaty Awad - Frontend Developer',
    description:
      'Frontend Developer specializing in React, Next.js, and TypeScript. Building modern, performant web applications.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://peterawad.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Peter Elishea Abdelaty Awad',
    jobTitle: 'Frontend Developer',
    url: 'https://peterawad.com',
    email: 'peterelishea@gmail.com',
    telephone: '+201551635180',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressCountry: 'Egypt',
    },
    sameAs: [
      'https://www.linkedin.com/in/peterawad2',
      'https://github.com/PeterAwad1',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Modern Academy for Engineering and Technology',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Frontend Development',
      'Web Development',
      'React Query',
      'Zustand',
    ],
  };

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <FloatingNav navItems={navItems} />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
