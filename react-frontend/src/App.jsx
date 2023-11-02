import { CounterButton, Grid } from "./view-components/Components.jsx";
import TEST_GRID from "./models/test-data.js";

export default function App() {
  return (
    <>
      <h1>Hello Zombies!</h1>
      <CounterButton />
      <Grid gridData={TEST_GRID} />
    </>
  );
}
