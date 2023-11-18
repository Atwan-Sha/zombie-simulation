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
  // * useReducer hook

  let [turn, setTurn] = useState(0); // ? need additional counter state to trigger re-render
  const [grid, dispatch] = useReducer(grid_reducer, []);

  const handleStep = () => {
    setTurn(++turn);
    dispatch({
      type: "update",
    });
  };

  const handleReset = () => {
    setTurn(0);
    dispatch({
      type: "reset",
    });
  };

  return (
    <>
      <h1>Hello Zombies!</h1>
      <p>{turn}</p>
      <button onClick={handleStep}>STEP</button>
      <button onClick={handleReset}>RESET</button>
      <Grid size={10} grid={grid} />
    </>
  );
}
