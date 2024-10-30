import React from "react";
import SelectInput from "../../SelectInput";

const DetectionSelector = ({
  value,
  onChange = () => {},
  disabled,
  ...props
}) => {
  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Detecção"}
      disabled={disabled}
      placeholder={"Selecione uma opção"}
      options={[
        { value: "cipa", label: "CIPA" },
        { value: "internal", label: "Interno" },
      ]}
      {...props}
    />
  );
};

export default DetectionSelector;
