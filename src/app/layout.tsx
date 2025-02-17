import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';
import { AppProvider } from '@/providers/app';
import { SplashScreenConfig, SplashScreenWrapper } from '@/components/Splash';
import { FiCommand } from 'react-icons/fi';
import { TfiLayoutAccordionList } from 'react-icons/tfi';
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

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const splashConfig: Partial<SplashConfig> = {
  //   themable: true,
  //   backgroundColor: 'bg-slate-50 dark:bg-slate-950',
  //   containerSize: 'w-32 h-32',
  //   containerShape: 'rounded-full',
  //   frequency: 'once-per-session',
  //   // frequency: 'always',
  //   icon: <FiCommand className="text-4xl text-blue-500" />,
  //   message: 'Loading, please wait...',
  //   animation: 'grow',
  //   // animation: 'slide',
  //   displayDuration: 20000,
  // };

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashScreenWrapper splashConfig={splashConfig}>
          <AppProvider>
            <Link href="/playground/box">Playground Box</Link>
            {'  '}
            &nbsp; &nbsp; &nbsp;
            <Link href="/playground/pagemode">Playground Pagemode</Link>
            &nbsp; &nbsp; &nbsp;
            <Link href="/playground/typo">Playground Typography</Link>
            &nbsp; &nbsp; &nbsp;
            <Link href="/demo">Demo</Link>
            &nbsp; &nbsp; &nbsp;
            <Link href="/storybook">Storybook</Link>
            {children}
          </AppProvider>
        </SplashScreenWrapper>
      </body>
    </html>
  );
}
// Path: src/app/layout.tsx
