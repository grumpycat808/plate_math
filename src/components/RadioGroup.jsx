function RadioGroup({ label, name, options, selectedValue, onChange }) {
  return (
    <div className="radio-group">
      <span className="radio-group-label">{label}</span>
      <div className="radio-options">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              className="radio-input"
              checked={selectedValue === option.value}
              onChange={onChange}
            />
            <span className="radio-label">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
