import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Typography,
} from "@mui/joy";
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
  onFocus,
  onBlur,
  disabled,
  autoFocus,
  readOnly,
  labelRightContent,
  sx,
  labelSize,
  labelWeight
}) => {
  return (
    <FormControl required={required} error={error}>
      {Boolean(label) && (
        <FormLabel
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <Typography
            component={"span"}
            fontSize={labelSize}
            fontWeight={labelWeight}
          >
            {label}
          </Typography>{" "}
          <Box flex={1} />
          {labelRightContent}
        </FormLabel>
      )}
      <Textarea
        readOnly={readOnly}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        minRows={minRows}
        maxRows={4}
        size={size}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
        variant={variant}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        sx={sx}
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
