import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHub, Grading, LinkedIn } from "@/icons";
import DarkModeButton from "./DarkModeButton";
import SectionSelector from "./SectionSelector";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  locale: string
};

const TopBar = async ( { locale } : Props) => {
  const dict = await getDictionary(locale);

  return (
    <div className="h-16 flex justify-between z-30 top-0 bg-neutral text-foreground px-4 sm:px-10 py-4 shadow-lg sticky w-full items-center select-none">
      <SectionSelector dict={ dict } />
      <div className="flex items-center gap-2">
        <Image src={'/image/logo.png'} width={420} height={420} alt="amarqz.dev logo" className="h-10 w-auto rounded-md" />
        <div className="hidden md:block basis-1/5 sm:basis-1/2 text-center text-2xl font-bold select-none">
          amarqz.dev
        </div>
      </div>
      <div className="basis-2/5 sm:basis-1/4 text-center flex justify-end gap-x-4">
        <Link target="_blank" href={"https://github.com/amarqz"} className="hidden hover:bg-onHover sm:block p-1 rounded-md transition-all"><GitHub /></Link>
        <Link target="_blank" href={"https://linkedin.com/in/antoniomarquezpicon"} className="hidden sm:block hover:bg-onHover p-1 rounded-md transition-all"><LinkedIn /></Link>
        <Link target="_blank" href={"https://www.credly.com/users/antonio-marquez-picon"} className="hidden sm:block hover:bg-onHover p-1 rounded-md transition-all"><Grading /></Link>
        <span className="hidden sm:block bg-secondary w-0.5 rounded"></span>
        <DarkModeButton text={ dict.controls.switchTheme } />
        <div className="group relative">
          <Link href={`/${ dict.controls.switchTo }`}><div className="hover:bg-onHover p-1 rounded-md transition-all"><Image src={`/image/${locale}.svg`} width={"1300"} height={"650"} alt={'Spanish flag'} className='rounded-lg h-6 w-6 min-w-6'></Image></div></Link>
          <span className="pointer-events-none z-10 absolute w-max -bottom-9 right-10 transform translate-x-10 opacity-0 transition-opacity group-hover:opacity-100 bg-foreground text-background px-2 py-1 rounded-md">{ dict.controls.switchLang }</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;