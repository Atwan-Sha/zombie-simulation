import CounterButton from "./view-components/CounterButton.jsx";
import Grid from "./view-components/Grid.jsx";
import TEST_GRID from "./models/test-data.js";

export default function App() {
  return (
    <>
      <h1>Hello Zombies!</h1>
      <CounterButton />
      <Grid gridSize={10} gridData={TEST_GRID} />
    </>
  );
}
