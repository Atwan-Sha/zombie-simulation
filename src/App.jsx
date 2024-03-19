import { useState } from "react";
import { useReducer } from "react";
import { useRef } from "react";
import { Transition } from "react-transition-group";

import TEST_GRID from "./models/test-data.js";
import Buttons from "./view-components/Buttons.jsx";
import Grid from "./view-components/Grid.jsx";
import Sliders from "./view-components/Sliders.jsx";
import TransitionTest from "./view-components/TransitionTest.jsx";
import { grid_reducer } from "./models/model.js";
import init_grid from "./models/model.js";
// import * as utils from "./view-components/utils.js";

export default function App() {
  console.log("renderApp");
  // ? useEffect hook
  // ? async function
  // ? implement observer pattern

  // ! sliders lagging for bigger grid renders
  const [grid, dispatch] = useReducer(grid_reducer, init_grid);
  const [prevGrid, setPrevGrid] = useState([]);  //* double render for transition
  let [inProp, setInProp] = useState(true);
  let [cnt, setCnt] = useState(0);
  let [speed, setSpeed] = useState(1);
  let [initPop, setInitPop] = useState(5);
  let [gridSize, setGridSize] = useState(10);
  let [mutChance, setMutChance] = useState(2);
  let [foodLimit, setFoodLimit] = useState(50); // ! slider getting stuck
  let [resetReminder, setResetReminder] = useState(false);

  // //* Button handlers
  const handleSetupReset = () => {
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
    setResetReminder(false);
  };

  // //* prevGrid handlers
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

  const cloneGrid = (g) => {
    let clone = [];
    let rowNr = 0;
    g.forEach((row) => {
      clone.push([]);
      for (let i = 0; i < row.length; i++) {
        if (isEmpty(row[i])) {
          clone[rowNr].push({});
        } else {
          clone[rowNr].push(row[i]);
        }
      }
      rowNr++;
    });
    console.log("cloned grid: ", clone);
    return clone;
  }

  // //* step handlers
  const handleStep = () => {
    // handlePrevGrid();
    if(cnt > 0){
      setPrevGrid(cloneGrid(grid));
    }
    setTimeout(() => {
      setInProp(false);
    }, 100);
  
    dispatch({
      type: "update",
      turn: cnt,
    });
    cnt > 0 ? increment(speed) : alert("Run SETUP first!");
  };

  const handleSpeed = () => {
    speed > 8 ? setSpeed(1) : setSpeed(speed * 2);
  };

  const increment = (val) => {
    setCnt((cnt += val));
    setInProp(true);
  };


  // //* Slider handlers
  // ? reset on change
  // ? reason to use TypeScript: expected number for e.target.value but got string
  const handleInitPopChange = (e) => {
    console.log("initial population change", e.target.value);
    setInitPop(Number(e.target.value));
    setResetReminder(true);
  };
  const handleGridSizeChange = (e) => {
    console.log("grid size change: ", e.target.value);
    setGridSize(Number(e.target.value));
    setResetReminder(true);
    // setTimeout(handleSetupReset, 500)
  };
  const handleMutChanceChange = (e) => {
    console.log("mutation change", e.target.value);
    setMutChance(Number(e.target.value));
    setResetReminder(true);
  };
  const handleFoodLimitChange = (e) => {
    console.log("food shortage change", e.target.value);
    setFoodLimit(Number(e.target.value));
    setResetReminder(true);
  };

  return (
    <>
      <header>
        <h1>Hello Zombies!</h1>
        <p>TURN {cnt}</p>
      </header>
      <section id="grid_params">
        {cnt === 0 ? handleSetupReset() : console.log(cnt)}
        <Buttons
          buttonVal={cnt === 0 ? "SETUP" : "RESET"}
          handleSetupReset={handleSetupReset}
          handleStep={handleStep}
          speed={speed}
          handleSpeed={handleSpeed}
        />
        {/* <TransitionTest/> */}
        {console.log("render prevGrid")}
        <Grid
          type={"prevGrid"}
          size={gridSize}
          grid={prevGrid}
          inProp={inProp}
        />
        <Grid
          type={"grid"}
          size={gridSize}
          grid={grid}
          inProp={true}
        />
        <Sliders
          handleInitPopChange={handleInitPopChange}
          initPop={initPop}
          handleGridSizeChange={handleGridSizeChange}
          gridSize={gridSize}
          handleMutChanceChange={handleMutChanceChange}
          mutChance={mutChance}
          handleFoodLimitChange={handleFoodLimitChange}
          foodLimit={foodLimit}
          showResetReminder={resetReminder}
        />
      </section>
      <section id="graph">
        <div className="graph"></div>
      </section>
    </>
  );
}
