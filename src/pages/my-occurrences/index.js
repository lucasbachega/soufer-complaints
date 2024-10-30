import { Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import OccurrencesTable from "../../components/table/occurrences-table";
import useOccurrences from "../../hooks/useOccurrences";
import Appbar from "./components/Appbar";

export default () => {
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  const { data, filters, getData, loading, onChangeFilters } = useOccurrences({
    type: "complaint",
    role: "personal",
  });

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar onClose={onClose} onRefresh={getData} loading={loading} />
      <Box my={1} />
      <OccurrencesTable
        type="complaint"
        filters={filters}
        loading={loading}
        readOnly
        getData={getData}
        onChangeFilters={onChangeFilters}
        data={data}
        sx={{ p: 2, pb: 2 }}
      />
    </Box>
  );
};
