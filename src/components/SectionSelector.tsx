"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code, ExpandMoreOutlined, School, WorkHistory } from "@/icons";

interface Props {
  dict: any;
}

const sectionIcon: { [section: string]: React.JSX.Element } = {
  education: <School />,
  experience: <Code />,
  projects: <WorkHistory />,
};

const SectionSelector = ({ dict }: Props) => {
  const [activeSection, setActiveSection] = useState("experience");
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const sections: { [section: string]: HTMLAnchorElement | null } = {};
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      const activeRef = sections.experience!;
      const rect = activeRef.getBoundingClientRect();
      if (indicatorRef.current) {
        (indicatorRef.current as HTMLDivElement).style.left = `${rect.left}px`;
        (
          indicatorRef.current as HTMLDivElement
        ).style.width = `${rect.width}px`;
        (
          indicatorRef.current as HTMLDivElement
        ).style.height = `${rect.height}px`;
      }
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, sections.experience]);

  const handleSectionChange = (section: any) => {
    setActiveSection(section);
    setShowMenu(false);

    if (!isMobile) {
      const activeRef = sections[section]!;
      const rect = activeRef.getBoundingClientRect();
      if (indicatorRef.current) {
        (indicatorRef.current as HTMLDivElement).style.left = `${rect.left}px`;
        (
          indicatorRef.current as HTMLDivElement
        ).style.width = `${rect.width}px`;
        (
          indicatorRef.current as HTMLDivElement
        ).style.height = `${rect.height}px`;
      }
    }
  };

  return (
    <div className="basis-2/5 sm:basis-1/4 text-center flex gap-6 flex-col lg:flex-row">
      {isMobile ? (
        <div className="flex gap-1">
          <div className="relative">
            <button
              className="flex bg-subNeutral p-2 rounded-2xl min-w-44 justify-center gap-1 hover:bg-onHover transition-all duration-500"
              onClick={() => setShowMenu(!showMenu)}
            >
              { sectionIcon[activeSection] }    {dict.section[activeSection]}{" "}
              <ExpandMoreOutlined
                className={`transition duration-200 ease-in-out ${
                  showMenu ? "rotate-180" : ""
                }`}
              />
            </button>
            {showMenu && (
              <ul className="absolute bg-subNeutral shadow-lg rounded-lg mt-1 p-1 w-full">
                {Object.entries(dict.section).map(
                  ([section, translation], i: number) => (
                    <li key={i}>
                      <a
                        href={`#${section}`}
                        onClick={() => handleSectionChange(section)}
                        className="py-2 pl-3 rounded-lg hover:bg-neutral flex gap-1 transition-all duration-200"
                      >
                        {sectionIcon[section]} {String(translation)}
                      </a>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 max-h-fit">
          {Object.entries(dict.section).map(
            ([section, translation], i: number) => (
              <a
                href={`#${section}`}
                key={i}
                ref={(ref) => {
                  sections[section] = ref;
                }}
                className='flex gap-1 cursor-pointer z-10 px-4 py-2 rounded-xl transition-all duration-500 hover:bg-onHover'
                onClick={() => handleSectionChange(section)}
              >
                {sectionIcon[section]} {String(translation)}
              </a>
            )
          )}
          <div
            ref={indicatorRef}
            className="transition-all absolute bg-subNeutral px-4 rounded-xl z-1"
          />
        </div>
      )}
    </div>
  );
};

export default SectionSelector;
