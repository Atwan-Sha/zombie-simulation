import './App.css';
import Model from "./Model.js";

function renderRow(row){
  return (
    <>
      <div>{String(row)}</div>
      <br></br>
    </>
  );
}

function renderGrid(grid){
  let r = [];
  for (let row of grid) {
    r += renderRow(row);
  }
  return r;
}

let grid = Model();


function App() {
  return (
    <>
      <p>Test render grid...</p>
      <div>{renderGrid(grid)}</div>
      
    </>
  );
}

export default App;
