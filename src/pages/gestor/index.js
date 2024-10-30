import { Box } from "@mui/joy";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OccurrencesTable from "../../components/table/occurrences-table";
import useOccurrences from "../../hooks/useOccurrences";
import Appbar from "./components/Appbar";

export default () => {
  const navigate = useNavigate();

  const onClose = () => navigate("/home");

  const [params] = useSearchParams();

  const tab = params.get("tab") || "complaint";

  const {
    data,
    loading,
    getData,
    filters,
    onChangeFilters,
    onUpdateOccurrence,
  } = useOccurrences({
    type: tab,
    role: "gestor",
  });

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Appbar onRefresh={getData} loading={loading} onClose={onClose} />
      <Box mt={2} />
      <OccurrencesTable
        role={"gestor"}
        type={tab}
        data={data}
        loading={loading}
        onChangeFilters={onChangeFilters}
        filters={filters}
        readOnly={false}
        getData={getData}
        onUpdateOccurrence={onUpdateOccurrence}
      />
    </Box>
  );
};
