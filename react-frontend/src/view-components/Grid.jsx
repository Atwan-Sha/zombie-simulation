import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

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

  const isRadioactive = (obj) => {
    if (obj === null || Object.keys(obj).length === 0) {
      return "cell";
    } else if (obj.is_radioactive === false) {
      return "cell";
    } else {
      return "cell radioactive";
    }
  };

  return (
    <div className={isRadioactive(obj)} style={objStyle(obj)}>
      <p>{obj === null || Object.keys(obj).length === 0 ? "" : obj.name}</p>
      <img
        className={
          obj === null || Object.keys(obj).length === 0 ? "hide" : "icon"
        }
        src={
          obj === null || Object.keys(obj).length === 0
            ? ""
            : obj.sex === "Female"
            ? femaleIcon
            : maleIcon
        }
      />
    </div>
  );
}
