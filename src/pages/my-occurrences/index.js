import { Box } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../../api/httpClient";
import OccurrencesTable from "../../components/table/occurrences-table";
import Appbar from "./components/Appbar";

export default () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    period: "all",
    category: "",
  });

  const onClose = () => navigate(-1);

  const getOccurrences = useCallback(async () => {
    setLoading(true);
    const res = await HttpClient.listMyOccurrences({
      period: filters?.period,
      categoria: filters?.category,
    });
    if (res?.ok) {
      setData(res.data?.map((item) => ({ ...item, id: item?._id })));
    }
    setLoading(false);
  }, [filters]);

  const handleChangeFilters = useCallback((filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  }, []);

  useEffect(() => {
    getOccurrences();
  }, []);

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar onClose={onClose} onRefresh={getOccurrences} loading={loading} />
      <Box my={1} />
      <OccurrencesTable
        filters={filters}
        loading={loading}
        onChangeFilters={handleChangeFilters}
        data={data}
        sx={{ p: 2, pb: 2 }}
      />
    </Box>
  );
};
