import React, { Dispatch, SetStateAction } from "react";

interface ResetButtonProps {
  setResetClicked: Dispatch<SetStateAction<boolean>>;
  setResetVisible: Dispatch<SetStateAction<boolean>>;
  resetClickFunction: () => void;
}
export const ResetButton: React.FC<ResetButtonProps> = ({
  setResetClicked,
  setResetVisible,
  resetClickFunction,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "12%",
        top: "8%",
      }}
    >
      <button
        style={{
          fontSize: "1rem",
          outline: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px 20px 8px 20px",
        }}
        onClick={() => {
          setResetClicked(true);
          setResetVisible(false);
          resetClickFunction();
        }}
      >
        Reset
      </button>
    </div>
  );
};
