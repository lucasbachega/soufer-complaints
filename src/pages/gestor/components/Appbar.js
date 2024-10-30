import {
  ArrowBack,
  Checklist,
  GetApp,
  RefreshOutlined,
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
import React, { memo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HttpClient } from "../../../api/httpClient";
import UserIndicator from "../../home/components/UserIndicator";

const ExcelExportButton = ({ period }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    const res = await HttpClient.gestor.exportarExcel({ period });
    if (res?.data) {
      const blob = new Blob([res?.data]);
      // Crie um URL para o Blob
      const url = URL.createObjectURL(blob);
      // Crie um link temporário (a) e clique nele para iniciar o download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ocorrencias.xlsx"); // Define o nome do arquivo
      document.body.appendChild(link);
      link.click();
      // Limpeza após o download
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        onClick={handleExport}
        startDecorator={<GetApp />}
        color="success"
        size="sm"
        loading={loading}
      >
        Exportar para Excel
      </Button>
    </>
  );
};

const Appbar = ({ onClose = () => {}, loading, onRefresh = () => {} }) => {
  const [params, setParams] = useSearchParams();

  const tab = params.get("tab") || "complaint";

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
        <Checklist />
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: { xs: "15px", md: "20px" } }} level={"h3"}>
          Gestor de ocorrências
        </Typography>
        <Tabs
          size="sm"
          aria-label="Disabled tabs"
          defaultValue={"complaint"}
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
            <Tab value={"complaint"}>Reclamações</Tab>
            <Tab value={"insecurity"}>Práticas inseguras</Tab>
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
      <ExcelExportButton />
    </Box>
  );
};

export default memo(Appbar);
