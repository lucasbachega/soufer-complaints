import { PeopleAltOutlined } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/joy";
import React, { memo } from "react";
import { formatDate, formatMoment } from "../../../../../utils/date_functions";
import { transportStatus } from "../../../../../utils/transports";

const DefaultCell = memo(({ children, textProps, cellProps }) => {
  return (
    <td {...cellProps}>
      <Tooltip
        title={children}
        size="sm"
        variant="outlined"
        placement="bottom-start"
        arrow
      >
        <Typography {...textProps} noWrap level="body-xs">
          {children}
        </Typography>
      </Tooltip>
    </td>
  );
});

const TableItem = ({ row = {}, onClick, isSelected, role }) => {
  return (
    <tr
      key={row._id}
      onClick={() => onClick(row)}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#DDE7EE" : undefined,
      }}
    >
      <DefaultCell textProps={{ ml: "6px" }}>
        {formatDate(row.created_at)}
      </DefaultCell>
      {role !== "personal" && <DefaultCell>{row?.username}</DefaultCell>}
      <DefaultCell>{row?.to}</DefaultCell>
      <DefaultCell>{formatMoment(row.time)}</DefaultCell>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={<PeopleAltOutlined />}
          color={"neutral"}
        >
          {row?.people}
        </Chip>
      </td>
      <DefaultCell>{row.shift}</DefaultCell>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={transportStatus[row.status]?.icon}
          color={transportStatus[row.status]?.color}
        >
          {transportStatus[row.status]?.text}
        </Chip>
      </td>
      <DefaultCell>{row.notes}</DefaultCell>
    </tr>
  );
};

export default memo(TableItem);
