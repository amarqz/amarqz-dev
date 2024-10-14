import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { getDictionary } from "./dictionaries";
import Section from "@/components/Section";

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
  const sections = ['education', 'experience', 'projects'];

  return (
    <div className="flex flex-col px-12 gap-12">
      { sections.map( (section, i) => 
          <Section key={ i } title={ dict.section[section] } reference={ section } lang={ params.lang } />
        )
      }
    </div>
  );
}
