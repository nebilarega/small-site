import React, { Dispatch, SetStateAction } from "react";

interface CloseButtonProps {
  setCloseClicked: Dispatch<SetStateAction<boolean>>;
  setCloseVisible: Dispatch<SetStateAction<boolean>>;
}
export const CloseButton: React.FC<CloseButtonProps> = ({
  setCloseClicked,
  setCloseVisible,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
        top: "5%",
      }}
    >
      <button
        style={{
          fontSize: "45px",
          outline: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px 20px 8px 20px",
          borderRadius: "50%",
        }}
        onClick={() => {
          setCloseClicked(true);
          setCloseVisible(false);
        }}
      >
        X
      </button>
    </div>
  );
};
