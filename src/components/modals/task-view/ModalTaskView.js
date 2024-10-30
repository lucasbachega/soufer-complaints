import {
    Close,
    ReportGmailerrorredOutlined,
    TaskAlt,
} from "@mui/icons-material";
import {
    Box,
    DialogContent,
    Drawer,
    IconButton,
    ListItemDecorator,
    Stack,
    Tab,
    tabClasses,
    TabList,
    Tabs,
    Typography,
} from "@mui/joy";
import { useScrollTrigger } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { HttpClient } from "../../../api/httpClient";
import { getTaskFileUrl } from "../../../utils/images";
import LoadingScreen from "../../loading/LoadingScreen";
import CompleteButton from "./sections/CompleteButton";
import MainDetails from "./sections/MainDetails";
import OccurrenceView from "./sections/OccurrenceView";
import UploadFiles from "./sections/UploadFiles";

const formatFiles = (files = [], taskId) => {
  return files?.map((file) => ({
    ...file,
    preview: getTaskFileUrl(taskId, file?.filename),
  }));
};

const ModalTaskView = ({
  open,
  onClose = () => {},
  onRefresh = () => {},
  data = {},
}) => {
  const content = useRef(null);

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    target: content.current ? content.current : undefined,
    threshold: 0,
  });

  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});

  const getDetails = async () => {
    if (!data?._id || !data) return;
    setDetails({});
    setLoading(true);
    const res = await HttpClient.detailTask({
      id: data?._id,
    });
    if (res.ok) {
      setDetails({
        ...(res?.data || {}),
        anexos: formatFiles(res?.data?.anexos || [], data?._id),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e, reason) => reason === "backdropClick" && onClose()}
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(1px)" } },
        content: {
          sx: {
            width: "100%",
            maxWidth: 800,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
      sx={{
        "--Drawer-transitionDuration": "0.2s",
      }}
    >
      {open && (
        <>
          <Stack
            boxShadow={scrolled ? "md" : "none"}
            p={1.5}
            direction={"row"}
            alignItems={"center"}
            gap={1}
          >
            <IconButton size="sm" onClick={onClose}>
              <Close />
            </IconButton>
            <Box flex={1} overflow={"hidden"}>
              {scrolled && (
                <Typography noWrap level="body-md" color="neutral">
                  {data?.description}
                </Typography>
              )}
            </Box>
            {data?.status !== "finished" && (
              <CompleteButton
                taskId={data?._id}
                onComplete={() => {
                  onRefresh();
                  onClose();
                }}
              />
            )}
          </Stack>
          <DialogContent ref={content} sx={{ p: 2.5, pr: 3 }}>
            <Box mt={-2} mb={2} display={"flex"} justifyContent={"flex-start"}>
              <Tabs
                size="sm"
                aria-label="tabs"
                value={tab}
                onChange={(e, v) => setTab(v)}
                sx={{ bgcolor: "transparent" }}
              >
                <TabList
                  disableUnderline
                  sx={{
                    p: 0.5,
                    gap: 0.5,
                    fontWeight: "500",
                    borderRadius: "md",
                    bgcolor: "primary.100",
                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                      boxShadow: "sm",
                      bgcolor: "background.surface",
                    },
                  }}
                >
                  <Tab value={0} disableIndicator>
                    <ListItemDecorator>
                      <TaskAlt />
                    </ListItemDecorator>
                    Tarefa
                  </Tab>
                  <Tab value={1} disableIndicator>
                    <ListItemDecorator>
                      <ReportGmailerrorredOutlined />
                    </ListItemDecorator>
                    Ocorrência
                  </Tab>
                </TabList>
              </Tabs>
            </Box>
            {tab === 0 && (
              <>
                <MainDetails data={data} />
                <UploadFiles
                  loading={loading}
                  initialFiles={details?.anexos || []}
                  taskId={data?._id}
                  onRefresh={onRefresh}
                />
              </>
            )}
            {tab === 1 &&
              (loading ? (
                <LoadingScreen />
              ) : (
                <OccurrenceView data={details?.ocorrencia || {}} />
              ))}
          </DialogContent>
        </>
      )}
    </Drawer>
  );
};

export default ModalTaskView;
