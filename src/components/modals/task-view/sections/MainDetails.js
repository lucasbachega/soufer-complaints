import { AccessTime, PersonAddOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/joy";
import { differenceInDays } from "date-fns";
import React from "react";
import { taskStatus } from "../../../../utils/occurrences";

const MainDetails = ({ data = {} }) => {
  return (
    <Box>
      <Typography fontWeight={500} level="title-lg">
        {data?.description}
      </Typography>

      <Stack mt={"auto"} gap={2} py={2} overflow={"auto"}>
        <Stack direction={"row"} alignItems={"flex-start"} gap={2}>
          {taskStatus[data?.status]?.icon}
          <Stack>
            <Typography level="body-md" fontWeight={500}>
              Status
            </Typography>
            <Typography
              color={taskStatus[data?.status]?.color}
              level="body-md"
              fontWeight={500}
            >
              {taskStatus[data?.status]?.text}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"flex-start"} gap={2}>
          <AccessTime />
          <Stack gap={0.2}>
            <Typography level="body-md" fontWeight={500}>
              Prazo (
              {differenceInDays(
                new Date(data?.endDate),
                new Date(data?.startDate)
              )}{" "}
              dias)
            </Typography>
            <Stack direction={"row"} alignItems={"flex-start"} gap={0.5}>
              <Typography color="primary" level="body-md" fontWeight={500}>
                {new Date(data?.startDate).toLocaleDateString()}
              </Typography>
              <Typography level="body-md" fontWeight={500}>
                até
              </Typography>
              <Typography color="primary" level="body-md" fontWeight={500}>
                {new Date(data?.endDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"flex-start"} gap={2}>
          <PersonAddOutlined />
          <Stack>
            <Typography level="body-md" fontWeight={500}>
              Atribuído por
            </Typography>
            <Typography color="primary" level="body-md" fontWeight={500}>
              {data?.createdBy?.firstname}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainDetails;
