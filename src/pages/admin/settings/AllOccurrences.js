import {
  AssignmentOutlined,
  GetApp,
  RefreshOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import OccurrencesTable from "../../../components/table/occurrences-table";
import { HttpClient } from "../../../api/httpClient";

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
        <Typography level="h2">Todas as ocorrências</Typography>
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={getData}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <Button startDecorator={<GetApp />} color="success">
          Exportar para Excel
        </Button>
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
