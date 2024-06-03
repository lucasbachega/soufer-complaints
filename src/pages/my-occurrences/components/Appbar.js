import {
    Add,
    ArrowBack,
    AssignmentOutlined,
    RefreshOutlined
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import UserIndicator from "../../home/components/UserIndicator";

const Appbar = ({ onClose = () => {}, loading, onRefresh = () => {} }) => {
  const navigate = useNavigate();
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
      <IconButton size="md" onClick={onClose}>
        <ArrowBack />
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
        Minhas ocorrências
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
          mx: 1,
          alignSelf: "center",
          display: { xs: "none", md: "flex" },
        }}
      />
      <Tooltip title="Atualizar">
        <IconButton disabled={loading} onClick={onRefresh}>
          <RefreshOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Nova ocorrência">
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={() => navigate("/new-occurrence")}
        >
          <Add />
        </IconButton>
      </Tooltip>
      <Button
        startDecorator={<Add />}
        onClick={() => navigate("/new-occurrence")}
        size="md"
        sx={{ px: 2, ml: 1, display: { xs: "none", md: "flex" } }}
      >
        Nova ocorrência
      </Button>
      <Button
        variant="outlined"
        onClick={() => {}}
        size="md"
        sx={{ px: 2, display: { xs: "none", md: "flex" } }}
      >
        Exportar Excel
      </Button>
    </Box>
  );
};

export default memo(Appbar);
