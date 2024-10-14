import React from 'react'
import { ArrowDropDown, Code, School, WorkHistory } from '@/icons';


export default function SectionSelector() {
  return (
    <div className="basis-2/5 sm:basis-1/4 text-center flex gap-6">
      <div></div>
      <div className="flex gap-1"><School />Educación</div>
      <div className="flex gap-1"><WorkHistory />Experiencia</div>
      <div className="flex gap-1"><Code />Proyectos</div>
    </div>
  )
};