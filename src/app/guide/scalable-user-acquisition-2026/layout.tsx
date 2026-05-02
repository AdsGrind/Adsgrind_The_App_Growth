import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scalable User Acquisition in 2026 | CPI & App Growth Guide',
  description: 'Learn how to scale app installs with proven CPI strategies, multi-channel acquisition, and fraud prevention techniques.',
  keywords: ['scalable user acquisition', 'CPI campaigns', 'app install marketing', 'mobile app growth strategy', 'performance marketing'],
  openGraph: {
    title: 'Scalable User Acquisition in 2026 | CPI & App Growth Guide',
    description: 'Learn how to scale app installs with proven CPI strategies, multi-channel acquisition, and fraud prevention techniques.',
    type: 'article',
    url: 'https://adsgrind.com/guide/scalable-user-acquisition-2026',
    images: [
      {
        url: '/images/ua-growth-guide.png',
        width: 1200,
        height: 630,
        alt: 'Scalable User Acquisition 2026 Guide',
      },
    ],
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
