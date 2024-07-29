import { Close } from "@mui/icons-material";
import { FormControl, FormLabel, IconButton, Option, Select } from "@mui/joy";
import React from "react";
import { occurrenceStatus } from "../../../../utils/occurrences";

const StatusFilter = ({ value, onChange = () => {} }) => {
  return (
    <FormControl size="sm">
      <FormLabel>Status</FormLabel>
      <Select
        size="sm"
        value={value}
        endDecorator={
          Boolean(value) && (
            <IconButton sx={{ mr: 0 }} onClick={() => onChange(null)}>
              <Close />
            </IconButton>
          )
        }
        placeholder="Filtrar por status"
        onChange={(e, v) => onChange(v)}
        slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
      >
        {Object.keys(occurrenceStatus).map((status) => (
          <Option
            key={status}
            value={status}
            color={occurrenceStatus[status]?.color}
          >
            {occurrenceStatus[status]?.text}
          </Option>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusFilter;
