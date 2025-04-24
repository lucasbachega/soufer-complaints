import { Add, PeopleAltOutlined, Remove } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Textarea,
} from "@mui/joy";
import { useMediaQuery, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";
import WaypointsInput from "./components/WaypointsInput";

const ModalNewTransport = ({
  open,
  onClose = () => {},
  refreshTable = () => {},
}) => {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([""]);
  const [notes, setNotes] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [shift, setShift] = useState("");

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!open) {
      setPoints([""]);
      setNotes("");
      setTime("");
      setShift("");
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await HttpClient.transports.request({
        points,
        notes,
        people,
        shift,
        time,
      });
      refreshTable();
      dispatch(
        openSnackbar({
          message: "Transporte solicitado",
        })
      );
      onClose();
    } catch (error) {
      dispatch(
        setError({
          error,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(0px)" } },
      }}
    >
      <ModalOverflow>
        <ModalDialog size="lg" layout={isSmall ? "fullscreen" : "center"}>
          <ModalClose
            slotProps={{
              root: {
                onClick: onClose,
              },
            }}
          />
          <DialogTitle>Solicitar transporte</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Stack width={{ xs: "100%", md: 300 }} spacing={2}>
                <WaypointsInput data={points} onChange={setPoints} />
                <FormControl required>
                  <FormLabel>Dia e Horário</FormLabel>
                  <Input
                    fullWidth
                    onChange={(e) => setTime(e.target.value)}
                    type="datetime-local"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Pessoas</FormLabel>
                  <Input
                    type="number"
                    placeholder="0"
                    value={people}
                    onChange={(e) => setPeople(parseInt(e.target.value))}
                    startDecorator={<PeopleAltOutlined />}
                    endDecorator={
                      <Stack
                        direction={"row"}
                        gap={1.5}
                        pr={0.5}
                        alignItems={"center"}
                      >
                        <IconButton
                          onClick={() =>
                            people > 1 && setPeople((prev) => (prev || 1) - 1)
                          }
                          variant="soft"
                          color="primary"
                        >
                          <Remove />
                        </IconButton>
                        <IconButton
                          onClick={() => setPeople((prev) => (prev || 0) + 1)}
                          variant="soft"
                          color="primary"
                        >
                          <Add />
                        </IconButton>
                      </Stack>
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Turno</FormLabel>
                  <Input onChange={(e) => setShift(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Observações</FormLabel>
                  <Textarea
                    minRows={4}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                loading={loading}
                type="submit"
                variant="solid"
                color="primary"
              >
                Solicitar
              </Button>
              <Button variant="plain" color="neutral" onClick={onClose}>
                Cancelar
              </Button>
            </DialogActions>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default memo(ModalNewTransport);
