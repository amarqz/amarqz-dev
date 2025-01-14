import type { Metadata } from "next";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import TopBar from "@/components/TopBar";

type Props = {
  params: Promise<{ lang: string }>,
};

export async function generateStaticParams() {
  return [{lang: 'es'}, {lang: 'en'}];
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
  }>
) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <html lang={ params.lang }>
      <body
        className={`antialiased`}
      >
        <TopBar locale={ params.lang }/>
        <div className="h-8 z-20 top-16 sticky bg-background"></div>
        {children}
      </body>
    </html>
  );
}
