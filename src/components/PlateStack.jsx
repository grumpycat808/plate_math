import { getPlateClassName } from "../utils/plateUtils";

function PlateStack({ plates, plateUnits }) {
  return (
    <div className="plates-left">
      {plates.map((weight, index) => (
        <div
          key={index}
          className={`plate ${getPlateClassName(weight)} ${
            plateUnits === "kg" ? "plate-kg" : ""
          }`}
        >
          <span className="plate-label">{weight}</span>
        </div>
      ))}
      {plateUnits === "kg" && (
        <div className="competition-collar">
          <span className="collar-label">2.5</span>
        </div>
      )}
    </div>
  );
}

export default PlateStack;
