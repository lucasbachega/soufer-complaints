import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import React, { useState } from "react";
import TextInput from "./TextInput";

const PasswordInput = ({ value, onChange, disabled }) => {
  const [visible, setVisible] = useState(false);
  return (
    <TextInput
      value={value}
      onChange={onChange}
      label={"Senha"}
      disabled={disabled}
      required
      type={visible ? "text" : "password"}
      endDecorator={
        <IconButton onClick={(e) => setVisible(!visible)}>
          {visible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  );
};

export default PasswordInput;
