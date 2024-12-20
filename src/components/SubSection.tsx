import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowCircleRight, CalendarMonth, LocationOnOutlined, Lock, MenuBookOutlined, OpenInNew, SchoolOutlined } from '@/icons';

type Project = {
  role: string,
  dates: string,
  description: Array<string>,
  skills: Array<string>
}

interface Props {
  type: string;
  content: any;
  isHidden: boolean;
  dict?: any;
}

const SubSection = ({ type, content, isHidden, dict }: Props) => {
  switch (type) {
    case "education":
      return (
        <div className={`flex flex-col bg-subNeutral rounded-2xl p-6 justify-between ${ ( content.type.toLowerCase().includes('univ') || !isHidden ) ? '' : 'hidden h-0 p-0'}`}>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3>{ content.type }</h3>
                  <div className="group relative">
                    <Link href={ content.link } target="_blank"><OpenInNew className="text-accent hover:text-black dark:hover:text-white transition-all duration-200" /></Link>
                    <span className="pointer-events-none z-10 absolute w-max -top-9 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-foreground text-background px-2 py-1 rounded-md">{ dict.tooltip.newtab }</span>
                  </div>
                </div>
                <h2>{ content.title }</h2>
            </div>
            <div className="flex flex-col">
                <span className="cardEntry"><CalendarMonth />    { content.date }</span>
                <span className="cardEntry"><LocationOnOutlined />    { content.where }, { content.country }</span>
                <span className="cardEntry italic"><MenuBookOutlined />    { content.thesis }</span>
                <span className="cardEntry"><SchoolOutlined />    { content.score }</span>
            </div>
        </div>
    );
    case "experience":
      return (
        <div className={`flex flex-col bg-subNeutral rounded-2xl p-6 justify-between`}>
            <div className="mb-4">
                <div className="flex items-center gap-3 md:gap-6 mb-4">
                  <h4 className="ml-auto md:ml-0 md:mr-5 order-last md:-order-1">{ content.duration }</h4>
                  <Image src={ content.image.src } alt={ content.image.alt } width={ content.image.width } height={ content.image.height } className="w-8 rounded-md" />
                  <h2>{ content.company }</h2>
                </div>
                <div className="grid grid-cols-3 gap-y-10">
                  { content.projects.map((project: Project, i: number) => (
                    <React.Fragment key={i}>
                      <h3 className="px-1 text-center align-middle border-r-2 md:border-r-4 border-accent mr-3 md:mr-10">{ project.dates }</h3>
                      <div className="col-span-2">
                        <p className="font-bold">{project.role}</p>
                        <div className="flex flex-col">{project.description.map((description: string, i: number) => (
                          <span key={i} className="cardEntry"><ArrowCircleRight />    { description }</span>
                        ))}</div>
                        <p className="mt-3 md:text-xl"><b className="text-accent">{ dict.education.skills }: </b>{ project.skills.join(', ') }</p>
                      </div>
                    </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
      );
    case "projects":
    return (
      <div className={`flex flex-col bg-subNeutral rounded-2xl p-6 justify-between`}>
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6">
          <h4 style={{backgroundColor: `${ content.statusType }`}} className="ml-auto md:ml-0 md:mr-5 order-last md:-order-1">{ content.status }</h4>
          <h2>{ content.name }</h2>
          <div className="group relative">
            { content.url === null ? 
            <Lock className="text-error cursor-not-allowed" /> : 
            <Link href={ content.url } target="_blank" className="md:ml-auto"><OpenInNew className="text-accent hover:text-black dark:hover:text-white transition-all duration-200" /></Link> }
            <span className="pointer-events-none z-10 absolute w-max -top-9 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 bg-foreground text-background px-2 py-1 rounded-md">{ 
            content.url === null ? dict.tooltip.private : dict.tooltip.newtab
            }</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-10 items-center">
            <div className="flex flex-col gap-6">
              <div className="bg-neutral p-6 rounded-2xl flex flex-wrap gap-4 justify-center">
                { Object.entries(content.technologies).map(([tech, color], i: number) => (
                  <h5 key={i} style={{backgroundColor: `${ color }`}}>{ tech }</h5>
                )) }
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col">
              { content.description.map((description: string, i: number) => (
                <span key={i} className="cardEntry"><ArrowCircleRight />    { description }</span>
              )) }
            </div>
        </div>
      </div>
    );
    default:
      return <div>Blank section</div>;
  }
};

export default SubSection;
