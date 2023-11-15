import { useState } from "react";
import CounterButton from "./view-components/CounterButton.jsx";
import Grid from "./view-components/Grid.jsx";
import TEST_GRID from "./models/test-data.js";
import { setup, run } from "./models/model.js";
// import {model, handleClick} from "./controllers/controller.js";
// ! fix proper imports for MVC pattern

// ? react hooks or just outer-scope variables?
// const model = setup();
// let grid = [];
// let i = 0;

export default function App() {
  console.log("RENDER APP");
  // ? add test step-button for state change
  // ? useEffect hook
  // ? async function
  // ? implement observer pattern
  // * useReducer hook

  const [model, setModel] = useState(setup);
  const [grid, setGrid] = useState([]);
  let [i, count] = useState(0);

  const handleStep = () => {
    setGrid(run(model, i));
    count(++i);
    console.log("CLICK DEBUG: ", i, model.impl.cfg.grid_size);
  };

  const handleReset = () => {
    setModel(setup());
    setGrid([]);
    count(0);
    console.log("=========== RESET =============");
  }


  return (
    <>
      <h1>Hello Zombies!</h1>
      <button onClick={handleStep}>STEP</button>
      <button onClick={handleReset}>RESET</button>
      <Grid gridSize={model.impl.cfg.grid_size} gridData={grid} />
    </>
  );
}
