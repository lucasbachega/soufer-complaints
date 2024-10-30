import React, { useCallback, useEffect, useState } from "react";
import { HttpClient } from "../../../api/httpClient";
import OccurrencesTable from "../../../components/table/occurrences-table";

const ByMeSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    period: "all",
    category: "",
    status: "",
  });

  const getOccurrences = useCallback(async () => {
    setLoading(true);
    const res = await HttpClient.listMyOccurrences(filters);
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
  }, [filters]);

  return (
    <OccurrencesTable
      type="insecurity"
      filters={filters}
      loading={loading}
      readOnly
      getData={getOccurrences}
      onChangeFilters={handleChangeFilters}
      data={data}
      sx={{ p: 2, pb: 2 }}
    />
  );
};

export default ByMeSection;
