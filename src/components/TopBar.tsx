import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GitHub, Grading, LinkedIn } from "@/icons";
import es from '@/../../public/es.svg';
import en from '@/../../public/en.svg';
import DarkModeButton from "./DarkModeButton";
import SectionSelector from "./SectionSelector";

const TopBar = () => {
  return (
    <div className="h-16 flex justify-between z-30 top-0 bg-neutral text-foreground px-4 sm:px-10 py-4 shadow-lg sticky w-full items-center">
      <SectionSelector />
      <div className="basis-1/5 sm:basis-1/2 text-center text-2xl font-bold">
        amarqz.dev
      </div>
      <div className="basis-2/5 sm:basis-1/4 text-center flex justify-end gap-x-4">
        <Link target="_blank" href={"https://github.com/amarqz"} className="hidden hover:bg-onHover sm:block p-1 rounded-md transition-all"><GitHub /></Link>
        <Link target="_blank" href={"https://linkedin.com/in/antoniomarquezpicon"} className="hidden sm:block hover:bg-onHover p-1 rounded-md transition-all"><LinkedIn /></Link>
        <Link target="_blank" href={"https://www.credly.com/users/antonio-marquez-picon"} className="hidden sm:block hover:bg-onHover p-1 rounded-md transition-all"><Grading /></Link>
        <span className="hidden sm:block bg-secondary w-0.5 rounded"></span>
        <DarkModeButton />
        <div className="hover:bg-onHover p-1 rounded-md transition-all"><Image src={es} alt={'Spanish flag'} className='rounded-lg h-6 w-6 min-w-6'></Image></div>
      </div>
    </div>
  );
};

export default TopBar;