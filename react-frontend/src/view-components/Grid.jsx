import { useState } from "react";
import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

export default function Grid({ gridSize, gridData }) {
  console.log("render grid...");

  // const [grid, setGrid] = useState([]);
  // setGrid(gridData);


  const getGridSize = (size) => {
    const style = {
      gridTemplateRows: `repeat(${size}, 1fr)`,
      gridTemplateColumns: `repeat(${size}, 1fr)`,
    };
    return style;
  };

  const gridCells = [];
  let key = 0;
  gridData.forEach((row) => {
    row.forEach((obj) => {
      if (obj === null || Object.keys(obj).length === 0) {
        gridCells.push(<EmptyCell key={key} />);
      } else {
        gridCells.push(<Cell key={key} obj={obj} />);
      }
      key++;
    });
  });

  return (
    // generate size of grid from input cfg, modify style prop
    <>
      <div className="grid-container" style={getGridSize(gridSize)}>
        {gridCells}
      </div>
    </>
  );
}

function Cell({ obj }) {
  return (
    <div
      className={obj.is_radioactive ? "cell radioactive" : "cell"}
      style={{backgroundColor: obj.color.toLowerCase()}}
    >
      <p>{obj.name}</p>
      <img
        className="icon"
        src={obj.sex === "Female" ? femaleIcon : maleIcon}
      />
    </div>
  );
}

function EmptyCell() {
  return (
    <div className="cell" style={{ backgroundColor: "none" }}>
      ---
    </div>
  );
}
