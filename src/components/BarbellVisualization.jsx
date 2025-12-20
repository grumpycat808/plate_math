import WeightDisplay from "./WeightDisplay";
import PlateStack from "./PlateStack";

function BarbellVisualization({ displayValue, displayUnit, plates, plateUnits }) {
  return (
    <div className="barbell-container">
      <div className="barbell">
        <WeightDisplay value={displayValue} unit={displayUnit} />
        <PlateStack plates={plates} plateUnits={plateUnits} />
      </div>
    </div>
  );
}

export default BarbellVisualization;
