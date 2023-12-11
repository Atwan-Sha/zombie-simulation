import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

export default function Grid({ size, grid, turn }) {
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
        gridCells.push(<EmptyCell key={key} />);
      } else {
        gridCells.push(<Cell key={key} obj={row[i]} />);
      }
      key++;
    }
  });

  return (
    <>
      <div className="grid" style={setSize()}>
        {gridCells}
      </div>
    </>
  );
}

function Cell({ obj }) {
  return (
    <div
      className={obj.is_radioactive ? "cell radioactive" : "cell obj"}
      style={{ backgroundColor: obj.color.toLowerCase() }}
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
    <div className="cell empty" style={{ backgroundColor: "#242424" }}>
      .
    </div>
  );
}
