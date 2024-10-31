import {
  AttachFileOutlined,
  BusinessCenterOutlined,
  InventoryOutlined,
  LocationOn,
} from "@mui/icons-material";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/joy";
import React, { memo } from "react";
import { formatDate } from "../../../utils/date_functions";
import { occurrenceStatus } from "../../../utils/occurrences";

const OccurrenceListCard = ({
  row = {},
  onClick = () => {},
  isSelected,
  type,
}) => {
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
      minHeight={145}
      component={"div"}
      onClick={() => onClick(row)}
      sx={{
        cursor: "pointer",
        bgcolor: "#FFF",
        borderLeftWidth: 3,
        outline: (t) =>
          isSelected ? `2px solid ${t.palette.primary[500]}` : "none",
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
      <Box flexBasis={0} flex={1} overflow={"hidden"}>
        <Tooltip
          title={
            type === "insecurity"
              ? row.problem
              : row.categoria?.text
          }
        >
          <Typography mb={1} level="title-lg" fontWeight={"lg"} noWrap>
            {type === "insecurity"
              ? row.problem
              : row.categoria?.text}
          </Typography>
        </Tooltip>
        {type === "insecurity" && (
          <>
            <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
              <LocationOn fontSize="small" color="action" />
              <Typography level="title-sm" fontWeight={"500"}>
                {row.local || "--"}
              </Typography>
            </Stack>
            <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
              <BusinessCenterOutlined fontSize="small" color="action" />
              <Typography level="title-sm" fontWeight={"500"}>
                {row.setor?.text}
              </Typography>
            </Stack>
            <Typography mt={1} level="title-sm" fontWeight={"400"}>
              <Typography component={"span"} color="neutral" level="inherit">
                Detecção:{" "}
              </Typography>
              <Typography
                noWrap
                component={"span"}
                level="inherit"
                fontWeight={"500"}
              >
                {row.detection || "Interno"}
              </Typography>
            </Typography>
          </>
        )}
        {type === "complaint" && (
          <>
            <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
              <InventoryOutlined fontSize="small" color="action" />
              <Typography level="title-sm" fontWeight={"500"}>
                {row.produto?.text}
              </Typography>
            </Stack>
            <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
              <BusinessCenterOutlined fontSize="small" color="action" />
              <Typography level="title-sm" fontWeight={"500"}>
                {row.setor?.text}
              </Typography>
            </Stack>
            <Typography mt={1} level="title-sm" fontWeight={"400"}>
              <Typography component={"span"} color="neutral" level="inherit">
                Cliente:{" "}
              </Typography>
              <Typography
                noWrap
                component={"span"}
                level="inherit"
                fontWeight={"500"}
              >
                {row.cliente || "--"}
              </Typography>
            </Typography>
          </>
        )}
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
            sx={{ mt: 2 }}
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
