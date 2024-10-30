import React from "react";
import OccurrencesTable from "../../../components/table/occurrences-table";
import useOccurrences from "../../../hooks/useOccurrences";

const ByMeSection = () => {
  const { data, filters, getData, loading, onChangeFilters } = useOccurrences({
    type: "insecurity",
  });

  return (
    <OccurrencesTable
      role="personal"
      type="insecurity"
      filters={filters}
      loading={loading}
      readOnly
      getData={getData}
      onChangeFilters={onChangeFilters}
      data={data}
      sx={{ p: 2, pb: 2 }}
    />
  );
};

export default ByMeSection;
