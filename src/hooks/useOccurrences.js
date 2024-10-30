import { useCallback, useEffect, useState } from "react";
import { HttpClient } from "../api/httpClient";
import { formatOccurrences } from "../pages/admin/settings/AllOccurrences";

const useOccurrences = ({ type = "complaint", role = "personal" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    period: "all",
    category: "",
    status: "",
  });

  const getData = useCallback(async () => {
    setLoading(true);
    const listAction = {
      gestor: HttpClient.gestor.listarOcorrencias,
      admin: HttpClient.admin.listarOcorrencias,
      personal: HttpClient.listMyOccurrences,
    };
    if (!listAction[role]) return;
    const res = await listAction[role]({
      type,
      ...filters,
    });
    if (res.ok) {
      setData(formatOccurrences(res?.data || []));
    } else {
      setError(res?.error?.message);
    }
    setLoading(false);
  }, [filters, type, role]);

  useEffect(() => {
    getData();
  }, [filters, type]);

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

  return {
    loading,
    data,
    getData,
    filters,
    onChangeFilters: handleChangeFilters,
    onUpdateOccurrence: handleUpdateOccurrence,
  };
};

export default useOccurrences;
