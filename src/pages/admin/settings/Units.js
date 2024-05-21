import { Add, BusinessOutlined, RefreshOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import Unitstable from "../../../components/table/units-table";
import UnitModal from "../../../components/table/units-table/modals/UnitModal";
import { setError as setErrorStore } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";

const Units = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await HttpClient.admin.listarUnidades();
    if (res.ok) {
      setData(res.data?.map((item) => ({ ...item, id: item?._id })));
    } else {
      setError(res?.error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreate = useCallback(async (text) => {
    const res = await HttpClient.admin.createUnidade({ text });
    if (res.ok) {
      dispatch(openSnackbar({ message: "Unidade criada" }));
      setData((prev) => [
        {
          id: res?.id,
          text,
          active: true,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    } else {
      dispatch(
        setErrorStore({
          title: "Erro ao criar unidade",
          message: res?.error?.message,
        })
      );
    }
  }, []);

  const handleRemoveRow = useCallback((unitId) => {
    setData((prev) => [...prev?.filter((item) => item.id !== unitId)]);
  }, []);

  return (
    <>
      <Box p={3} pb={2} display={"flex"} alignItems={"center"} gap={2}>
        <BusinessOutlined sx={{ fontSize: "2rem" }} />
        <Typography level="h3">Unidades ({data?.length || "-"})</Typography>
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={getData}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <UnitModal
          open={newModal}
          onClose={() => setNewModal(false)}
          onConfirm={handleCreate}
        />
        <Button onClick={() => setNewModal(true)} startDecorator={<Add />}>
          Criar unidade
        </Button>
      </Box>
      <Unitstable
        data={data}
        loading={loading}
        getData={getData}
        onRemoveRow={handleRemoveRow}
      />
    </>
  );
};

export default Units;
