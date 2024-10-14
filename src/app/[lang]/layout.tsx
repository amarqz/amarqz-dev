import type { Metadata, ResolvingMetadata } from "next";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import TopBar from "@/components/TopBar";

type Props = {
  params: { lang: string },
};

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
        className={`antialiased`}
      >
        <TopBar />
        {children}
      </body>
    </html>
  );
}
