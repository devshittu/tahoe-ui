// File: src/app/layout.tsx

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css'; // Corrected path to globals.css
import { AppProvider } from '@/providers/app';
import { SplashScreenConfig, SplashScreenWrapper } from '@/components/Splash';
import { TfiLayoutAccordionList } from 'react-icons/tfi';
import 'prismjs/themes/prism-tomorrow.css'; // Import a Prism theme globally for syntax highlighting
import { ThemeProviders } from '@/providers/theme-provider'; // Import the new ThemeProviders wrapper
import ThemeToggle from '@/components/Theme/theme-toggle';

// import DocsPageLayout from '@/components/DocsPageLayout/DocsPageLayout'; // Uncomment if needed

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Metadata for the page, important for SEO and browser tabs
export const metadata: Metadata = {
  title: 'Tahoe UI - Design System',
  description: 'A futuristic UI library for React components.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const splashConfig: Partial<SplashScreenConfig> = {
    // logoImage: '/custom-logo.png',
    svgIcon: <TfiLayoutAccordionList />,
    logoColor: 'text-blue-500',
    enableGrowingAnimation: true,
    animationDuration: '3s',
    animationEasing: 'ease-in-out',
    colorPreset: 'purple',
    backgroundColor: 'bg-white dark:bg-gray-900',
    text: 'Loading the magic...',
    textColor: 'accent',
  };
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning added for next-themes */}
      <head>
        {/* Tailwind CSS CDN is generally not needed if you're using PostCSS/Webpack in Next.js.
          It's included here for immediate preview functionality within the immersive environment. */}
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
        {/* Custom scrollbar styles and animations are now in globals.css */}
      </head>
      {/* Apply the Geist fonts and global dark mode classes */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        {/* ThemeProviders wraps the entire application to provide theme context */}
        <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
          <SplashScreenWrapper splashConfig={splashConfig}>
            {/* ThemeToggle component placed outside AppProvider but within ThemeProvider context */}
            <div className="fixed top-4 right-4 z-[60]">
              <ThemeToggle />
            </div>

            <AppProvider>{children}</AppProvider>
          </SplashScreenWrapper>
        </ThemeProviders>
      </body>
    </html>
  );
}

// src/app/layout.tsx
