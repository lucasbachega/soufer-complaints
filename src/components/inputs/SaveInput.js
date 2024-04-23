import { Box, Button, Stack } from "@mui/joy";
import TextArea from "./TextInputArea";
import { useState } from "react";

function SaveInput({ inputProps, initialValue = "" }) {
  const [value, setValue] = useState("");
  const [toSave, setToSave] = useState(false);

  return (
    <TextArea
      minRows={1}
      onFocus={() => setToSave(true)}
      onChange={setValue}
      onBlur={() => setToSave(initialValue !== value)}
      value={value}
      {...inputProps}
      endDecorator={
        toSave && (
          <Stack width={"100%"} direction={"row"} gap={1}>
            <Box flex={1} />
            <Button size="sm" variant="plain">
              Cancelar
            </Button>
            <Button size="sm">Salvar</Button>
          </Stack>
        )
      }
    />
  );
}

export default SaveInput;
