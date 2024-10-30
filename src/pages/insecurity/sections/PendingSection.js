import {
  AccessTime,
  CheckCircleOutlineOutlined,
  Refresh,
  TaskAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemDecorator,
  Stack,
  Tab,
  tabClasses,
  TabList,
  Tabs,
  Typography,
} from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { HttpClient } from "../../../api/httpClient";
import LoadingScreen from "../../../components/loading/LoadingScreen";
import ModalTaskView from "../../../components/modals/task-view/ModalTaskView";
import InsecurityActionItem from "../../../components/table/occurrences-table/components/InsecurityActionItem";

const PendingSection = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [status, setStatus] = useState("pending");

  const [currentTask, setCurrentTask] = useState(null);

  const getData = useCallback(async () => {
    setError(null);
    setLoading(true);
    const res = await HttpClient.listMyTasks({ status });
    if (res.ok) {
      setData(res?.data || []);
    } else {
      setError("Não foi possível carregar os dados");
    }
    setLoading(false);
  }, [status]);

  useEffect(() => {
    getData();
  }, [status]);

  const closeViewer = () => {
    setCurrentTask(null);
  };

  const handleClickTask = useCallback((data) => {
    setCurrentTask(data);
  }, []);

  return (
    <Box mt={-2} flex={1} flexBasis={0} overflow={"auto"}>
      <Stack direction={"row"} p={2} gap={1}>
        <Tabs
          aria-label="tabs"
          value={status}
          onChange={(e, v) => setStatus(v)}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              fontWeight: "500",
              borderRadius: "lg",
              bgcolor: "primary.100",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            <Tab value={"pending"} disableIndicator>
              <ListItemDecorator>
                <AccessTime />
              </ListItemDecorator>
              Pendentes
            </Tab>
            <Tab value={"finished"} disableIndicator>
              <ListItemDecorator>
                <CheckCircleOutlineOutlined />
              </ListItemDecorator>
              Concluídas
            </Tab>
          </TabList>
        </Tabs>
        <IconButton onClick={getData} disabled={loading}>
          <Refresh />
        </IconButton>
      </Stack>

      {loading ? (
        <LoadingScreen />
      ) : data?.length ? (
        <>
          <Box
            p={3}
            pt={0}
            pb={"100px"}
            sx={{
              display: "grid",
              gridGap: "10px",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px,1fr))",
              gridAutoRows: "auto",
            }}
          >
            {data?.map((item) => (
              <InsecurityActionItem
                key={item?._id}
                data={item}
                onClick={handleClickTask}
                selected={item?._id === currentTask?._id}
              />
            ))}
          </Box>

          {Boolean(currentTask) && (
            <ModalTaskView
              onClose={closeViewer}
              open={Boolean(currentTask)}
              data={currentTask}
              onRefresh={getData}
            />
          )}
        </>
      ) : (
        <Box
          height={300}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          p={3}
        >
          <TaskAltOutlined color="primary" sx={{ fontSize: "3rem" }} />
          <Typography
            gutterBottom
            textAlign={"center"}
            maxWidth={300}
            mt={2}
            level="h4"
          >
            Nenhuma tarefa encontrada
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PendingSection;
