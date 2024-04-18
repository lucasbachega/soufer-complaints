import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function ProductsSelector({ value = "", onChange = () => {} }) {
  const data = useSelector((state) => state.products.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Produto"}
      placeholder={"Selecione um produto"}
      options={data}
    />
  );
}

export default ProductsSelector;
