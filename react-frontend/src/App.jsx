import { Button, Grid } from "./Components.jsx";
import TEST_GRID from "./testData.js";

function App() {
  return (
    <>
      <h1>Hello Zombies!</h1>
      <Button />
      <Grid gridData={TEST_GRID} />
    </>
  );
}

export default App;
