import React, { Dispatch, SetStateAction, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { NonCanvas } from "./NonCanvas";
import { HiOutlineZoomIn } from "react-icons/hi";
import { HiOutlineZoomOut } from "react-icons/hi";
import { BiRotateLeft } from "react-icons/bi";
import { BiRotateRight } from "react-icons/bi";
import Information from "./Information";
import Fallback from "./Fallback";
import { useParams } from "react-router-dom";
import ModelMap from "../assets/modelMap";
import DataMap from "../assets/dataMaps";

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
interface ViewButtonsStates {
  viewButtonState: "front" | "top" | "left" | "bird";
  setViewButtonState: Dispatch<
    SetStateAction<"front" | "top" | "left" | "bird">
  >;
}

interface CloseButtonProps {
  setCloseClicked: Dispatch<SetStateAction<boolean>>;
  setCloseVisible: Dispatch<SetStateAction<boolean>>;
}

export const Organize = () => {
  const { id } = useParams();
  const modelProps = ModelMap.get(id as string);
  const dataProps = DataMap.get(id as string);

  console.log(dataProps);

  const [closeVisible, setCloseVisible] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  const [transformState, setTransformState] = useState<
    null | "clockwise" | "counterclockwise" | "zoomin" | "zoomout"
  >(null);
  const [viewButtonState, setViewButtonState] = useState<
    "front" | "top" | "left" | "bird"
  >("bird");

  return (
    <>
      {modelProps && (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          {/** @ts-ignore */}
          <Suspense fallback={<Fallback />}>
            <Canvas shadows={true}>
              <fog attach="fog" args={["#ffffff", 0, 20]} />
              <ambientLight />
              <Model
                modelPath={modelProps.modelPath}
                modelType={id as string}
              />
              {/* <gridHelper args={[100, 1000]} position={[0, -0.5, 0]} /> */}
              <NonCanvas
                modelProps={modelProps}
                setCloseVisible={setCloseVisible}
                closeClicked={closeClicked}
                setCloseClicked={setCloseClicked}
                transformState={transformState}
                setTransformState={setTransformState}
                setViewButtonState={setViewButtonState}
                viewButtonState={viewButtonState}
                dataMap={dataProps}
              />
            </Canvas>
          </Suspense>
          <div>
            {closeVisible && (
              <CloseButton
                setCloseClicked={setCloseClicked}
                setCloseVisible={setCloseVisible}
              />
            )}
            <TransformationButtons
              transformState={transformState}
              setTransformState={setTransformState}
            />
            <ViewButtons
              viewButtonState={viewButtonState}
              setViewButtonState={setViewButtonState}
            />
            <Information info={dataProps.info} />
          </div>
        </div>
      )}
    </>
  );
};

const CloseButton: React.FC<CloseButtonProps> = ({
  setCloseClicked,
  setCloseVisible,
}) => {
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

const TransformationButtons: React.FC<TransformState> = ({
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

const ViewButtons: React.FC<ViewButtonsStates> = ({
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
