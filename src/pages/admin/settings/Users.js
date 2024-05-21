import {
  Add,
  PeopleAltOutlined,
  RefreshOutlined,
  Search,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import TextInput from "../../../components/inputs/TextInput";
import UsersTable from "../../../components/table/users";
import CreateUserModal from "../../../components/table/users/modals/CreateUserModal";
import { setError as setErrorStore } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";
import { includesOnSearch } from "../../../utils/search";

const Users = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);

  const [search, setSearch] = useState("");

  const getData = async () => {
    setLoading(true);
    const res = await HttpClient.admin.listarUsers();
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

  const filteredBySearch = useMemo(() => {
    return data?.filter((user) =>
      includesOnSearch(search, [user?.firstname, user?.email, user?.username])
    );
  }, [data, search]);

  const formatedData = useMemo(() => {
    let filtered = [...filteredBySearch];
    filtered.sort((a, b) =>
      a?.firstname?.toUpperCase()?.localeCompare(b?.firstname?.toUpperCase())
    );
    return [...filtered];
  }, [data, filteredBySearch]);

  const handleCreate = useCallback(async (userData = {}) => {
    const res = await HttpClient.admin.createUser(userData);
    if (res.ok) {
      dispatch(openSnackbar({ message: "Usuário criado" }));
      setData((prev) => {
        delete userData.password;
        return [
          {
            id: res?.id,
            ...userData,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ];
      });
    } else {
      dispatch(
        setErrorStore({
          title: "Erro ao criar usuário",
          message: res?.error?.message,
        })
      );
    }
  }, []);

  const handleRemoveRow = useCallback((userId) => {
    setData((prev) => [...prev?.filter((item) => item.id !== userId)]);
  }, []);

  return (
    <>
      <Box p={3} pb={2} display={"flex"} alignItems={"center"} gap={2}>
        <PeopleAltOutlined sx={{ fontSize: "2rem" }} />
        <Typography level="h3">Usuários ({data?.length || "-"})</Typography>
        <Box flex={1} />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={getData}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <CreateUserModal
          open={newModal}
          onClose={() => setNewModal(false)}
          onConfirm={handleCreate}
        />
        <Button onClick={() => setNewModal(true)} startDecorator={<Add />}>
          Criar usuário
        </Button>
      </Box>
      <Box p={3} pt={1} pb={2}>
        <TextInput
          disabled={loading}
          placeholder={"Pesquisar"}
          value={search}
          onChange={setSearch}
          startDecorator={<Search />}
          sx={{ maxWidth: 400 }}
        />
      </Box>
      <UsersTable
        data={formatedData}
        loading={loading}
        getData={getData}
        onRemoveRow={handleRemoveRow}
      />
    </>
  );
};

export default Users;
