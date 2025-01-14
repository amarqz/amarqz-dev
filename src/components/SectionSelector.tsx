"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code, ExpandMoreOutlined, School, WorkHistory } from "@/icons";

interface Props {
  dict: any;
}

const SectionSelector = ({ dict }: Props) => {
  const [activeSection, setActiveSection] = useState("experience");
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const sections: {[section: string]: HTMLAnchorElement | null} = {};
  const indicatorRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      const activeRef = sections.experience!;
      const rect = activeRef.getBoundingClientRect();
      if (indicatorRef.current) {
        (indicatorRef.current as HTMLDivElement).style.left = `${rect.left}px`;
        (indicatorRef.current as HTMLDivElement).style.width = `${rect.width}px`;
        (indicatorRef.current as HTMLDivElement).style.height = `${rect.height}px`;
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
  }, []);

  const handleSectionChange = (section: any) => {
    setActiveSection(section);
    setShowMenu(false);

    if (!isMobile) {
      const activeRef = sections[section]!;
      const rect = activeRef.getBoundingClientRect();
      if (indicatorRef.current) {
        (indicatorRef.current as HTMLDivElement).style.left = `${rect.left}px`;
        (indicatorRef.current as HTMLDivElement).style.width = `${rect.width}px`;
        (indicatorRef.current as HTMLDivElement).style.height = `${rect.height}px`;
      }
    }
  };

  return (
    <div className="basis-2/5 sm:basis-1/4 text-center flex gap-6 flex-col lg:flex-row">
      {isMobile ? (
        <div className="flex gap-1">
          <div className="relative">
            <button
              className="bg-subNeutral py-2 px-4 rounded-2xl"
              onClick={() => setShowMenu(!showMenu)}
            >
              {dict.section[activeSection]}{" "}
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
                        className="block py-2 px-4 rounded-lg hover:bg-neutral"
                      >
                        {String(translation)}
                      </a>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-4 max-h-fit">
          {Object.entries(dict.section).map(
            ([section, translation], i: number) => (
              <a
                href={`#${section}`}
                key={i}
                ref={ (ref) => {sections[section] = ref} }
                className="flex gap-1 cursor-pointer z-10 px-4 py-2"
                onClick={() => handleSectionChange(section)}
              >
                {String(translation)}
              </a>
            )
          )}
          <div
            ref={ indicatorRef }
            className="transition-all absolute bg-subNeutral px-4 rounded-xl z-1"
          />
        </div>
      )}
    </div>
  );
};

export default SectionSelector;
