export default function Buttons({ handleSetup, handleStep, handleReset }) {
  return (
    <div className="buttons">
      <button onClick={handleSetup}>SETUP</button>
      <button onClick={handleStep}>STEP</button>
      <button onClick={handleReset}>RESET</button>
    </div>
  );
}
