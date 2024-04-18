import { AssignmentOutlined, Close } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/joy";
import React, { memo } from "react";

const Appbar = ({ onCancel = () => {}, isOk }) => {
  return (
    <Box
      zIndex={100}
      boxShadow={"sm"}
      px={{ xs: 1, md: 2 }}
      py={1}
      bgcolor={"#FFF"}
      display={"flex"}
      alignItems={"center"}
      gap={1}
    >
      <IconButton size="md" onClick={onCancel}>
        <Close />
      </IconButton>
      <Avatar
        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        color="primary"
        variant="soft"
        size="md"
      >
        <AssignmentOutlined />
      </Avatar>
      <Typography sx={{ fontSize: { xs: "15px", md: "20px" } }} level={"h3"}>
        Nova ocorrência
      </Typography>
      <Box flex={1} />
      <Button
        sx={{ display: { xs: "none", md: "flex" } }}
        onClick={onCancel}
        variant="outlined"
        size="md"
      >
        Cancelar
      </Button>
      <Button disabled={!isOk} size="md">
        Enviar ocorrência
      </Button>
    </Box>
  );
};

export default memo(Appbar);
