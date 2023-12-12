import { useState } from "react";
import { useReducer } from "react";
import CounterButton from "./view-components/CounterButton.jsx";
import TEST_GRID from "./models/test-data.js";
import Buttons from "./view-components/Buttons.jsx";
import Grid from "./view-components/Grid.jsx";
import Sliders from "./view-components/Sliders.jsx";
import { grid_reducer } from "./models/model.js";

export default function App() {
  console.log("renderApp");
  // ? useEffect hook
  // ? async function
  // ? implement observer pattern

  const [grid, dispatch] = useReducer(grid_reducer, []);
  let [cnt, setCnt] = useState(0);
  let [initPop, setInitPop] = useState(5);
  let [gridSize, setGridSize] = useState(10);
  let [mutChance, setMutChance] = useState(2);
  let [foodLimit, setFoodLimit] = useState(50);

  //* Button handlers
  const handleSetup = () => {
    console.log("-> RUN SETUP");
    dispatch({
      type: "setup",
      cfg: {
        initial_population: initPop,
        grid_size: gridSize,
        mutation_chance: mutChance / 100,
        food_shortage_limit: foodLimit,
      },
    });
    setCnt(1);
  };
  const handleStep = () => {
    dispatch({
      type: "update",
      turn: cnt,
    });
    cnt > 0 ? increment(1) : console.log("Run setup first!");
  };
  const increment = (val) => {
    setCnt((cnt += val));
  };
  const handleReset = () => { //! same as setup
    dispatch({
      type: "reset",
      cfg: {
        initial_population: initPop,
        grid_size: gridSize,
        mutation_chance: mutChance / 100,
        food_shortage_limit: foodLimit,
      },
    });
    setCnt(1);
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
  const handleMutChanceChange = (e) => {
    console.log("mutation change");
    setMutChance(e.target.value);
  };
  const handleFoodLimitChange = (e) => {
    console.log("food shortage change");
    setFoodLimit(e.target.value);
  };

  return (
    <>
      <header>
        <h1>Hello Zombies!</h1>
        <p>TURN {cnt}</p>
      </header>
      <section id="grid_params">
        <Buttons
          handleSetup={handleSetup}
          handleStep={handleStep}
          handleReset={handleReset}
        />
        <Grid size={gridSize} grid={grid} turn={cnt} />
        <Sliders
          handleInitPopChange={handleInitPopChange}
          initPop={initPop}
          handleGridSizeChange={handleGridSizeChange}
          gridSize={gridSize}
          handleMutChanceChange={handleMutChanceChange}
          mutChance={mutChance}
          handleFoodLimitChange={handleFoodLimitChange}
          foodLimit={foodLimit}
        />
      </section>
      <section id="graph">
        <div className="graph"></div>
      </section>
    </>
  );
}
