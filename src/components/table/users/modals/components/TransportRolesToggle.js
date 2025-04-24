import { Check } from "@mui/icons-material";
import { Box, Button, ToggleButtonGroup, Typography } from "@mui/joy";
import React from "react";

const TransportRolesToggle = ({ value = [], onChange = () => {} }) => {
  return (
    <Box mt={2}>
      <Typography level="title-md" mb={2}>
        Permissões para transporte coletivo
      </Typography>
      <ToggleButtonGroup
        variant="outlined"
        color="primary"
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
      >
        <Button
          value="personal"
          startDecorator={value.includes("personal") && <Check />}
        >
          Solicitante
        </Button>
        <Button
          value="approver"
          startDecorator={value.includes("approver") && <Check />}
        >
          Aprovador
        </Button>
        <Button
          value="carrier"
          startDecorator={value.includes("carrier") && <Check />}
        >
          Transportadora
        </Button>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TransportRolesToggle;
