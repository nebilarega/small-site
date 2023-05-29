import React, { Dispatch, SetStateAction, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { NonCanvas } from "./NonCanvas";
import * as THREE from "three";
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
}
interface ViewButtonsStates {
  viewButtonStates: "front" | "top" | "left" | "bird";
}

export const Organize = () => {
  const [closeVisible, setCloseVisible] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  const [transformState, setTransformState] = useState<
    null | "clockwise" | "counterclockwise" | "zoomin" | "zoomout"
  >(null);
  const [viewButtonState, setViewButtonState] = useState<
    "front" | "top" | "left" | "bird"
  >();

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/** @ts-ignore */}
      <Canvas shadows={true} shadowMapType={THREE.PCFSoftShadowMap}>
        {/* <OrbitControls minDistance={0.5} maxDistance={5.1} /> */}
        <fog attach="fog" args={["#ffffff", 0, 20]} />
        <ambientLight />

        {/* <Environment
          files={"./enviroment.674b683b6702c9423a03.hdr"}
          background
        /> */}
        <Model />
        <NonCanvas
          setCloseVisible={setCloseVisible}
          closeClicked={closeClicked}
          setCloseClicked={setCloseClicked}
        />
      </Canvas>
      {closeVisible && (
        <CloseButton
          setCloseClicked={setCloseClicked}
          setCloseVisible={setCloseVisible}
        />
      )}
      <TransformationButtons />
    </div>
  );
};

interface Props {
  setCloseClicked: Dispatch<SetStateAction<boolean>>;
  setCloseVisible: Dispatch<SetStateAction<boolean>>;
}
const CloseButton: React.FC<Props> = ({ setCloseClicked, setCloseVisible }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "5%",
        top: "5%",
        width: "200px",
        height: "200px",
      }}
    >
      <button
        type="submit"
        style={{
          fontSize: "50px",
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

const TransformationButtons = () => {
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
            backgroundColor: "#efefef",
            // fontSize: "50px",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "20px",
            borderRadius: "50%",
          }}
          onClick={() => {}}
        >
          <HiOutlineZoomIn size={27} />
        </div>
        <button
          type="submit"
          style={{
            fontSize: "50px",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 20px 8px 20px",
            borderRadius: "50%",
          }}
          onClick={() => {}}
        >
          X
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
        }}
      >
        <button
          type="submit"
          style={{
            fontSize: "50px",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 20px 8px 20px",
            borderRadius: "50%",
          }}
          onClick={() => {}}
        >
          X
        </button>
        <button
          type="submit"
          style={{
            fontSize: "50px",
            outline: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 20px 8px 20px",
            borderRadius: "50%",
          }}
          onClick={() => {}}
        >
          X
        </button>
      </div>
    </div>
  );
};

const ViewButtons = () => {};
