import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../store/reducers/occurrenceCategoriesSlice";

function CategoryFilter({ value, onChange }) {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.categories.status);

  const data = useSelector((state) => state.categories.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <FormControl size="sm">
      <FormLabel>Categoria</FormLabel>
      <Autocomplete
        loading={status === "loading"}
        placeholder="Filtrar por categoria"
        options={data || []}
        autoHighlight
        value={value}
        onChange={(e, v) => onChange(v)}
        size="sm"
        sx={{ width: 300 }}
      />
    </FormControl>
  );
}

export default memo(CategoryFilter);
