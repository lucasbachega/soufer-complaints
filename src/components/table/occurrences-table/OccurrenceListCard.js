import {
    AttachFileOutlined,
    BusinessCenterOutlined,
    InventoryOutlined,
} from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/joy";
import React, { memo } from "react";
import { formatDate } from "../../../utils/date_functions";
import { occurrenceStatus } from "../../../utils/occurrences";

const OccurrenceListCard = ({ row = {}, onClick = () => {} }) => {
  const status = row.status;

  return (
    <Box
      p={2}
      borderRadius={"sm"}
      border={1}
      borderColor={"divider"}
      display={"flex"}
      alignItems={"flex-start"}
      position={"relative"}
      width={"100%"}
      component={"div"}
      onClick={() => onClick(row)}
      sx={{
        bgcolor: "#FFF",
        borderLeftWidth: 3,
        borderLeftColor: (t) =>
          status === "open" ? t.palette.divider : t.palette.success[500],
        ":hover": {
          boxShadow: "sm",
        },
        ":active": {
          outline: (t) => `1px solid ${t.palette.primary[500]}`,
        },
      }}
    >
      <Box flex={1}>
        <Typography mb={1} level="title-lg">
          {row.categoria?.text}
        </Typography>
        <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
          <InventoryOutlined fontSize="small" color="action" />
          <Typography color="neutral" level="title-md" fontWeight={"500"}>
            {row.produto?.text}
          </Typography>
        </Stack>
        <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
          <BusinessCenterOutlined fontSize="small" color="action" />
          <Typography color="neutral" level="title-md" fontWeight={"500"}>
            {row.setor?.text}
          </Typography>
        </Stack>
        <Typography mt={1} color="neutral" level="title-sm" fontWeight={"400"}>
          Ordem de venda:{" "}
          <Typography component={"span"} level="inherit" fontWeight={"500"}>
            {row.ordem_venda || "--"}
          </Typography>
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
        <Typography mb={1} level="body-sm" color="neutral">
          {formatDate(row.created_at)}
        </Typography>
        <Chip
          variant="soft"
          size="md"
          startDecorator={occurrenceStatus[status]?.icon}
          color={occurrenceStatus[status]?.color}
        >
          {occurrenceStatus[status]?.text}
        </Chip>
        {Boolean(row.anexos?.length) && (
          <Chip
            sx={{ mt: 1 }}
            variant="outlined"
            size="sm"
            startDecorator={<AttachFileOutlined />}
          >
            {row.anexos?.length}
          </Chip>
        )}
      </Box>
    </Box>
  );
};

export default memo(OccurrenceListCard);
