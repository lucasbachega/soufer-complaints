import { Add, TaskAltOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { nanoid } from "@reduxjs/toolkit";
import React, { memo, useCallback, useState } from "react";
import { insecurityTasks } from "../../utils/state_models";
import TaskItem from "./TaskItem";

const TasksAssigner = ({
  tasks = [],
  onAddTask = () => {},
  onUpdateTask = () => {},
  onRemoveTask = () => {},
}) => {
  const [newTask, setNewTask] = useState(null);

  const handleAddTaskClick = () => {
    if (newTask) return;
    setNewTask({
      ...insecurityTasks[0],
      _id: nanoid(),
    });
  };
  const handleCancelAdd = useCallback(() => {
    setNewTask(null);
  }, []);

  const handleConfirmAdd = useCallback(() => {
    if (!newTask) return;
    onAddTask(newTask || {});
    setNewTask(null);
  }, [newTask]);

  const handleChangeNewTaskValue = useCallback((taskId, prop, value) => {
    setNewTask((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }, []);

  if (!tasks.length && !newTask) {
    return (
      <Box
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
          maxWidth={400}
          mt={2}
          level="h4"
        >
          Atribuir tarefas
        </Typography>
        <Typography
          textAlign={"center"}
          maxWidth={450}
          color="neutral"
          level="body-sm"
          fontWeight={500}
        >
          Os gestores podem atribuir tarefas a outros colaboradores para
          auxiliar na resolução dos problemas da ocorrência.
        </Typography>
        <Button
          onClick={handleAddTaskClick}
          variant="plain"
          sx={{ mt: 2 }}
          startDecorator={<Add />}
        >
          Adicionar tarefa
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Stack gap={2}>
        {tasks?.map((task, idx) => (
          <TaskItem
            key={idx.toString()}
            data={task || {}}
            onChangeValue={onUpdateTask}
            onRemove={onRemoveTask}
          />
        ))}

        {Boolean(newTask) && (
          <TaskItem
            isNew
            data={newTask || {}}
            onCancel={handleCancelAdd}
            onAdd={handleConfirmAdd}
            onChangeValue={handleChangeNewTaskValue}
          />
        )}

        <Box>
          <Button
            onClick={handleAddTaskClick}
            startDecorator={<Add />}
            variant="plain"
            size="sm"
          >
            Nova tarefa
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default memo(TasksAssigner);
