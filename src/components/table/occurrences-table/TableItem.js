import {
  AutorenewRounded,
  CheckRounded,
  MoreHorizRounded,
} from "@mui/icons-material";
import {
  Chip,
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { formatDate } from "../../../utils/date_functions";
import { occurrenceStatus } from "../../../utils/occurrences";

const DefaultCell = memo(({ children, textProps, cellProps }) => {
  return (
    <td {...cellProps}>
      <Tooltip title={children} size="sm" variant="outlined" arrow>
        <Typography {...textProps} noWrap level="body-xs">
          {children}
        </Typography>
      </Tooltip>
    </td>
  );
});

const TableItem = ({ row = {}, onClick }) => {
  console.log("render: ", row.id);

  return (
    <tr key={row.id} onClick={() => onClick(row)} style={{ cursor: "pointer" }}>
      <DefaultCell textProps={{ ml: "6px" }}>
        {formatDate(row.created_at)}
      </DefaultCell>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={occurrenceStatus[row.status]?.icon}
          color={occurrenceStatus[row.status]?.color}
        >
          {occurrenceStatus[row.status]?.text}
        </Chip>
      </td>

      <DefaultCell>{row.unidade?.text}</DefaultCell>

      <DefaultCell>{row.cliente}</DefaultCell>

      <DefaultCell>{row.representante}</DefaultCell>

      <DefaultCell>{row.ordem_venda}</DefaultCell>

      <DefaultCell>{row.setor?.text}</DefaultCell>

      <DefaultCell>{row.produto?.text}</DefaultCell>

      <DefaultCell>{row.categoria?.text}</DefaultCell>

      <DefaultCell>{row.anexos}</DefaultCell>
    </tr>
  );
};

export default memo(TableItem);
