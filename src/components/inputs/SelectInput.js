import { InfoOutlined } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  ModalClose,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";

const SelectInput = ({
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
  defaultValue = "",
  options = [],
  required,
  disabled,
}) => {
  return (
    <FormControl required={required} error={error}>
      {Boolean(label) && <FormLabel>{label}</FormLabel>}
      <Select
        required={required}
        value={value || ""}
        variant={variant}
        size={size}
        placeholder={placeholder}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e, value) => Boolean(value) && onChange(value)}
        renderValue={(option) => (
          <Typography sx={{ opacity: option.value === "" ? 0.7 : 1 }}>
            {option.label}
          </Typography>
        )}
      >
        {!options?.length && (
          <Typography textAlign={"center"} m={3} level="body-md">
            Nada encontrado
          </Typography>
        )}
        <Option sx={{ fontStyle: "italic" }} color="neutral" value={""}>
          {placeholder}
        </Option>
        {options?.map((option) => (
          <Option key={option?.value} value={option?.value}>
            {option?.label}
          </Option>
        ))}
      </Select>
      {Boolean(helperText) && (
        <FormHelperText>
          {error && <InfoOutlined />}
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInput;
