import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { getDictionary } from "./dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  return {
    title: {
      template: "%s | amarqz.dev",
      default: "amarqz.dev",
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      noimageindex: true,
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }>
) {
  const params = await props.params;
  const { children } = props;

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
            try {
              var stored = localStorage.getItem('theme');
              var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
              var theme = stored || (prefersLight ? 'light' : 'dark');
              document.documentElement.dataset.theme = theme;
            } catch (e) {
              document.documentElement.dataset.theme = 'dark';
            }
          })();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
