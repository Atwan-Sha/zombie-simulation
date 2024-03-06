import { useState } from "react";
import { useRef } from "react";
import { Transition } from "react-transition-group";

export default function TransitionTest() {
  console.log("render TransitionTest");

  let [btnVal, setBtnVal] = useState(1);
  const [inProp, setInProp] = useState(true);
  console.log(`inProp ${inProp}`);
  const nodeRef = useRef(null);

  const handleTransition = () => {
    setBtnVal(btnVal < 3 ? ++btnVal : 0);
    // setInProp(!inProp);
  };

  const defaultStyle = {
    transition: `opacity 1000ms`,
    opacity: 1,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const inPropVal = (i) => {
    return i == btnVal - 1 ? true : false;
  };

  const elements = [];
  let key = 0;
  for (let i = 0; i < btnVal; i++) {
    elements.push(
      <Transition key={key} nodeRef={nodeRef} in={inPropVal(i)} timeout={1000}>
        {(state) => (
          <div
            className="trans"
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            TRANS {i}
          </div>
        )}
      </Transition>
    );
    key++;
  }

  return (
    <div className="transition">
      <button onClick={handleTransition}>{btnVal}</button>
      {elements}
    </div>
  );
}
