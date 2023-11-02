export default function Grid({ gridSize, gridData }) {
  console.log("render grid...");

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
      gridCells.push(<Cell key={key} obj={obj} />);
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
  const objStyle = (obj) => {
    const style = {
      backgroundColor:
        obj === null || Object.keys(obj).length === 0
          ? "none"
          : obj.color.toLowerCase(),
    };
    return style;
  };

  return (
    <div className="cell" style={objStyle(obj)}>
      {obj === null || Object.keys(obj).length === 0 ? "" : obj.color}
    </div>
  );
}
