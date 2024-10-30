import React from "react";
import { useSearchParams } from "react-router-dom";
import OccurrencesTable from "../../../components/table/occurrences-table";
import useOccurrences from "../../../hooks/useOccurrences";
import OccurrencesAppbar from "./OccurrencesAppbar";

export const formatOccurrences = (data = []) => {
  return data?.map((item) => ({
    ...item,
    id: item?._id,
    categoriaTexto: item?.categoria?.text,
    setorTexto: item?.setor?.text,
    produtoTexto: item?.produto?.text,
    unidadeTexto: item?.unidade?.text,
  }));
};

const AllOccurrences = () => {
  const [params] = useSearchParams();

  const tab = params.get("tab") || "complaint";

  const {
    data,
    filters,
    getData,
    loading,
    onChangeFilters,
    onUpdateOccurrence,
  } = useOccurrences({
    role: "admin",
    type: tab,
  });

  return (
    <>
      <OccurrencesAppbar
        period={filters?.period}
        loading={loading}
        onRefresh={getData}
      />
      <OccurrencesTable
        type={tab}
        data={data}
        filters={filters}
        onChangeFilters={onChangeFilters}
        getData={getData}
        loading={loading}
        onUpdateOccurrence={onUpdateOccurrence}
      />
    </>
  );
};

export default AllOccurrences;
