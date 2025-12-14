import { useState } from "react";
import "./App.css";

const KG_TO_LBS = 2.20462;
const MAX_KG = 600;
const MAX_LBS = 1322.77;

// Plate weights (one side)
const PLATE_WEIGHTS_LB = [45, 35, 25, 10, 5];
const PLATE_WEIGHTS_KG = [25, 20, 15, 10, 5, 2.5];

// Barbell weights: value -> {kg, lb}
const BARBELL_WEIGHTS = {
  20: { kg: 20, lb: 45 },
  15: { kg: 15, lb: 33 },
};

// Helper to get plate class name (handles 2.5 -> 2-5)
const getPlateClassName = (weight) => {
  return `plate-${String(weight).replace(".", "-")}`;
};

function App() {
  const [weightKg, setWeightKg] = useState((225 / KG_TO_LBS).toFixed(2));
  const [weightLbs, setWeightLbs] = useState("225");
  const [plateUnits, setPlateUnits] = useState("lb");
  const [barbellWeight, setBarbellWeight] = useState("20");
  const [displayValue, setDisplayValue] = useState("225");
  const [displayUnit, setDisplayUnit] = useState("lbs");
  const [plates, setPlates] = useState([45, 45]);
  const [displayedPlateUnits, setDisplayedPlateUnits] = useState("lb");

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

  const calculatePlates = (weightPerSide, plateWeights) => {
    const result = [];
    let remaining = weightPerSide;

    for (const plateWeight of plateWeights) {
      while (remaining >= plateWeight) {
        result.push(plateWeight);
        remaining -= plateWeight;
      }
    }

    return result;
  };

  const handleCalculate = () => {
    const barbell = BARBELL_WEIGHTS[barbellWeight];

    // Update displayed plate units
    setDisplayedPlateUnits(plateUnits);

    if (plateUnits === "kg") {
      // Calculate in kg
      const totalWeightKg = weightKg ? parseFloat(weightKg) : 0;
      const barbellKg = barbell.kg;

      // Calculate weight per side (total - barbell) / 2
      const weightPerSide = Math.max(0, (totalWeightKg - barbellKg) / 2);

      // Calculate plates needed for one side
      const calculatedPlates = calculatePlates(weightPerSide, PLATE_WEIGHTS_KG);
      setPlates(calculatedPlates);

      // Calculate actual total weight on barbell (plates × 2 + barbell)
      const platesTotal = calculatedPlates.reduce((sum, plate) => sum + plate, 0);
      const actualTotalKg = platesTotal * 2 + barbellKg;

      setDisplayValue(Math.round(actualTotalKg).toString());
      setDisplayUnit("kg");
    } else {
      // Calculate in lbs
      const totalWeightLbs = weightLbs ? parseFloat(weightLbs) : 0;
      const barbellLbs = barbell.lb;

      // Calculate weight per side (total - barbell) / 2
      const weightPerSide = Math.max(0, (totalWeightLbs - barbellLbs) / 2);

      // Calculate plates needed for one side
      const calculatedPlates = calculatePlates(weightPerSide, PLATE_WEIGHTS_LB);
      setPlates(calculatedPlates);

      // Calculate actual total weight on barbell (plates × 2 + barbell)
      const platesTotal = calculatedPlates.reduce((sum, plate) => sum + plate, 0);
      const actualTotalLbs = platesTotal * 2 + barbellLbs;

      setDisplayValue(Math.round(actualTotalLbs).toString());
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
            {plates.map((weight, index) => (
              <div
                key={index}
                className={`plate ${getPlateClassName(weight)} ${displayedPlateUnits === "kg" ? "plate-kg" : ""}`}
              >
                <span className="plate-label">{weight}</span>
              </div>
            ))}
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
                  checked={barbellWeight === "20"}
                  onChange={(e) => setBarbellWeight(e.target.value)}
                />
                <span className="radio-label">
                  {plateUnits === "lb" ? "45lb" : "20kg"}
                </span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="barbell"
                  value="15"
                  className="radio-input"
                  checked={barbellWeight === "15"}
                  onChange={(e) => setBarbellWeight(e.target.value)}
                />
                <span className="radio-label">
                  {plateUnits === "lb" ? "33lb" : "15kg"}
                </span>
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
