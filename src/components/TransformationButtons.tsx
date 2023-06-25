import React, { Dispatch, SetStateAction } from "react";
import { HiOutlineZoomIn } from "react-icons/hi";
import { HiOutlineZoomOut } from "react-icons/hi";
import { BiRotateLeft } from "react-icons/bi";
import { BiRotateRight } from "react-icons/bi";
import "../transformButton.css";

interface TransformState {
  transformState:
    | null
    | "clockwise"
    | "counterclockwise"
    | "zoomin"
    | "zoomout";
  setTransformState: Dispatch<
    SetStateAction<
      null | "clockwise" | "counterclockwise" | "zoomin" | "zoomout"
    >
  >;
}
export const TransformationButtons: React.FC<TransformState> = ({
  transformState,
  setTransformState,
}) => {
  return (
    <div className="container">
      <div className="sub__container">
        <div
          className="cirle__back"
          onClick={() => {
            setTransformState("zoomin");
          }}
        >
          <HiOutlineZoomIn size={27} />
        </div>
        <div
          className="cirle__back"
          onClick={() => {
            setTransformState("zoomout");
          }}
        >
          <HiOutlineZoomOut size={27} />
        </div>
      </div>
      <div className="sub__container__hor">
        <div
          className="cirle__back"
          onClick={() => {
            setTransformState("clockwise");
          }}
        >
          <BiRotateLeft size={27} />
        </div>
        <div
          className="cirle__back"
          onClick={() => {
            setTransformState("counterclockwise");
          }}
        >
          <BiRotateRight size={27} />
        </div>
      </div>
    </div>
  );
};
