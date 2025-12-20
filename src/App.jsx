import { useState } from "react";
import "./App.css";
import BarbellVisualization from "./components/BarbellVisualization";
import CalculatorForm from "./components/CalculatorForm";

const KG_TO_LBS = 2.20462;
const MAX_KG = 600;
const MAX_LBS = 1322.77;

const PLATE_WEIGHTS_LB = [45, 35, 25, 10, 5, 2.5];
const PLATE_WEIGHTS_KG = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5];

const BARBELL_WEIGHTS = {
  20: { kg: 20, lb: 45 },
  15: { kg: 15, lb: 33 },
};

function App() {
  const [weightKg, setWeightKg] = useState((225 / KG_TO_LBS).toFixed(1));
  const [weightLbs, setWeightLbs] = useState("225");
  const [plateUnits, setPlateUnits] = useState("lb");
  const [barbellWeight, setBarbellWeight] = useState("20");
  const [displayValue, setDisplayValue] = useState("225");
  const [displayUnit, setDisplayUnit] = useState("lbs");
  const [plates, setPlates] = useState([45, 45]);
  const [displayedPlateUnits, setDisplayedPlateUnits] = useState("lb");

  const handleKgChange = (e) => {
    const input = e.target.value;

    if (input === "") {
      setWeightKg("");
      setWeightLbs("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(input)) {
      return;
    }

    const kg = parseFloat(input);

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

    if (input === "") {
      setWeightKg("");
      setWeightLbs("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(input)) {
      return;
    }

    const lbs = parseFloat(input);

    if (!isNaN(lbs)) {
      if (lbs < 0) return;
      if (lbs > MAX_LBS) return;
    }

    setWeightLbs(input);
    if (!isNaN(lbs)) {
      setWeightKg((lbs / KG_TO_LBS).toFixed(1));
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

    setDisplayedPlateUnits(plateUnits);

    if (plateUnits === "kg") {
      const totalWeightKg = weightKg ? parseFloat(weightKg) : 0;
      const barbellKg = barbell.kg;
      const weightPerSide = Math.max(0, (totalWeightKg - barbellKg) / 2);
      const calculatedPlates = calculatePlates(weightPerSide, PLATE_WEIGHTS_KG);
      setPlates(calculatedPlates);

      const platesTotal = calculatedPlates.reduce(
        (sum, plate) => sum + plate,
        0
      );
      const actualTotalKg = platesTotal * 2 + barbellKg;

      setDisplayValue(Math.round(actualTotalKg).toString());
      setDisplayUnit("kg");
    } else {
      const totalWeightLbs = weightLbs ? parseFloat(weightLbs) : 0;
      const barbellLbs = barbell.lb;
      const weightPerSide = Math.max(0, (totalWeightLbs - barbellLbs) / 2);
      const calculatedPlates = calculatePlates(weightPerSide, PLATE_WEIGHTS_LB);
      setPlates(calculatedPlates);

      const platesTotal = calculatedPlates.reduce(
        (sum, plate) => sum + plate,
        0
      );
      const actualTotalLbs = platesTotal * 2 + barbellLbs;

      setDisplayValue(Math.round(actualTotalLbs).toString());
      setDisplayUnit("lbs");
    }
  };

  return (
    <div className="plate-math">
      <h1 className="title">Plate Math</h1>

      <BarbellVisualization
        displayValue={displayValue}
        displayUnit={displayUnit}
        plates={plates}
        plateUnits={displayedPlateUnits}
      />

      <CalculatorForm
        weightKg={weightKg}
        weightLbs={weightLbs}
        onKgChange={handleKgChange}
        onLbsChange={handleLbsChange}
        plateUnits={plateUnits}
        onPlateUnitsChange={(e) => setPlateUnits(e.target.value)}
        barbellWeight={barbellWeight}
        onBarbellWeightChange={(e) => setBarbellWeight(e.target.value)}
      />

      <button className="calculate-btn" onClick={handleCalculate}>
        Calculate
      </button>
    </div>
  );
}

export default App;
