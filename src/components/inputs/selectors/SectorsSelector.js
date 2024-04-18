import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function SectorsSelector({ value = "", onChange = () => {} }) {
  const data = useSelector((state) => state.sectors.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Setor"}
      placeholder={"Selecione um setor"}
      options={data}
    />
  );
}

export default SectorsSelector;
