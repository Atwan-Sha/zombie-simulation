import { useRef } from "react";
import { Transition } from "react-transition-group";
import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

export default function Cell({ size, obj, empty, type, inProp }) {
  // ! small size bug

  // let [inProp, setInProp] = useState(true); // ? add switch on grid update
  //   console.log(`inProp ${inProp}`);
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `opacity 1000ms`,
    opacity: 0.5,
  };

  const transitionStyles = {
    entering: { opacity: 0.5 },
    entered: { opacity: 0.5 },
    exiting: { opacity: 0.5 },
    exited: { opacity: 0 },
  };

  const setClassName = (obj) => {
    let str = "cell ";
    if (size > 10) {
      str += "small ";
    }
    if (obj == "empty") {
      str += `${obj} `;
    } else if (obj.is_radioactive) {
      str += "radioactive ";
    }
    if (type == "prevGrid") {
      str += "prev ";
    }
    return str;
  };

  // ! inProp needs switch at time of re-render
  // ! is the Transition component even necessary??
  return (
    <>
      {/* <button onClick={() => setInProp(!inProp)}>SW</button> */}
      <Transition nodeRef={nodeRef} in={inProp} timeout={10}>
        {(state) => {
          if (empty) {
            return (
              <div
                className={setClassName("empty")}
                style={{ backgroundColor: "#242424" }}
              >
                <p>*</p>
              </div>
            );
          } else {
            return (
              <div
                className={setClassName(obj)}
                style={
                  type == "prevGrid"
                    ? {
                        backgroundColor: obj.color.toLowerCase(),
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }
                    : { backgroundColor: obj.color.toLowerCase() }
                }
                ref={nodeRef}
              >
                <p>{obj.name}</p>
                <img
                  className="icon"
                  src={obj.sex === "Female" ? femaleIcon : maleIcon}
                />
              </div>
            );
          }
        }}
      </Transition>
    </>
  );
}

// function EmptyCell({ setClassName }) {
//   // ! small size bug
//   return (
//     <div
//       // className={"cell empty" + size > 10 ? "small" : ""}
//       className={setClassName("empty")}
//       style={{ backgroundColor: "#242424" }}
//     >
//       <p>.</p>
//     </div>
//   );
// }
