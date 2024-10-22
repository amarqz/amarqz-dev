import React from "react";
import SubSection from "./SubSection";
import { getDocumentation } from "@/docs/documentation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import SeeMore from "./SeeMore";

interface Props {
  title: string;
  section: string;
  locale: string;
}

const Section = async ({ title, section, locale }: Props) => {
  const dict = await getDictionary(locale);
  const subsections = await getDocumentation(section, locale);

  return (
    <div className="rounded-3xl bg-neutral">
      <h1 className="section top-24 bottom-8 sticky z-10 bg-background py-6 px-6 sm:px-8 rounded-b-3xl">
        {title}
      </h1>
      <div className="bg-neutral p-6 sm:p-8 rounded-3xl grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 gap-6">
        {Object.values(subsections).map((subsection, i) => (
          <SubSection key={i} type={section} content={subsection} />
        ))}
      </div>
      <div className="pb-6 px-6 sm:pb-8 sm:px-8">
        {section === "education" && <SeeMore dict={ dict } />}
      </div>
    </div>
  );
};

export default Section;
