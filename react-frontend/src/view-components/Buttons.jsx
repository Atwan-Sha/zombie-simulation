export default function Buttons({ buttonVal, handleSetupReset, handleStep, speed, handleSpeed }) {
  return (
    <div className="buttons">
      <button className={buttonVal} onClick={handleSetupReset}>
        {buttonVal}
      </button>
      <button
        className={buttonVal == "RESET" ? "STEP" : ""}
        onClick={handleStep}
      >
        STEP
      </button>
      <button onClick={handleSpeed}>
        {speed}X
      </button>
    </div>
  );
}
