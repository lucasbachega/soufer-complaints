import {
    AccessTime,
    PeopleAltOutlined,
    PersonOutlineOutlined
} from "@mui/icons-material";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/joy";
import React, { memo } from "react";
import { formatDate, formatMoment } from "../../../../../utils/date_functions";
import { transportStatus } from "../../../../../utils/transports";

const CardItem = ({ row = {}, onClick = () => {}, isSelected, role }) => {
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
          status === "open"
            ? t.palette.divider
            : t.palette[transportStatus[status]?.color][400],
        ":hover": {
          boxShadow: "sm",
        },
        ":active": {
          outline: (t) => `1px solid ${t.palette.primary[500]}`,
        },
      }}
    >
      <Box flexBasis={0} flex={1} overflow={"hidden"}>
        <Tooltip title={row.to}>
          <Typography mb={1} level="title-md" fontWeight={"lg"} noWrap>
            Para: {row.to}
          </Typography>
        </Tooltip>
        <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
          <AccessTime fontSize="small" color="action" />
          <Typography level="title-sm" fontWeight={"500"}>
            {formatMoment(row?.time)}
          </Typography>
        </Stack>
        {role !== "personal" && (
          <Stack my={0.5} gap={1} alignItems={"center"} direction={"row"}>
            <PersonOutlineOutlined fontSize="small" color="action" />
            <Typography level="title-sm" fontWeight={"500"}>
              {row?.user?.name || "--"}
            </Typography>
          </Stack>
        )}
        <Typography mt={1} level="title-sm" fontWeight={"400"}>
          <Typography component={"span"} color="neutral" level="inherit">
            Turno:{" "}
          </Typography>
          <Typography
            noWrap
            component={"span"}
            level="inherit"
            fontWeight={"500"}
          >
            {row.shift || "--"}
          </Typography>
        </Typography>
        <Chip
          sx={{ mt: 1 }}
          variant="soft"
          size="sm"
          startDecorator={transportStatus[status]?.icon}
          color={transportStatus[status]?.color}
        >
          {transportStatus[status]?.text}
        </Chip>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
        <Typography mb={1} level="body-sm" color="neutral">
          {formatDate(row.created_at)}
        </Typography>
        <Chip
          sx={{ mt: 1 }}
          variant="outlined"
          size="md"
          startDecorator={<PeopleAltOutlined />}
        >
          {row.people}
        </Chip>
      </Box>
    </Box>
  );
};

export default memo(CardItem);
