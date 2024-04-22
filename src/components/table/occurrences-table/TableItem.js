import {
  MoreHorizRounded
} from "@mui/icons-material";
import {
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography
} from "@mui/joy";
import React, { memo } from "react";

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
        <Typography ml={"6px"} level="body-xs">
          --
        </Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        --
        {/* <Chip
          variant="soft"
          size="sm"
          startDecorator={
            {
              Paid: <CheckRounded />,
              Refunded: <AutorenewRounded />,
              Cancelled: <Block />,
            }[row.status]
          }
          color={
            {
              Paid: "success",
              Refunded: "neutral",
              Cancelled: "danger",
            }[row.status]
          }
        >
          {row.status}
        </Chip> */}
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
      <td>
        <Typography level="body-xs">--</Typography>
      </td>
    </tr>
  );
};

export default memo(TableItem);
