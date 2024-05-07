import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { useSelector } from "react-redux";

function CategoryFilter({ value, onChange }) {
  const data = useSelector((state) => state.categories.data);
  return (
    <FormControl size="sm">
      <FormLabel>Categoria</FormLabel>
      <Autocomplete
        placeholder="Filtrar por categoria"
        options={data}
        autoHighlight
        value={value}
        onChange={(e, v) => onChange(v)}
        size="sm"
        sx={{ width: 300 }}
      />
    </FormControl>
  );
}

export default CategoryFilter;
