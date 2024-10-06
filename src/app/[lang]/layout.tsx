import type { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { getDictionary } from "./dictionaries";

type Props = {
  params: { lang: string },
};

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateStaticParams() {
  return [{lang: 'es'}, {lang: 'en'}];
};

export async function generateMetadata(
  { params } : Props,
  parent: ResolvingMetadata
) : Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  
  return {
    title: {
      template: '%s | amarqz.dev',
      default: 'amarqz.dev',
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      noimageindex: true
    }
  }
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dict = await getDictionary(params.lang);
  return (
    <html lang={ params.lang }>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
