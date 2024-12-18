import React from "react";
import Link from "next/link";
import { CalendarMonth, LocationOnOutlined, MenuBookOutlined, OpenInNew, SchoolOutlined } from '@/icons';

interface Props {
  type: string;
  content: any;
  isHidden: boolean;
}

const SubSection = ({ type, content, isHidden }: Props) => {
  switch (type) {
    case "education":
      return (
        <div className={`flex flex-col bg-subNeutral rounded-2xl p-6 justify-between ${ ( content.type.toLowerCase().includes('univ') || !isHidden ) ? '' : 'hidden h-0 p-0'}`}>
            <div className="mb-4">
                <div className="flex justify-between">
                  <h3 className="p-1">{ content.type }</h3>
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
                o
            </div>
        </div>
      );
    default:
      return <div>Blank section</div>;
  }
};

export default SubSection;
