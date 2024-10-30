import { ArrowBack, AssignmentOutlined, Close } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, IconButton, Typography } from "@mui/joy";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import UserIndicator from "../../home/components/UserIndicator";

const Appbar = ({ onCancel = () => {}, isOk, onCreate, loading, type }) => {
  const navigate = useNavigate();

  return (
    <Box
      zIndex={100}
      px={{ xs: 1, md: 2 }}
      py={1}
      bgcolor={"#FFF"}
      display={"flex"}
      alignItems={"center"}
      borderBottom={1}
      sx={{ borderBottomColor: "divider" }}
      gap={1}
    >
      <IconButton size="md" onClick={() => navigate(-1)}>
        {type ? <ArrowBack /> : <Close />}
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
      <UserIndicator
        disableExit
        disableUsername
        sx={{
          height: 40,
          pr: 2,
          boxShadow: "none",
          display: { xs: "none", md: "flex" },
        }}
      />
      <Divider
        orientation="vertical"
        sx={{
          height: 20,
          mx: 2,
          alignSelf: "center",
          display: { xs: "none", md: "flex" },
        }}
      />
      <Button
        sx={{ display: { xs: "none", md: "flex" } }}
        onClick={onCancel}
        variant="outlined"
        size="md"
      >
        Cancelar
      </Button>
      <Button
        disabled={!isOk || loading}
        onClick={onCreate}
        size="md"
        sx={{ px: 4 }}
      >
        {loading ? "Enviando" : "Enviar"}
      </Button>
    </Box>
  );
};

export default memo(Appbar);
