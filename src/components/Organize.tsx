import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { NonCanvas } from "./NonCanvas";
import * as THREE from "three";
import Information from "./Information";
import Fallback from "./Fallback";
import { useParams } from "react-router-dom";
import ModelMap from "../assets/modelMap";
import DataMap from "../assets/dataMaps";
import { CloseButton } from "./CloseButton";
import { TransformationButtons } from "./TransformationButtons";
import { ViewButtons } from "./ViewButtons";
import { ResetButton } from "./ResetButton";

export const Organize = () => {
  const { id } = useParams();
  const modelProps = ModelMap.get(id as string);
  const dataProps = DataMap.get(id as string);
  const [closeVisible, setCloseVisible] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  const [resetVisble, setResetVisible] = useState(false);
  const [resetClicked, setResetClicked] = useState(false);
  const [transformState, setTransformState] = useState<
    null | "clockwise" | "counterclockwise" | "zoomin" | "zoomout"
  >(null);
  const [viewButtonState, setViewButtonState] = useState<
    "front" | "top" | "left" | "bird"
  >("bird");
  const resetClickFunction = () => {};

  return (
    <>
      {modelProps && (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
          {/** @ts-ignore */}
          <Suspense fallback={<Fallback />}>
            <Canvas shadows={true}>
              <fog attach="fog" args={["#ffffff", 0, 20]} />
              <ambientLight args={[0xffffff, 0.1]} />
              <Model
                modelPath={modelProps.modelPath}
                modelType={id as string}
              />
              {/* <gridHelper args={[100, 1000]} position={[0, -0.5, 0]} /> */}
              <NonCanvas
                modelProps={modelProps}
                setCloseVisible={setCloseVisible}
                setResetVisible={setResetVisible}
                setResetClicked={setResetClicked}
                closeClicked={closeClicked}
                resetClicked={resetClicked}
                setCloseClicked={setCloseClicked}
                transformState={transformState}
                setTransformState={setTransformState}
                setViewButtonState={setViewButtonState}
                viewButtonState={viewButtonState}
                dataMap={dataProps}
                resetClickFunction={resetClickFunction}
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
            {resetVisble && (
              <ResetButton
                setResetClicked={setResetClicked}
                setResetVisible={setResetVisible}
                resetClickFunction={resetClickFunction}
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
