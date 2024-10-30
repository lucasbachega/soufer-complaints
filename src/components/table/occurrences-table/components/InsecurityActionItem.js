import {
    AccessTime,
    Attachment,
    MoreVert,
    PersonAdd,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { formatDate } from "../../../../utils/date_functions";

const InsecurityActionItem = ({ data = {} }) => {
  return (
    <Box
      borderRadius={"sm"}
      position={"relative"}
      height={260}
      border={1}
      bgcolor={"#FFF"}
      borderColor={"divider"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box p={2}>
        <Typography level="body-xs">{formatDate(data?.createdAt)}</Typography>
        <Typography
          level="title-lg"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2, // Define o número de linhas desejado
            WebkitBoxOrient: "vertical",
          }}
        >
          {data?.title}
        </Typography>
      </Box>
      <Stack gap={1} p={2} pt={0} flex={1} flexBasis={0} overflow={"auto"}>
        <Stack direction={"row"} alignItems={"flex-start"} gap={1}>
          <AccessTime fontSize="lg" />
          <Stack gap={0.2}>
            <Typography level="body-xs">Prazo (30 dias)</Typography>
            <Stack direction={"row"} alignItems={"flex-start"} gap={0.5}>
              <Typography color="primary" level="body-xs">
                {new Date(data?.fromDate).toLocaleDateString()}
              </Typography>
              <Typography level="body-xs">até</Typography>
              <Typography color="primary" level="body-xs">
                {new Date(data?.fromDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"flex-start"} gap={1}>
          <PersonAdd fontSize="lg" />
          <Stack>
            <Typography level="body-xs">Atribuido por</Typography>
            <Typography color="primary" level="body-xs">
              Lucas Bachega
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction={"row"} alignItems={"center"} p={2} py={1} px={1}>
        <Button variant="plain" size="sm">
          Abrir
        </Button>
        <Box flex={1} />
        <Chip size="sm" startDecorator={<Attachment />}>1</Chip>
        <IconButton size="sm">
          <MoreVert />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default memo(InsecurityActionItem);
