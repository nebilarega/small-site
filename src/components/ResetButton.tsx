import React, { Dispatch, SetStateAction } from "react";

interface ResetButtonProps {
  setResetClicked: Dispatch<SetStateAction<boolean>>;
  setResetVisible: Dispatch<SetStateAction<boolean>>;
  setCloseClicked: Dispatch<SetStateAction<boolean>>;
}
export const ResetButton: React.FC<ResetButtonProps> = ({
  setResetClicked,
  setResetVisible,
  setCloseClicked,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
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
          setCloseClicked(true);
        }}
      >
        Reset
      </button>
    </div>
  );
};
