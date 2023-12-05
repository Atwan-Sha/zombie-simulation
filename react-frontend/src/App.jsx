import { useState } from "react";
import { useReducer } from "react";
import CounterButton from "./view-components/CounterButton.jsx";
import Grid from "./view-components/Grid.jsx";
import TEST_GRID from "./models/test-data.js";
import { grid_reducer } from "./models/model.js";
// import {model, handleClick} from "./controllers/controller.js";

export default function App() {
  console.log("renderApp");
  // ? useEffect hook
  // ? async function
  // ? implement observer pattern

  let [cnt, setCnt] = useState(0);
  const [grid, dispatch] = useReducer(grid_reducer, []);

  const handleStep = () => {
    dispatch({
      type: "update",
      turn: cnt,
    });
    increment(1);
  };

  const increment = (val) => {
    setCnt(cnt += val);
  }

  const handleReset = () => {
    dispatch({
      type: "reset",
    });
    setCnt(0);
  };

  return (
    <>
      <h1>Hello Zombies!</h1>
      <p>{cnt}</p>
      <button onClick={handleStep}>STEP</button>
      <button onClick={handleReset}>RESET</button>
      <Grid size={10} grid={grid} turn={cnt} />
    </>
  );
}
