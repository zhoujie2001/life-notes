import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { GlobalAudioPlayer } from '@/components/music/global-audio-player';
import { MusicPlayerProvider } from '@/components/music/music-player-provider';
import { getTracks } from '@/lib/music';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tracks = getTracks();

  return (
    <html lang="zh-CN">
      <body>
        <MusicPlayerProvider tracks={tracks}>
          <SiteHeader />
          <main className="min-h-screen pb-28 pt-20">{children}</main>
          <SiteFooter />
          <GlobalAudioPlayer />
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
