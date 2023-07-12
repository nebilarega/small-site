import React, { Dispatch, SetStateAction } from "react";
import "../resetButton.css";

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
    <div className="container_2">
      <button
        className="button_info"
        onClick={() => {
          setResetClicked(true);
          setResetVisible(false);
          setCloseClicked(true);
        }}
      >
        RESET
      </button>
    </div>
  );
};
