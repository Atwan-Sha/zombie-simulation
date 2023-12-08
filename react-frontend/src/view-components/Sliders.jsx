export default function Sliders({
  handleInitPopChange,
  initPop,
  handleGridSizeChange,
  gridSize,
  handleMutChanceChange,
  mutChance,
  handleFoodLimitChange,
  foodLimit,
}) {
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
      <p>{gridSize}x{gridSize}</p>

      <label htmlFor="mutation_chance">Mutation Chance</label>
      <input
        type="range"
        id="mutation_chance"
        name="mutation_chance"
        min="0"
        max="100"
        value={mutChance}
        onChange={handleMutChanceChange}
      />
      <p>{mutChance}:2%</p>

      <label htmlFor="food_shortage_limit">Food Shortage Limit</label>
      <input
        type="range"
        id="food_shortage_limit"
        name="food_shortage_limit"
        min="0"
        max="1000"
        value={foodLimit}
        onChange={handleFoodLimitChange}
      />
      <p>{foodLimit}500</p>
    </div>
  );
}
