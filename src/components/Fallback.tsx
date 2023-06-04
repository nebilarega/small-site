import React from "react";
import "../supense.css";

const Fallback = () => {
  return (
    <div className="content__container">
      <div className="content">
        <div className="ball red"></div>
        <div className="ball green"></div>
        <div className="ball yellow"></div>
        <div className="ball blue"></div>
        <div className="ball emerald-green"></div>
        <div className="ball pink"></div>
      </div>
    </div>
  );
};

export default Fallback;
