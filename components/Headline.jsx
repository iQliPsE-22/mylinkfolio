import React from "react";

const Headline = ({ heading, text }) => {
  return (
    <div className="bg-black p-2 lg:p-4">
      <h1 className="julius text-white text-center p-1 text-2xl lg:text-4xl tracking-wider">
        {heading}
      </h1>
      <p className="quicksand text-[#71717a] text-center text-xs lg:text-lg tracking-wide">
        {text}
      </p>
    </div>
  );
};

export default Headline;
