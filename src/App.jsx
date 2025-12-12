import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla", isClearable: true },
];

function App() {
  return (
    <>
      <Select isClearable={true} options={options} />
    </>
  );
}

export default App;
