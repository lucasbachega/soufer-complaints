import { PersonAdd } from "@mui/icons-material";
import { Autocomplete, FormControl } from "@mui/joy";
import React, { memo } from "react";
import { HttpClient } from "../../../api/httpClient";

const AssignUserInput = ({ value, onChange = () => {} }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const res = await HttpClient.gestor.getUsers();
      if (res?.ok) {
        if (active) {
          setOptions(res?.data || []);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <FormControl size="sm" id="assign-user">
      <Autocomplete
        size="sm"
        variant="soft"
        autoHighlight
        value={value}
        onChange={(e, v) => onChange(v)}
        sx={{ width: 200, fontWeight: "500" }}
        startDecorator={<PersonAdd />}
        placeholder="Atribuir responsável"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        getOptionLabel={(option) => option.firstname}
        options={options}
        loading={loading}
        loadingText="Carregando..."
      />
    </FormControl>
  );
};

export default memo(AssignUserInput);
