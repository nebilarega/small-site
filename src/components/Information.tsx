import React from "react";

const Information = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
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
          <li>inner height: 91.0in</li>
          <li>inner depth: 36.5in</li>
          <li>inner with: 96.0in</li>
          <li>pocket sum: 273</li>
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
          Pocket in row (rear)
        </div>
        <ul
          style={{ textAlign: "start", fontSize: "0.8rem", fontWeight: "500" }}
        >
          <li>height: 6.0in</li>
          <li>depth: 10.5in</li>
          <li>width: 12.0in</li>
          <li>columns sum: 8</li>
          <li>pockets sum: 104</li>
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
          Pocket in row 2
        </div>
        <ul
          style={{ textAlign: "start", fontSize: "0.8rem", fontWeight: "500" }}
        >
          <li>height: 6.0in</li>
          <li>depth: 10.5in</li>
          <li>width: 12.0in</li>
          <li>columns sum: 7</li>
          <li>pockets sum: 91</li>
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
          <li>columns sum: 6</li>
          <li>pockets sum: 78</li>
        </ul>
      </div>
    </div>
  );
};

export default Information;

// Rack dimensions:
// inner height: 91.0in
// inner depth: 36.5in
// inner with: 96.0in
// pocket sum: 273
// Pocket in row 1 (rear):
// height: 6.0in
// depth: 10.5in
// width: 12.0in
// columns sum: 8
// pockets sum: 104
// Pocket in row 2:
// height: 6.0in
// depth: 10.5in
// width: 12.0in
// columns sum: 7
// pockets sum: 91
// Pocket in row 3:
// height: 6.0in
// depth: 10.5in
// width: 12.0in
// columns sum: 6
// pockets sum: 78
