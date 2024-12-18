import React from "react";
import SubSectionGenerator from "./SubSectionGenerator";
import { getDocumentation } from "@/docs/documentation";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  title: string;
  section: string;
  locale: string;
}

const Section = async ({ title, section, locale }: Props) => {
  const dict = await getDictionary(locale);
  const subsections = await getDocumentation(section, locale);

  return (
    <div className="rounded-3xl bg-neutral h-auto transition-all duration-300 interpolate">
      <h1 className="section top-24 bottom-8 sticky z-10 bg-background py-6 px-6 sm:px-8 rounded-b-3xl">
        {title}
      </h1>
      <SubSectionGenerator subsections={subsections} section={section} dict={dict} />
    </div>
  );
};

export default Section;
