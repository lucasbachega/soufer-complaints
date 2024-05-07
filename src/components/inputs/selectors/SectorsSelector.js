import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function SectorsSelector({ value = "", onChange = () => {}, disabled }) {
  const data = useSelector((state) => state.sectors.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Setor"}
      disabled={disabled}
      placeholder={"Selecione um setor"}
      options={data?.map((sector) => ({
        label: sector?.label,
        value: sector?.id,
      }))}
    />
  );
}

export default SectorsSelector;
