import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel, Textarea } from "@mui/joy";
import React from "react";

const TextArea = ({
  value,
  onChange = () => {},
  label,
  placeholder,
  size,
  variant,
  helperText,
  startDecorator,
  endDecorator,
  error,
  required,
  minRows = 2,
}) => {
  return (
    <FormControl required={required} error={error}>
      {Boolean(label) && <FormLabel>{label}</FormLabel>}
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        minRows={minRows}
        maxRows={4}
        size={size}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        variant={variant}
      />
      {Boolean(helperText) && (
        <FormHelperText>
          {error && <InfoOutlined />}
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextArea;
