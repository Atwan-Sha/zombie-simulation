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
    cnt > 0 ? increment(1) : alert("Run SETUP first!");
  };
  const increment = (val) => {
    setCnt((cnt += val));
  };

  //* Slider handlers
  const handleInitPopChange = (e) => {
    console.log("initial population change", e.target.value, typeof e.target.value);
    setInitPop(Number(e.target.value));
  };
  const handleGridSizeChange = (e) => {
    console.log("grid size change: ", e.target.value, typeof e.target.value);
    setGridSize(Number(e.target.value));
  };
  const handleMutChanceChange = (e) => {
    console.log("mutation change", e.target.value, typeof e.target.value);
    setMutChance(Number(e.target.value));
  };
  const handleFoodLimitChange = (e) => {
    console.log("food shortage change", e.target.value, typeof e.target.value);
    setFoodLimit(Number(e.target.value));
  };

  return (
    <>
      <header>
        <h1>Hello Zombies!</h1>
        <p>TURN {cnt}</p>
      </header>
      <section id="grid_params">
        <Buttons
          buttonVal={cnt === 0 ? "SETUP" : "RESET"}
          handleSetup={handleSetup}
          handleStep={handleStep}
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
