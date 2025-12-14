import { useState } from "react";
import "./App.css";

const KG_TO_LBS = 2.20462;
const MAX_KG = 600;
const MAX_LBS = 1322.77;

function App() {
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [plateUnits, setPlateUnits] = useState("kg");
  const [displayValue, setDisplayValue] = useState("0");
  const [displayUnit, setDisplayUnit] = useState("kg");

  const handleKgChange = (e) => {
    const input = e.target.value;

    // Allow empty input
    if (input === "") {
      setWeightKg("");
      setWeightLbs("");
      return;
    }

    // Only allow valid number patterns (digits, one decimal point)
    if (!/^\d*\.?\d*$/.test(input)) {
      return;
    }

    const kg = parseFloat(input);

    // Validate range
    if (!isNaN(kg)) {
      if (kg < 0) return;
      if (kg > MAX_KG) return;
    }

    setWeightKg(input);
    if (!isNaN(kg)) {
      setWeightLbs((kg * KG_TO_LBS).toFixed(2));
    }
  };

  const handleLbsChange = (e) => {
    const input = e.target.value;

    // Allow empty input
    if (input === "") {
      setWeightKg("");
      setWeightLbs("");
      return;
    }

    // Only allow valid number patterns (digits, one decimal point)
    if (!/^\d*\.?\d*$/.test(input)) {
      return;
    }

    const lbs = parseFloat(input);

    // Validate range
    if (!isNaN(lbs)) {
      if (lbs < 0) return;
      if (lbs > MAX_LBS) return;
    }

    setWeightLbs(input);
    if (!isNaN(lbs)) {
      setWeightKg((lbs / KG_TO_LBS).toFixed(2));
    }
  };

  const handleCalculate = () => {
    if (plateUnits === "kg") {
      const value = weightKg ? parseFloat(weightKg) : 0;
      setDisplayValue(Math.round(value).toString());
      setDisplayUnit("kg");
    } else {
      const value = weightLbs ? parseFloat(weightLbs) : 0;
      setDisplayValue(Math.round(value).toString());
      setDisplayUnit("lbs");
    }
  };

  return (
    <div className="plate-math">
      <h1 className="title">Plate Math</h1>

      {/* Barbell Visualization */}
      <div className="barbell-container">
        <div className="barbell">
          {/* Display */}
          <div className="display">
            <span className="display-value">{displayValue}</span>
            <span className="display-unit">{displayUnit}</span>
            <span className="display-label">TOTAL</span>
          </div>

          {/* Plates */}
          <div className="plates-left">
            <div className="plate plate-45"></div>
            <div className="plate plate-45"></div>
            <div className="plate plate-35"></div>
            <div className="plate plate-25"></div>
            <div className="plate plate-10"></div>
            <div className="plate plate-5"></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <label className="input-label">Enter Weight</label>

        <div className="weight-inputs">
          <div className="input-group">
            <input
              type="text"
              className="weight-input"
              value={weightKg}
              onChange={handleKgChange}
              placeholder=""
            />
            <span className="input-suffix">kg</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              className="weight-input"
              value={weightLbs}
              onChange={handleLbsChange}
              placeholder=""
            />
            <span className="input-suffix">lbs</span>
          </div>
        </div>

        <div className="radio-groups">
          <div className="radio-group">
            <span className="radio-group-label">Plate Units</span>
            <div className="radio-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="plateUnits"
                  value="lb"
                  className="radio-input"
                  checked={plateUnits === "lb"}
                  onChange={(e) => setPlateUnits(e.target.value)}
                />
                <span className="radio-label">LB</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="plateUnits"
                  value="kg"
                  className="radio-input"
                  checked={plateUnits === "kg"}
                  onChange={(e) => setPlateUnits(e.target.value)}
                />
                <span className="radio-label">KG</span>
              </label>
            </div>
          </div>

          <div className="radio-group">
            <span className="radio-group-label">Barbell</span>
            <div className="radio-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="barbell"
                  value="20"
                  className="radio-input"
                  defaultChecked
                />
                <span className="radio-label">20kg</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="barbell"
                  value="15"
                  className="radio-input"
                />
                <span className="radio-label">15kg</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button className="calculate-btn" onClick={handleCalculate}>
        Calculate
      </button>
    </div>
  );
}

export default App;
