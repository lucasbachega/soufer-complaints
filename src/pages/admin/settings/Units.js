import { Add, BusinessCenter, RefreshOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { HttpClient } from "../../../api/httpClient";
import Unitstable from "../../../components/table/units-table";
import UnitModal from "../../../components/table/units-table/modals/UnitModal";

const Units = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await HttpClient.admin.listarUnidades();
    if (res.ok) {
      console.log(res);
      setData(res.data?.map((item) => ({ ...item, id: item?._id })));
    } else {
      setError(res?.error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box p={3} pb={2} display={"flex"} alignItems={"center"} gap={2}>
        <BusinessCenter sx={{ fontSize: "2rem" }} />
        <Typography level="h2">Unidades</Typography>
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={getData}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <UnitModal open={newModal} onClose={() => setNewModal(false)} />
        <Button onClick={() => setNewModal(true)} startDecorator={<Add />}>
          Criar unidade
        </Button>
      </Box>
      <Unitstable data={data} loading={loading} getData={getData} />
    </>
  );
};

export default Units;
