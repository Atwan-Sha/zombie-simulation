import { useState } from "react";
import { useRef } from "react";
import { Transition } from "react-transition-group";

export default function TransitionTest() {
  console.log("render TransitionTest");

  let [btnVal, setBtnVal] = useState(1);
  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null);

  const handleTransition = () => {
    setBtnVal(btnVal < 3 ? ++btnVal : 0);
    setInProp(!inProp);
  };

  const defaultStyle = {
    transition: `opacity 1000ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const elements = [];
  let key = 0;
  for (let i = 0; i < btnVal; i++) {
    elements.push(
      <Transition key={key} nodeRef={nodeRef} in={inProp} timeout={1000}>
        {(state) => (
          <div
            className="trans"
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            TRANS
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
