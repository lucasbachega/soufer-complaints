import {
  AccessTime,
  Attachment,
  PersonAddOutlined
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography
} from "@mui/joy";
import { differenceInDays } from "date-fns";
import React, { memo } from "react";
import { formatMoment } from "../../../../utils/date_functions";
import { taskStatus } from "../../../../utils/occurrences";

const InsecurityActionItem = ({ data = {}, selected, onClick = () => {} }) => {
  const {
    createdAt,
    endDate,
    startDate,
    description,
    createdBy,
    anexos,
    status,
  } = data;

  return (
    <Box
      component={"div"}
      borderRadius={"sm"}
      position={"relative"}
      height={260}
      border={1}
      bgcolor={"#FFF"}
      borderColor={"divider"}
      display={"flex"}
      flexDirection={"column"}
      sx={{
        cursor: "pointer",
        outline: (t) =>
          selected ? `2px solid ${t.palette.primary[500]}` : "none",
        ":hover": {
          boxShadow: "md",
        },
        ":active": {
          outline: (t) => `2px solid ${t.palette.primary[500]}`,
        },
      }}
      onClick={() => onClick(data)}
    >
      <Box p={2}>
        <Typography gutterBottom level="body-xs" fontSize={".7rem"}>
          Criada em {formatMoment(createdAt)}
        </Typography>
        <Tooltip variant="outlined" title={description}>
          <Typography
            level="body-lg"
            fontWeight={600}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2, // Define o número de linhas desejado
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        </Tooltip>
      </Box>
      <Box flex={1} />
      <Stack mt={"auto"} gap={1} p={2} pt={0} overflow={"auto"}>
        <Stack direction={"row"} alignItems={"flex-start"} gap={1}>
          <AccessTime fontSize="lg" />
          <Stack gap={0.2}>
            <Typography level="body-xs">
              Prazo ({differenceInDays(new Date(endDate), new Date(startDate))}{" "}
              dias)
            </Typography>
            <Stack direction={"row"} alignItems={"flex-start"} gap={0.5}>
              <Typography color="primary" level="body-xs">
                {new Date(startDate).toLocaleDateString()}
              </Typography>
              <Typography level="body-xs">até</Typography>
              <Typography color="primary" level="body-xs">
                {new Date(endDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"flex-start"} gap={1}>
          <PersonAddOutlined fontSize="lg" />
          <Stack>
            <Typography level="body-xs">Atribuído por</Typography>
            <Typography color="primary" level="body-xs">
              {createdBy?.firstname}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction={"row"} alignItems={"center"} gap={1} p={2} py={1} px={1}>
        <Button variant="plain" size="sm">
          Abrir
        </Button>
        <Box flex={1} />
        {Boolean(anexos?.length) && (
          <Chip size="sm" startDecorator={<Attachment />}>
            {anexos?.length}
          </Chip>
        )}
        <Chip size="md" color={taskStatus[status]?.color}>
          {taskStatus[status]?.text}
        </Chip>
        {/* <IconButton size="sm">
          <MoreVert />
        </IconButton> */}
      </Stack>
    </Box>
  );
};

export default memo(InsecurityActionItem);
