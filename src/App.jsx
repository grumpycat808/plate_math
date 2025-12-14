import { useState } from 'react';
import './App.css';

const KG_TO_LBS = 2.20462;

function App() {
  const [weightKg, setWeightKg] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [plateUnits, setPlateUnits] = useState('kg');
  const [displayValue, setDisplayValue] = useState('0');
  const [displayUnit, setDisplayUnit] = useState('kg');

  const handleKgChange = (e) => {
    const kg = e.target.value;
    setWeightKg(kg);
    if (kg === '' || isNaN(kg)) {
      setWeightLbs('');
    } else {
      setWeightLbs((parseFloat(kg) * KG_TO_LBS).toFixed(2));
    }
  };

  const handleLbsChange = (e) => {
    const lbs = e.target.value;
    setWeightLbs(lbs);
    if (lbs === '' || isNaN(lbs)) {
      setWeightKg('');
    } else {
      setWeightKg((parseFloat(lbs) / KG_TO_LBS).toFixed(2));
    }
  };

  const handleCalculate = () => {
    if (plateUnits === 'kg') {
      const value = weightKg ? parseFloat(weightKg) : 0;
      setDisplayValue(Math.round(value).toString());
      setDisplayUnit('kg');
    } else {
      const value = weightLbs ? parseFloat(weightLbs) : 0;
      setDisplayValue(Math.round(value).toString());
      setDisplayUnit('lbs');
    }
  };

  return (
    <div className="plate-math">
      <h1 className="title">Plate Math</h1>

      {/* Barbell Visualization */}
      <div className="barbell-container">
        <div className="barbell">
          {/* Left plates */}
          <div className="plates-left">
            <div className="plate xlarge"></div>
            <div className="plate large"></div>
            <div className="plate medium"></div>
            <div className="plate small"></div>
          </div>

          {/* Left bar section */}
          <div className="bar-section">
            <div className="collar"></div>
            <div className="bar"></div>
          </div>

          {/* Center display */}
          <div className="display">
            <span className="display-value">{displayValue}</span>
            <span className="display-unit">{displayUnit}</span>
            <span className="display-label">TOTAL</span>
          </div>

          {/* Right bar section */}
          <div className="bar-section">
            <div className="bar"></div>
            <div className="collar"></div>
          </div>

          {/* Right plates */}
          <div className="plates-right">
            <div className="plate xlarge"></div>
            <div className="plate large"></div>
            <div className="plate medium"></div>
            <div className="plate small"></div>
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
                  checked={plateUnits === 'lb'}
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
                  checked={plateUnits === 'kg'}
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

      <button className="calculate-btn" onClick={handleCalculate}>Calculate</button>
    </div>
  );
}

export default App;
