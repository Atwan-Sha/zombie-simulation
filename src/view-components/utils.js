// * ALL HANDLERS AND UTIL FUNCTIONS...

//* Button handlers
export const handleSetupReset = () => {
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

//* prevGrid handlers
export const isEmpty = (obj) => {
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

export const cloneGrid = (g) => {
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
};

//* step handlers
export const handleStep = () => {
  // handlePrevGrid();
  if (cnt > 0) {
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

export const handleSpeed = () => {
  speed > 8 ? setSpeed(1) : setSpeed(speed * 2);
};

export const increment = (val) => {
  setCnt((cnt += val));
  setInProp(true);
};

//* Slider handlers
// ? reset on change
// ? reason to use TypeScript: expected number for e.target.value but got string
export const handleInitPopChange = (e) => {
  console.log("initial population change", e.target.value);
  setInitPop(Number(e.target.value));
  setResetReminder(true);
};
export const handleGridSizeChange = (e) => {
  console.log("grid size change: ", e.target.value);
  setGridSize(Number(e.target.value));
  setResetReminder(true);
  // setTimeout(handleSetupReset, 500)
};
export const handleMutChanceChange = (e) => {
  console.log("mutation change", e.target.value);
  setMutChance(Number(e.target.value));
  setResetReminder(true);
};
export const handleFoodLimitChange = (e) => {
  console.log("food shortage change", e.target.value);
  setFoodLimit(Number(e.target.value));
  setResetReminder(true);
};

