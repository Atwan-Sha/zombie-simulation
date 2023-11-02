export default function Grid({ gridData }) {
  console.log("render grid...");

  const objStyle = (obj) => {
    const style = {
      backgroundColor:
        obj === null || Object.keys(obj).length === 0
          ? "none"
          : obj.color.toLowerCase(),
    };
    return style;
  };

  const gridCells = [];
  let key = 0;
  gridData.forEach((row) => {
    row.forEach((obj) => {
      gridCells.push(
        <div key={key} className="cell" style={objStyle(obj)}>
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
