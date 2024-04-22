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
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { formatDate } from "../../../utils/date_functions";

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRounded />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const TableItem = ({ row = {}, onClick }) => {
  return (
    <tr
      key={row.id}
      onClick={() => onClick(row)}
      style={{ height: 50, cursor: "pointer" }}
    >
      <td>
        <Typography ml={"6px"} level="body-xs" sx={{ wordBreak: "break-word" }}>
          {formatDate(row.date)}
        </Typography>
      </td>
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
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.unit}
        </Typography>
      </td>
      <td>
        <Typography sx={{ wordBreak: "break-word" }} level="body-xs">
          {row.customer}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.representative}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.salesOrder}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.sector}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.product}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.category}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs" sx={{ wordBreak: "break-word" }}>
          {row.files.length}
        </Typography>
      </td>
    </tr>
  );
};

export default memo(TableItem);
