import { useSelector } from "react-redux";
import SelectInput from "../SelectInput";

function ProductsSelector({
  value = "",
  onChange = () => {},
  disabled,
  ...props
}) {
  const data = useSelector((state) => state.products.data);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Produto"}
      disabled={disabled}
      placeholder={"Selecione um produto"}
      options={data?.map((prod) => ({
        label: prod?.label,
        value: prod?.id,
      }))}
      {...props}
    />
  );
}

export default ProductsSelector;
