"use client";

import React, { useState } from "react";
import SubSection from "./SubSection";
import SeeMore from "./SeeMore";

interface Props {
  subsections: object;
  section: string;
  dict: object;
}

const SubSectionGenerator = ({ subsections, section, dict }: Props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      <div className="bg-neutral p-6 sm:p-8 rounded-3xl grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 gap-6">
        {Object.values(subsections).map((subsection, i) => (
          <SubSection
            key={i}
            type={section}
            content={subsection}
            isHidden={isHidden}
          />
        ))}
      </div>
      <div className="pb-6 px-6 sm:pb-8 sm:px-8">
        {section === "education" && (
          <SeeMore dict={dict} setState={() => setIsHidden(!isHidden) } />
        )}
      </div>
    </>
  );
};

export default SubSectionGenerator;
