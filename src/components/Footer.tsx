import React from "react";

const Footer = () => {
  const date = new Date();

  return (
    <div className="mt-16 py-5 bg-neutral flex flex-col items-center">
      <span className="text-accent font-bold">by amarqz.dev</span>
      <p className="text-accent">2023-{ date.getFullYear() }</p>
    </div>
  );
};

export default Footer;
