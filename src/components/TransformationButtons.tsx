import React, { Dispatch, SetStateAction, Suspense, useState } from "react";
import { HiOutlineZoomIn } from "react-icons/hi";
import { HiOutlineZoomOut } from "react-icons/hi";
import { BiRotateLeft } from "react-icons/bi";
import { BiRotateRight } from "react-icons/bi";

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
    <div style={{ position: "absolute", left: "5%", bottom: "5%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: ".4rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            // fontSize: "50px",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "20px",
            borderRadius: "50%",
          }}
          onClick={() => {
            setTransformState("zoomin");
          }}
        >
          <HiOutlineZoomIn size={27} />
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "20px",
            borderRadius: "50%",
          }}
          onClick={() => {
            setTransformState("zoomout");
          }}
        >
          <HiOutlineZoomOut size={27} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "20px",
            borderRadius: "50%",
          }}
          onClick={() => {
            setTransformState("clockwise");
          }}
        >
          <BiRotateLeft size={27} />
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "20px",
            borderRadius: "50%",
          }}
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
