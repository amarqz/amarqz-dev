'use client';

import { ExpandLessOutlined, ExpandMoreOutlined } from "@/icons";
import React, { useState } from "react";

interface Props {
  dict: any
}

const SeeMore = ({ dict }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span className="block h-[1px] bg-black"></span>
      <div className="flex items-center justify-center hover:cursor-pointer select-none" onClick={ () => setIsOpen(!isOpen) }>
        <p className="py-4">{ isOpen ? dict.controls.seeLess : dict.controls.seeMore }</p>
        <ExpandMoreOutlined className={`transition duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <span className="block h-[1px] bg-black"></span>
    </div>
  );
};

export default SeeMore;
