import WeightInputGroup from "./WeightInputGroup";
import RadioGroup from "./RadioGroup";

function CalculatorForm({
  weightKg,
  weightLbs,
  onKgChange,
  onLbsChange,
  plateUnits,
  onPlateUnitsChange,
  barbellWeight,
  onBarbellWeightChange,
}) {
  const plateUnitOptions = [
    { value: "lb", label: "LB" },
    { value: "kg", label: "KG" },
  ];

  const barbellOptions = [
    { value: "20", label: plateUnits === "lb" ? "45lb" : "20kg" },
    { value: "15", label: plateUnits === "lb" ? "33lb" : "15kg" },
  ];

  return (
    <div className="form-section">
      <label className="input-label">Enter Weight</label>

      <div className="weight-inputs">
        <WeightInputGroup value={weightKg} onChange={onKgChange} unit="kg" />
        <WeightInputGroup value={weightLbs} onChange={onLbsChange} unit="lbs" />
      </div>

      <div className="radio-groups">
        <RadioGroup
          label="Plate Units"
          name="plateUnits"
          options={plateUnitOptions}
          selectedValue={plateUnits}
          onChange={onPlateUnitsChange}
        />
        <RadioGroup
          label="Barbell"
          name="barbell"
          options={barbellOptions}
          selectedValue={barbellWeight}
          onChange={onBarbellWeightChange}
        />
      </div>
    </div>
  );
}

export default CalculatorForm;
