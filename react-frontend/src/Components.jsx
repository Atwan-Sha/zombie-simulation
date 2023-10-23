import { useState } from "react";
// import { TEST_GRID } from "./testData.js"

export function Button() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={handleClick}>{count}</button>
    </>
  );
}

export function Grid({ gridData }) {
  console.log("render grid...");

  const gridCells = [];
  let key = 0;
  gridData.forEach((row) => {
    row.forEach((obj) => {
      gridCells.push(
        <div
          key={key}
          className="cell"
          style={{
            backgroundColor:
              obj === null || Object.keys(obj).length === 0
                ? "none"
                : obj.color.toLowerCase(),
          }}
        >
          {obj === null || Object.keys(obj).length === 0 ? "" : obj.color}
        </div>
      );
      key++;
    });
  });

  return (
    // generate size of grid from input cfg
    <>
      <div className="grid-container">{gridCells}</div>
    </>
  );
}
