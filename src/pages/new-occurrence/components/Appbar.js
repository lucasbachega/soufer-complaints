import { AssignmentOutlined, Close } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/joy";
import React, { memo } from "react";

const Appbar = ({ onCancel = () => {}, isOk }) => {
  return (
    <Box
      zIndex={100}
      boxShadow={"sm"}
      p={2}
      bgcolor={"#FFF"}
      display={"flex"}
      alignItems={"center"}
      gap={1}
    >
      <IconButton sx={{ mr: 1 }} size="lg" onClick={onCancel}>
        <Close />
      </IconButton>
      <Avatar color="primary" variant="soft" size="md">
        <AssignmentOutlined />
      </Avatar>
      <Typography ml={2} level="h3">
        Nova ocorrência
      </Typography>
      <Box flex={1} />
      <Button onClick={onCancel} variant="outlined" size="lg">
        Cancelar
      </Button>
      <Button disabled={!isOk} size="lg">
        Enviar ocorrência
      </Button>
    </Box>
  );
};

export default memo(Appbar);
