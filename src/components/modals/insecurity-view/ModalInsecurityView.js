import { ReportGmailerrorredOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogContent,
  Divider,
  Drawer,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";
import {
  formatDateToInput,
  formatMoment,
  parseDate,
} from "../../../utils/date_functions";
import LoadingScreen from "../../loading/LoadingScreen";
import TasksAssigner from "../../tasks/TasksAssigner";
import DiscartModal from "../DiscartModal";
import ToggleStatus from "../occurrence-view/components/ToggleStatus";
import CustomTabs from "./components/CustomTabs";
import DetailsSection from "./sections/DetailsSection";

const ModalInsecurityView = ({
  open,
  data = {},
  onClose,
  onRefresh = () => {},
  readOnly,
  role = "admin",
}) => {
  const dispatch = useDispatch();

  const isOk = useRef(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [copyData, setCopyData] = useState({ ...(data || {}) });
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tab, setTab] = useState(0);

  const originalTasks = useRef([]);
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    setLoadingTasks(true);
    const res = await HttpClient.gestor.getTasks(data?._id);
    if (res?.ok) {
      const formattedTasks = (res?.data || []).map((task) => ({
        ...task,
        startDate: formatDateToInput(new Date(task?.startDate)),
        endDate: formatDateToInput(new Date(task?.endDate)),
      }));
      originalTasks.current = [...(formattedTasks || [])];
      setTasks(formattedTasks || []);
      setLoadingTasks(false);
    }
  }, [data?._id]);

  useEffect(() => {
    if (tab === 1 && role === "gestor") {
      getTasks();
    }
  }, [tab]);

  useEffect(() => {
    const timeoutIsOk = setTimeout(() => {
      isOk.current = true;
    }, 500);
    return () => {
      clearTimeout(timeoutIsOk);
      isOk.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOk.current) {
      setChanged(true);
    }
  }, [copyData]);

  const handleClose = () => {
    if (changed && !readOnly) {
      DiscartModal.show(() => onClose());
      return;
    }
    isOk.current = false;
    setChanged(false);
    onClose();
  };

  const handleChangeValue = useCallback((field, value) => {
    setCopyData((prev) => ({ ...prev, [field]: value }));
    setChanged(true);
  }, []);

  const handleAddTask = useCallback((newTask = {}) => {
    setTasks((prev) => [...prev, newTask]);
    setChanged(true);
  }, []);

  const handleUpdateTask = useCallback((taskId, prop, value) => {
    setTasks((prev) =>
      prev.map((item) => {
        if (item._id === taskId) {
          return { ...item, [prop]: value };
        }
        return item;
      })
    );
    setChanged(true);
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    setTasks((prev) => {
      return prev?.filter((item) => item?._id !== taskId);
    });
    setChanged(true);
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      const allTasks = originalTasks.current || [];
      const newTasks = tasks || [];

      // Cria um mapa para acessar os _ids de allTasks rapidamente
      const allTasksMap = allTasks.reduce((map, item) => {
        map[item._id] = item;
        return map;
      }, {});

      // Processa os itens de allTasks para identificar quais manter, atualizar ou remover
      const result = allTasks.map((item) => {
        const updatedTask = newTasks.find((task) => task._id === item._id);

        // Verifica se o item foi removido (existe em allTasks, mas não em newTasks)
        if (!updatedTask) {
          return {
            ...item,
            remove: true, // Marca para remoção
            startDate: parseDate(item.startDate),
            endDate: parseDate(item.endDate),
            userId: item?.user?._id,
          };
        }

        // Atualiza o item mantendo o _id
        return {
          ...updatedTask,
          _id: item._id, // Mantém o _id do item original
          remove: false,
          startDate: parseDate(updatedTask.startDate),
          endDate: parseDate(updatedTask.endDate),
          userId: updatedTask?.user?._id || item?.user?._id,
        };
      });

      // Adiciona os itens de newTasks que não possuem correspondência em allTasks
      newTasks.forEach((task) => {
        if (!allTasksMap[task._id]) {
          const newTask = {
            ...task,
            startDate: parseDate(task.startDate),
            endDate: parseDate(task.endDate),
            remove: false, // Não marcar para remoção
            userId: task?.user?._id,

            // Remove o _id se não tiver correspondência em allTasks
            ...(task._id ? {} : { _id: undefined }),
          };

          // Remove a propriedade _id se existir
          delete newTask._id;
          result.push(newTask);
        }
      });

      await HttpClient.gestor.updateInsecurity(data?.id, {
        tasks: result,
        status: copyData?.status,
        motivoRej: copyData?.motivoRej,
      });

      onRefresh();
      onClose();
      dispatch(openSnackbar({ message: "Ocorrência salva" }));
    } catch (error) {
      dispatch(setError({ title: "Erro ao salvar ocorrência", error }));
    } finally {
      setLoading(false);
    }
  };

  if (!copyData || !data) return;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e, reason) => reason === "backdropClick" && handleClose()}
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(0px)" } },
        content: {
          sx: {
            p: 2.5,
            width: "100%",
            maxWidth: 800,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <ModalClose onClick={handleClose} sx={{ zIndex: 100 }} />
      <Stack
        m={-2.5}
        p={2.5}
        py={1.5}
        borderBottom={1}
        borderColor={"divider"}
        direction={"row"}
        alignItems={"flex-end"}
        zIndex={70}
        bgcolor={"#FFF"}
        gap={1}
      >
        <Box flex={1}>
          <Stack flex={1} direction={"row"} gap={1.5}>
            <ReportGmailerrorredOutlined sx={{ mt: 0.3 }} />
            <Box>
              <Typography level="h5" fontWeight={"lg"} color="neutral">
                {formatMoment(copyData?.created_at)}
              </Typography>
              <Typography fontWeight={"600"} level="body-lg">
                Prática insegura
              </Typography>
            </Box>
          </Stack>
          {role === "gestor" && <CustomTabs tab={tab} onChange={setTab} />}
        </Box>

        <ToggleStatus
          readOnly={readOnly}
          status={copyData?.status}
          onChange={handleChangeValue}
        />
      </Stack>
      <DialogContent sx={{ position: "relative", p: 0, pt: 5, pr: 3, m: 0 }}>
        {tab === 0 && (
          <DetailsSection
            data={copyData}
            readOnly={readOnly}
            onChangeValue={handleChangeValue}
          />
        )}
        {tab === 1 &&
          (loadingTasks ? (
            <LoadingScreen />
          ) : (
            <TasksAssigner
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onRemoveTask={handleRemoveTask}
            />
          ))}
      </DialogContent>
      {!readOnly && (
        <>
          <Divider />
          <Box
            mb={-1}
            sx={{ display: "flex", alignItems: "center", gap: 1, pt: 1 }}
          >
            <Button
              onClick={handleSave}
              size="sm"
              loading={loading}
              disabled={loading || !changed}
            >
              Salvar
            </Button>
            <Button onClick={handleClose} size="sm" variant="plain">
              Fechar
            </Button>
            <Box flex={1} />
            <Typography level="body-xs" fontWeight={"sm"} color="neutral">
              {copyData?.id}
            </Typography>
          </Box>
        </>
      )}
      <DiscartModal />
    </Drawer>
  );
};

export default memo(ModalInsecurityView);
