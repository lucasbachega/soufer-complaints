import { Add } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpClient } from "../../api/httpClient";
import Appbar from "./components/Appbar";
import TransportsTable from "./components/table/TransportsTable";
import ModalNewTransport from "./new/ModalNewTransport";

const formatData = (data = []) => {
  return data.map((item) => ({
    ...item,
    username: item?.user?.name || "",
    to: item?.points[item?.points?.length - 1] || "",
  }));
};

export default (props) => {
  const navigate = useNavigate();

  const onClose = () => navigate("/home");

  const [params, setParams] = useSearchParams();

  const tab = params.get("tab") || "personal";
  const modalNewOpened = params.get("new");

  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ personal: 0, approver: 0, carrier: 0 });

  const [loading, setLoading] = useState(true);

  const getStats = useCallback(async () => {
    try {
      const res = await HttpClient.transports.stats();
      setStats(res.data);
    } catch (e) {
      console.error("Erro ao buscar stats:", e);
    }
  }, []);

  const getData = useCallback(async () => {
    try {
      getStats();
      setLoading(true);
      const res = await HttpClient.transports.list({
        role: tab,
      });
      setData(formatData(res?.data || []));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    getData();
  }, [tab]);

  const openNew = useCallback(() => {
    params.set("new", "open");
    setParams(params);
  }, [params]);

  const closeNew = useCallback(() => {
    params.delete("new");
    setParams(params);
  }, [params]);

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Appbar
        onRefresh={getData}
        loading={loading}
        onClose={onClose}
        openNew={openNew}
        stats={stats}
      />
      <Tooltip title="Solicitar transporte">
        <IconButton
          color="primary"
          variant="solid"
          sx={{
            position: "fixed",
            bottom: 15,
            right: 15,
            width: 50,
            height: 50,
            display: { xs: "flex", md: "none" },
            zIndex: 1000,
            borderRadius: "10px",
            boxShadow: "md",
          }}
          onClick={openNew}
        >
          <Add sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Tooltip>
      <TransportsTable
        data={data}
        loading={loading}
        getData={getData}
        role={tab}
      />
      <ModalNewTransport
        open={Boolean(modalNewOpened)}
        onClose={closeNew}
        refreshTable={getData}
      />
    </Box>
  );
};
