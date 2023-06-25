import React, { Dispatch, SetStateAction } from "react";
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
    <div
      style={{
        position: "absolute",
        right: "1%",
        top: "5%",
        backgroundColor: "white",
      }}
    >
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
            padding: "10px",
            fontWeight: 600,
          }}
          onClick={() => {
            setViewButtonState("front");
          }}
        >
          FRONT VIEW
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            fontWeight: 600,
          }}
          onClick={() => {
            setViewButtonState("top");
          }}
        >
          TOP VIEW
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            fontWeight: 600,
          }}
          onClick={() => {
            setViewButtonState("left");
          }}
        >
          LEFT VIEW
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            fontWeight: 600,
          }}
          onClick={() => {
            setViewButtonState("bird");
          }}
        >
          BIRD VIEW
        </div>
      </div>
    </div>
  );
};
