import React, { Dispatch, SetStateAction } from "react";
import "../viewButtons.css";
interface ViewButtonsStates {
  viewButtonState: "front" | "top" | "left" | "bird";
  setViewButtonState: Dispatch<
    SetStateAction<"front" | "top" | "left" | "bird">
  >;
}

export const ViewButtons: React.FC<ViewButtonsStates> = ({
  viewButtonState,
  setViewButtonState,
}) => {
  return (
    <div className="_container">
      <div className="sub__container__hor">
        <div
          className="cirle"
          onClick={() => {
            setViewButtonState("front");
          }}
        >
          FRONT VIEW
        </div>
        <div
          className="cirle"
          onClick={() => {
            setViewButtonState("top");
          }}
        >
          TOP VIEW
        </div>
        <div
          className="cirle"
          onClick={() => {
            setViewButtonState("left");
          }}
        >
          LEFT VIEW
        </div>
        <div
          className="cirle"
          onClick={() => {
            setViewButtonState("bird");
          }}
        >
          RIGHT VIEW
        </div>
      </div>
    </div>
  );
};
