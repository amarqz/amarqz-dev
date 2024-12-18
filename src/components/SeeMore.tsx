'use client';

import { ExpandLessOutlined, ExpandMoreOutlined } from "@/icons";
import React, { useState } from "react";

interface Props {
  dict: any,
  setState: Function
}

const SeeMore = ({ dict, setState }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
    setState();
  };

  return (
    <div>
      <span className="block h-[1px] bg-gradient-to-r from-indigo-500 via-accent to-pink-500"></span>
      <div className="flex items-center justify-center hover:cursor-pointer select-none" onClick={ () => toggleIsOpen() }>
        <p className="py-4">{ isOpen ? dict.controls.seeLess : dict.controls.seeMore }</p>
        <ExpandMoreOutlined className={`transition duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <span className="block h-[1px] bg-gradient-to-r from-indigo-500 via-accent to-pink-500"></span>
    </div>
  );
};

export default SeeMore;
