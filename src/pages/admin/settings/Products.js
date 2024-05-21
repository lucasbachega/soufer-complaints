import { Add, InventoryOutlined, RefreshOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import ProductsTable from "../../../components/table/products";
import ProductModal from "../../../components/table/products/modals/ProductModal";
import { setError as setErrorStore } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await HttpClient.admin.listarProdutos();
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
    const res = await HttpClient.admin.createProduto({ text });
    if (res.ok) {
      dispatch(openSnackbar({ message: "Produto criado" }));
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
          title: "Erro ao criar produto",
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
        <InventoryOutlined sx={{ fontSize: "2rem" }} />
        <Typography level="h3">Produtos ({data?.length || "-"})</Typography>
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={getData}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <ProductModal
          open={newModal}
          onClose={() => setNewModal(false)}
          onConfirm={handleCreate}
        />
        <Button onClick={() => setNewModal(true)} startDecorator={<Add />}>
          Criar produto
        </Button>
      </Box>
      <ProductsTable
        data={data}
        loading={loading}
        getData={getData}
        onRemoveRow={handleRemoveRow}
      />
    </>
  );
};

export default Products;
