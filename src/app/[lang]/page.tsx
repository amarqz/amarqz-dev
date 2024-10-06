import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { getDictionary } from "./dictionaries";

type Props = {
  params: { lang: string },
};

export async function generateMetadata(
  { params } : Props,
  parent: ResolvingMetadata
) : Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    title: `Portfolio | amarqz.dev`
  }
};

export default async function Home({ params }: Props) {
  const dict = await getDictionary(params.lang);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      { dict.test }
    </div>
  );
}
