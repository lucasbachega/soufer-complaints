import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function UnitsSelector({ value = "", onChange = () => {}, disabled }) {
  const data = useSelector((state) => state.units.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Unidade"}
      disabled={disabled}
      placeholder={"Selecione uma unidade"}
      options={data?.map((unit) => ({ label: unit?.label, value: unit?.id }))}
    />
  );
}

export default UnitsSelector;
