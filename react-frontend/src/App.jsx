import { useState } from "react";
import CounterButton from "./view-components/CounterButton.jsx";
import Grid from "./view-components/Grid.jsx";
import TEST_GRID from "./models/test-data.js";
// import { setup, run } from "./models/model.js";
import {model, handleClick} from "./controllers/controller.js";
// ! fix proper imports for MVC pattern

export default function App() {
  // ? add test step-button for state change
  // ? useEffect hook
  // ? async function

  // const [isModel, setModel] = useState(false);
  const [grid, setGrid] = useState([]);
  let [i, count] = useState(0);
  // ! implement observer pattern

  // let model;
  // if(!isModel) {
  //   model = setup();
  //   setModel(true);
  //   console.log('Model Set', model);
  // }

  // const handleClick = () => {
  //   setGrid(run(model, i));
  //   count(++i);
  //   console.log('CLICK DEBUG: ', i, model.impl.cfg.grid_size);
  // };

  return (
    <>
      <h1>Hello Zombies!</h1>
      <button onClick={handleClick}>STEP</button>
      <Grid gridSize={model.impl.cfg.grid_size} gridData={grid} />
    </>
  );
}
