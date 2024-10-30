import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Stack } from "@mui/joy";
import React, { memo, useCallback, useMemo } from "react";
import TextArea from "../inputs/TextInputArea";
import AssignUserInput from "./components/AssignUserInput";
import PeriodInput from "./components/PeriodInput";

const TaskItem = ({
  data = {},
  isNew = false,
  onAdd = () => {},
  onCancel = () => {},
  onChangeValue = () => {},
  onRemove = () => {},
}) => {
  const taskId = data?._id;

  const isOk = useMemo(
    () =>
      Boolean(data?.description) &&
      Boolean(data?.user) &&
      Boolean(data?.startDate) &&
      Boolean(data?.endDate),
    [data]
  );

  const handleAdd = () => {
    if (!isOk) return;
    onAdd(data);
  };

  return (
    <Box border={1} borderColor={"divider"} borderRadius={"md"}>
      <Box p={2}>
        <TextArea
          variant={"soft"}
          autoFocus={isNew}
          minRows={3}
          defaultValue={data?.description || ""}
          onChange={useCallback((v) => onChangeValue(taskId, "description", v))}
          sx={{ width: "100%" }}
          placeholder={"Adicione as instruções da tarefa..."}
        />
      </Box>
      <Stack
        flexWrap={"wrap"}
        p={2}
        pt={0}
        direction={"row"}
        gap={1}
        alignItems={"center"}
      >
        <AssignUserInput
          value={data?.user}
          onChange={useCallback((v) => onChangeValue(taskId, "user", v))}
        />
        <Divider orientation="vertical" sx={{ mx: 1 }} />
        <PeriodInput
          startDate={data?.startDate}
          endDate={data?.endDate}
          onChangeEndDate={useCallback((v) =>
            onChangeValue(taskId, "endDate", v)
          )}
          onChangeStartDate={useCallback((v) =>
            onChangeValue(taskId, "startDate", v)
          )}
        />
        {!isNew && (
          <>
            <Box flex={1} />
            <IconButton size="sm" onClick={() => onRemove(taskId)}>
              <DeleteOutlineOutlined />
            </IconButton>
          </>
        )}
      </Stack>
      {isNew && (
        <Stack p={2} pt={0} direction={"row"} gap={1} alignItems={"center"}>
          <Box flex={1} />
          <Button onClick={onCancel} variant="plain" size="sm">
            Cancelar
          </Button>
          <Button
            disabled={!isOk}
            onClick={handleAdd}
            size="sm"
            variant="solid"
          >
            Ok
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default memo(TaskItem);
