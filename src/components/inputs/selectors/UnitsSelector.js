import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function UnitsSelector({ value = "", onChange = () => {} }) {
  const data = useSelector((state) => state.units.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Unidade"}
      placeholder={"Selecione uma unidade"}
      options={data?.map((unit) => ({ label: unit?.label, value: unit?.id }))}
    />
  );
}

export default UnitsSelector;
