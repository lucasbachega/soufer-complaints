import {
  Add,
  ArrowBack,
  RefreshOutlined,
  ReportGmailerrorred,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tab,
  tabClasses,
  TabList,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserIndicator from "../../home/components/UserIndicator";

const Appbar = ({ onClose = () => {}, loading, onRefresh = () => {} }) => {
  const [params, setParams] = useSearchParams();

  const tab = params.get("tab") || "by_me";

  const navigate = useNavigate();
  return (
    <Box
      zIndex={100}
      borderBottom={1}
      px={{ xs: 1, md: 2 }}
      py={1}
      pb={0}
      bgcolor={"#FFF"}
      display={"flex"}
      alignItems={"flex-start"}
      gap={1}
      borderColor={"divider"}
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
        <ReportGmailerrorredOutlined />
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: { xs: "15px", md: "20px" } }} level={"h3"}>
          Práticas inseguras
        </Typography>
        <Tabs
          size="sm"
          aria-label="Disabled tabs"
          defaultValue={"by_me"}
          value={tab}
          onChange={(e, v) => {
            params.set("tab", v.toString());
            setParams(params);
          }}
          sx={{
            ml: -1,
            [`&& .${tabClasses.root}`]: {
              flex: "initial",
              fontWeight: "500",
              bgcolor: "#FFF",
              "&:hover": {
                bgcolor: "#FFF",
              },
              "&::after": {
                bgcolor: "#FFF",
              },
              [`&.${tabClasses.selected}`]: {
                color: "primary.plainColor",
                "&::after": {
                  height: 2,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <TabList>
            <Tab value={"by_me"}>Relatadas por mim</Tab>
            <Tab value={"pending"}>Tarefas</Tab>
          </TabList>
        </Tabs>
      </Box>
      <Box flex={1} />
      <UserIndicator
        disableExit
        disableUsername
        sx={{
          height: 35,
          pr: 2,
          boxShadow: "none",
          display: { xs: "none", md: "flex" },
        }}
      />

      <Tooltip title="Atualizar">
        <IconButton disabled={loading} onClick={onRefresh}>
          <RefreshOutlined />
        </IconButton>
      </Tooltip>
      <Tooltip title="Relatar">
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={() => navigate("/new-occurrence")}
        >
          <Add />
        </IconButton>
      </Tooltip>
      <Button
        startDecorator={<ReportGmailerrorred />}
        onClick={() => navigate("/new-occurrence?step=2&type=insecurity")}
        size="md"
        sx={{ px: 2, ml: 1, display: { xs: "none", md: "flex" } }}
      >
        Relatar
      </Button>
    </Box>
  );
};

export default memo(Appbar);
