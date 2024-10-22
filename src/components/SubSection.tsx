import React from "react";
import { LocationOnOutlined, MenuBookOutlined, SchoolOutlined } from '@/icons';

interface Props {
  type: string;
  content: any;
}

const SubSection = ({ type, content }: Props) => {
  switch (type) {
    case "education":
      return (
        <div className="flex flex-col bg-subNeutral rounded-2xl p-6 justify-between">
            <div className="mb-4">
                <h3>{ content.type }</h3>
                <h2>{ content.title }</h2>
            </div>
            <div className="flex flex-col">
                <span className="cardEntry"><LocationOnOutlined />    { content.where }, { content.country }</span>
                <span className="cardEntry italic"><MenuBookOutlined />    { content.thesis }</span>
                <span className="cardEntry"><SchoolOutlined />    { content.score }</span>
            </div>
        </div>
    );
    default:
      return <div>ey</div>;
  }
};

export default SubSection;
