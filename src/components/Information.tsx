import React from "react";

interface DetailInfoInterface {
  height: number;
  breadth: number;
  width: number;
  columns: number;
  pockets: number;
}

interface GeneralInfoInterface {
  innerHeight: number;
  innerDepth: number;
  innerWidth: number;
  pocketSum: number;
}

interface Props {
  info: {
    generalInfo: GeneralInfoInterface;
    detailInfo: DetailInfoInterface[];
  };
}
const Information: React.FC<Props> = ({ info }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "15%",
        right: "1%",
        backgroundColor: "white",
        padding: "0.5rem 0.8rem 0.5rem 0",
        boxShadow: "0 0 3x #ccc",
        borderRadius: "10px",
      }}
    >
      <div>
        <div
          className="title"
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            paddingLeft: "1rem",
            textAlign: "start",
          }}
        >
          Rack Dimensions
        </div>
        <ul
          style={{ textAlign: "start", fontSize: "0.8rem", fontWeight: "500" }}
        >
          <li>Inner Height: {info.generalInfo.innerHeight}"</li>
          <li>Inner Depth: {info.generalInfo.innerDepth}"</li>
          <li>Inner Width: {info.generalInfo.innerWidth}"</li>
          <li>Cell Quantity: {info.generalInfo.pocketSum}</li>
        </ul>
      </div>
      {info.detailInfo.map((detailInfo, index) => {
        return (
          <div key={index}>
            <div
              className="title"
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                paddingLeft: "1rem",
                textAlign: "start",
              }}
            >
              Cells In Row {index + 1}
            </div>
            <ul
              style={{
                textAlign: "start",
                fontSize: "0.8rem",
                fontWeight: "500",
              }}
            >
              <li>Height: {detailInfo.height}"</li>
              <li>Depth: {detailInfo.breadth}"</li>
              <li>Width: {detailInfo.width}"</li>
              <li>Columns Quantity: {detailInfo.columns}</li>
              <li>Cells Quantity: {detailInfo.pockets}</li>
            </ul>
          </div>
        );
      })}
      {/* <div>
        <div
          className="title"
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            paddingLeft: "1rem",
            textAlign: "start",
          }}
        >
          Pocket in row 2
        </div>
        <ul
          style={{ textAlign: "start", fontSize: "0.8rem", fontWeight: "500" }}
        >
          <li>height: 6.0in</li>
          <li>depth: 10.5in</li>
          <li>width: 12.0in</li>
          <li>columns quantity: 7</li>
          <li>pockets quantity: 91</li>
        </ul>
      </div>
      <div>
        <div
          className="title"
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            paddingLeft: "1rem",
            textAlign: "start",
          }}
        >
          Pocket in row 3
        </div>
        <ul
          style={{ textAlign: "start", fontSize: "0.8rem", fontWeight: "500" }}
        >
          <li>height: 6.0in</li>
          <li>depth: 10.5in</li>
          <li>width: 12.0in</li>
          <li>columns quantity: 6</li>
          <li>pockets quantity: 78</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Information;
