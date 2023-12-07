import { useState } from "react";
import { useReducer } from "react";
import CounterButton from "./view-components/CounterButton.jsx";
import Grid from "./view-components/Grid.jsx";
import Buttons from "./view-components/Buttons.jsx";
import TEST_GRID from "./models/test-data.js";
import { grid_reducer } from "./models/model.js";
import Sliders from "./view-components/Sliders.jsx";
// import {model, handleClick} from "./controllers/controller.js";

export default function App() {
  console.log("renderApp");
  // ? useEffect hook
  // ? async function
  // ? implement observer pattern

  let [cnt, setCnt] = useState(0);
  const [grid, dispatch] = useReducer(grid_reducer, []);
  let [initPop, setInitPop] = useState(0);
  let [gridSize, setGridSize] = useState(10);

  //* Button handlers
  const handleSetup = () => {
    console.log("-> RUN SETUP");

  };
  const handleStep = () => {
    dispatch({
      type: "update",
      turn: cnt,
    });
    increment(1);
  };
  const increment = (val) => {
    setCnt((cnt += val));
  };
  const handleReset = () => {
    dispatch({
      type: "reset",
    });
    setCnt(0);
  };

  //* Slider handlers
  const handleInitPopChange = (e) => {
    console.log("initial population change");
    setInitPop(e.target.value);
  };
  const handleGridSizeChange = (e) => {
    console.log("grid size change");
    setGridSize(e.target.value);
  };

  return (
    <>
      <h1>Hello Zombies!</h1>
      <p>{cnt}</p>
      <Buttons
        handleSetup={handleSetup}
        handleStep={handleStep}
        handleReset={handleReset}
      />
      <Sliders
        handleInitPopChange={handleInitPopChange}
        initPop={initPop}
        handleGridSizeChange={handleGridSizeChange}
        gridSize={gridSize}
      />
      <Grid size={gridSize} grid={grid} turn={cnt} />
    </>
  );
}
