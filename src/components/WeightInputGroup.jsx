function WeightInputGroup({ value, onChange, unit }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="weight-input"
        value={value}
        onChange={onChange}
        placeholder=""
      />
      <span className="input-suffix">{unit}</span>
    </div>
  );
}

export default WeightInputGroup;
