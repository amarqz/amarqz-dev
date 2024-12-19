import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { getDictionary } from "./dictionaries";
import Section from "@/components/Section";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ lang: string }>,
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  return {
    title: `Portfolio | amarqz.dev`
  }
};

export default async function Home(props: Props) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  const sections = ['experience', 'education', 'projects'];

  return (
    <>
      <div className="flex flex-col px-8 sm:px-12 gap-12">
        { sections.map( (section, i) => 
            <Section key={ i } title={ dict.section[section] } section={ section } locale={ params.lang } />
          )
        }
      </div>
      <Footer />
    </>
  );
}
