function WeightDisplay({ value, unit }) {
  return (
    <div className="display">
      <span className="display-value">{value}</span>
      <span className="display-unit">{unit}</span>
      <span className="display-label">TOTAL</span>
    </div>
  );
}

export default WeightDisplay;
