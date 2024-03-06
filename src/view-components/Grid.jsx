import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

import { useState } from "react";
import { useRef } from "react";
import { Transition } from "react-transition-group";
import Cell from "./Cell.jsx";

export default function Grid({ size, grid, transitionReRender, inProp }) {
  console.log("renderGrid");

  // const [prevGrid, setPrevGrid] = useState(grid);

  const setSize = () => {
    const style = {
      gridTemplateRows: `repeat(${size}, 1fr)`,
      gridTemplateColumns: `repeat(${size}, 1fr)`,
    };
    return style;
  };

  const isEmpty = (obj) => {
    if (obj === null) {
      return true;
    } else if (obj === undefined) {
      return true;
    } else if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const setClassName = (obj) => {
    let str = "cell ";
    if (size > 10) {
      str += "small ";
    }
    if (obj == "empty") {
      str += obj;
    } else if (obj.is_radioactive) {
      str += "radioactive";
    }
    return str;
  };

  // ! needs double rendering, save prev. grid
  // let gridCells = [];
  // let key = 0;
  // prevGrid.forEach((row) => {
  //   for (let i = 0; i < row.length; i++) {
  //     if (isEmpty(row[i])) {
  //       // gridCells.push(<EmptyCell key={key} setClassName={setClassName} />);
  //       gridCells.push(
  //         <Cell
  //           key={key}
  //           setClassName={setClassName}
  //           empty={true}
  //           inProp={false} // ? timely switch
  //         />
  //       );
  //     } else {
  //       gridCells.push(
  //         <Cell
  //           key={key}
  //           obj={row[i]}
  //           setClassName={setClassName}
  //           empty={false}
  //           inProp={false} // ? timely switch
  //         />
  //       );
  //     }
  //     key++;
  //   }
  // });

  const gridCells = [];
  let key = 0;
  grid.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (isEmpty(row[i])) {
        // gridCells.push(<EmptyCell key={key} setClassName={setClassName} />);
        gridCells.push(
          <Cell
            key={key}
            setClassName={setClassName}
            empty={true}
            inProp={inProp} // ? timely switch
          />
        );
      } else {
        gridCells.push(
          <Cell
            key={key}
            obj={row[i]}
            setClassName={setClassName}
            empty={false}
            inProp={inProp} // ? timely switch
          />
        );
      }
      key++;
    }
  });

  // transitionReRender()

  return (
    <>
      <div className="grid" style={setSize()}>
        {gridCells}
      </div>
      {/* {transitionReRender()} */}
    </>
  );
}
