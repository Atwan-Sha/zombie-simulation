import Cell from "./Cell.jsx";

export default function Grid({ size, grid, type, inProp }) {
  console.log("renderGrid");

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

  const gridCells = [];
  let key = 0;
  grid.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (isEmpty(row[i])) {
        gridCells.push(
          <Cell
            key={key}
            size={size}
            empty={true}
            type={type}
            inProp={inProp} // ? timely switch
          />
        );
      } else {
        gridCells.push(
          <Cell
            key={key}
            size={size}
            obj={row[i]}
            empty={false}
            type={type}
            inProp={inProp} // ? timely switch
          />
        );
      }
      key++;
    }
  });

  return (
    <>
      <div className={type} style={setSize()}>
        {gridCells}
      </div>
    </>
  );
}
