import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Snackbar,
  Stack,
} from "@mui/joy";
import TextArea from "./TextInputArea";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../store/reducers/snackbarBaseSlice";

function SaveInput({
  inputProps,
  initialValue = "",
  onSave = async () => {},
  onSuccess = () => {},
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const [toSave, setToSave] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await onSave(value);
    if (res.ok) {
      setToSave(false);
      dispatch(openSnackbar({ message: "Campo salvo" }));
      onSuccess(value);
    } else {
      setError(res?.error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setError(null);
  }, [value]);

  return (
    <FormControl error={Boolean(error)}>
      <TextArea
        minRows={1}
        onFocus={() => setToSave(true)}
        onChange={setValue}
        onBlur={() => setToSave(initialValue !== value)}
        value={value}
        {...inputProps}
        endDecorator={
          toSave &&
          initialValue !== value && (
            <Stack width={"100%"} direction={"row"} gap={1}>
              <Box flex={1} />
              <Button
                onClick={() => {
                  setLoading(false);
                  setToSave(false);
                  setValue(initialValue);
                }}
                size="sm"
                variant="plain"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                loading={loading}
                disabled={loading}
                size="sm"
              >
                Salvar
              </Button>
            </Stack>
          )
        }
      />
      {Boolean(error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default SaveInput;
