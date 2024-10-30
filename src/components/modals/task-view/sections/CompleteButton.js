import {
    Box,
    Button,
    Dropdown,
    Menu,
    MenuButton,
    ModalClose,
    Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../../api/httpClient";
import { setError } from "../../../../store/reducers/errorBaseSlice";

const CompleteButton = ({ taskId, onComplete = () => {} }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const res = await HttpClient.updateTask({
      id: taskId,
      status: "finished",
    });
    if (res?.ok) {
      onComplete();
    } else {
      dispatch(
        setError({
          title: "Erro ao completar tarefa",
          error: res?.error,
        })
      );
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <Dropdown open={open} onOpenChange={(e, value) => setOpen(value)}>
        <MenuButton
          slots={{ root: Button }}
          size="sm"
          slotProps={{
            root: {
              color: "success",
              disabled: loading,
            },
          }}
        >
          Marcar como concluída
        </MenuButton>
        <Menu sx={{ zIndex: (t) => t.zIndex.modal + 100 }}>
          <ModalClose onClick={() => setOpen(false)} />
          <Box width={300} p={2} pr={4}>
            <Typography mb={2} level="title-md">
              Tem certeza que deseja marcar a tarefa como concluída?
            </Typography>
            <Button onClick={handleConfirm} color="success" size="sm">
              Concluir tarefa
            </Button>
          </Box>
        </Menu>
      </Dropdown>
    </>
  );
};

export default CompleteButton;
