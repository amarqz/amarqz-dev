import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowCircleRight, CalendarMonth, LocationOnOutlined, MenuBookOutlined, OpenInNew, SchoolOutlined } from '@/icons';

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
                  <Link href={ content.link } target="_blank"><OpenInNew className="text-accent hover:text-black dark:hover:text-white transition-all duration-200" /></Link>
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
    default:
      return <div>Blank section</div>;
  }
};

export default SubSection;
