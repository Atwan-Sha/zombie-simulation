export default function Sliders({ handleInitPopChange, initPop, handleGridSizeChange, gridSize }) {

  return (
    <div className="sliders">
      <label htmlFor="initial_population">Initial Population</label>
      <input
        type="range"
        id="initial_population"
        name="initial_population"
        min="1"
        max="50"
        value={initPop}
        onChange={handleInitPopChange}
      />
      <p>{initPop}</p>
      <label htmlFor="grid_size">Grid Size</label>
      <input
        type="range"
        id="grid_size"
        name="grid_size"
        min="10"
        max="100"
        value={gridSize}
        onChange={handleGridSizeChange}
      />
      <p>{gridSize}</p>
    </div>
  );
}
