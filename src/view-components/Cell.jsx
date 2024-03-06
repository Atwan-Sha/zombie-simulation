import { useState } from "react";
import { useRef } from "react";
import { Transition } from "react-transition-group";
import femaleIcon from "../assets/female-icon-50px.png";
import maleIcon from "../assets/male-icon-50px.png";

export default function Cell({ obj, setClassName, empty, inProp }) {
  // ! small size bug

  // let [inProp, setInProp] = useState(true); // ? add switch on grid update
//   console.log(`inProp ${inProp}`);
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `opacity 500ms`,
    opacity: 1,
  };

  const transitionStyles = {
    // entering: { opacity: 1 },
    // entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
  };

  // setInProp(!empty);

  // ! inProp needs switch at time of re-render
  return (
    <>
      {/* <button onClick={() => setInProp(!inProp)}>SW</button> */}
      <Transition nodeRef={nodeRef} in={inProp} timeout={500}>
        {(state) => {
          if (empty) {
            return (
              <div
                className={setClassName("empty")}
                style={{
                  backgroundColor: "#242424",
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
                ref={nodeRef}
              >
                <p>*</p>
              </div>
            );
          } else {
            return (
              <div
                className={setClassName(obj)}
                style={{
                  backgroundColor: obj.color.toLowerCase(),
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
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
