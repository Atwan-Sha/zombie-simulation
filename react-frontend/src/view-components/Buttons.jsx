export default function Buttons({ buttonVal, handleSetup, handleStep }) {
  return (
    <div className="buttons">
      <button className={buttonVal} onClick={handleSetup}>{buttonVal}</button>
      <button className={buttonVal == "RESET" ? "STEP" : ""} onClick={handleStep}>STEP</button>
    </div>
  );
}
