import {
  AssignmentOutlined,
  GetApp,
  RefreshOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { HttpClient } from "../../../api/httpClient";
import OccurrencesTable from "../../../components/table/occurrences-table";

const ExcelExportButton = ({ period }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    const res = await HttpClient.admin.exportarExcel({ period });
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
        loading={loading}
      >
        Exportar para Excel
      </Button>
    </>
  );
};

const AllOccurrences = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    period: "all",
    category: "",
  });

  const getData = async () => {
    setLoading(true);
    const res = await HttpClient.admin.listarOcorrencias({
      period: filters?.period,
      categoria: filters?.category,
    });
    if (res.ok) {
      setData(res.data?.map((item) => ({ ...item, id: item?._id })));
    } else {
      setError(res?.error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const handleChangeFilters = useCallback((filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  }, []);

  const handleUpdateOccurrence = useCallback(({ id, changes = {} }) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...changes };
        }
        return item;
      })
    );
  }, []);

  return (
    <>
      <Box p={3} pb={2} display={"flex"} alignItems={"center"} gap={2}>
        <AssignmentOutlined sx={{ fontSize: "2rem" }} />
        <Typography level="h3">Todas as ocorrências</Typography>
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={getData}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <ExcelExportButton period={filters?.period} />
      </Box>
      <OccurrencesTable
        data={data}
        filters={filters}
        onChangeFilters={handleChangeFilters}
        getData={getData}
        loading={loading}
        onUpdateOccurrence={handleUpdateOccurrence}
      />
    </>
  );
};

export default AllOccurrences;
