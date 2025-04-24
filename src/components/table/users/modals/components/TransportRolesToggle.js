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
          value="request"
          startDecorator={value.includes("request") && <Check />}
        >
          Solicitante
        </Button>
        <Button
          value="approve"
          startDecorator={value.includes("approve") && <Check />}
        >
          Aprovador
        </Button>
        <Button
          value="confirm"
          startDecorator={value.includes("confirm") && <Check />}
        >
          Transportadora
        </Button>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TransportRolesToggle;
