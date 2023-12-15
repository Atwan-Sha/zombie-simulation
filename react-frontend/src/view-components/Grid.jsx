import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

export default function Grid({ size, grid }) {
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

  const gridCells = [];
  let key = 0;
  grid.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (isEmpty(row[i])) {
        gridCells.push(<EmptyCell key={key} setClassName={setClassName} />);
      } else {
        gridCells.push(<Cell key={key} obj={row[i]} setClassName={setClassName} />);
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

function Cell({ obj, setClassName }) {
  // ! small size bug
  return (
    <div
      // className={"cell" + obj.is_radioactive ? "radioactive" : "" + size > 10 ? "small" : ""}
      className={setClassName(obj)}
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

function EmptyCell({ setClassName }) {
  // ! small size bug
  return (
    <div
      // className={"cell empty" + size > 10 ? "small" : ""}
      className={setClassName("empty")}
      style={{ backgroundColor: "#242424" }}
    >
      <p>.</p>
    </div>
  );
}
