import { setup, run } from "../models/model.js";

let model = setup();

const handleClick = () => {
  setGrid(run(model, i));
  count(++i);
  console.log("CLICK DEBUG: ", i, model.impl.cfg.grid_size);
};

export {model, handleClick};
