import { useState } from "react";

export function Button() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={handleClick}>{count}</button>
    </>
  );
}

export function Grid({ getGrid }) {

  const transform = (getGrid) => {
    // transform grid array to html elements
  }

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">1</div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>
        <div className="grid-item">7</div>
        <div className="grid-item">8</div>
        <div className="grid-item">9</div>
      </div>
    </>
  );
}
