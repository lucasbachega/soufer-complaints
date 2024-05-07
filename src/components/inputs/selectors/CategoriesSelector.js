import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function CategoriesSelector({ value = "", onChange = () => {} }) {
  const data = useSelector((state) => state.categories.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Categoria"}
      placeholder={"Selecione uma categoria"}
      options={data?.map((category) => ({
        label: category?.label,
        value: category?.id,
      }))}
    />
  );
}

export default CategoriesSelector;
