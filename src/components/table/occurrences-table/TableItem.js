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
  return (
    <tr key={row.id} onClick={() => onClick(row)} style={{ cursor: "pointer" }}>
      <DefaultCell textProps={{ ml: "6px" }}>
        {formatDate(row.date)}
      </DefaultCell>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={
            {
              opened: <AutorenewRounded />,
              completed: <CheckRounded />,
            }[row.status]
          }
          color={
            {
              opened: "neutral",
              completed: "success",
            }[row.status]
          }
        >
          {row.status}
        </Chip>
      </td>

      <DefaultCell>{row.unit}</DefaultCell>

      <DefaultCell>{row.customer}</DefaultCell>

      <DefaultCell>{row.representative}</DefaultCell>

      <DefaultCell>{row.salesOrder}</DefaultCell>

      <DefaultCell>{row.sector}</DefaultCell>

      <DefaultCell>{row.product}</DefaultCell>

      <DefaultCell>{row.category}</DefaultCell>

      <DefaultCell>{row.files?.length}</DefaultCell>
    </tr>
  );
};

export default memo(TableItem);
