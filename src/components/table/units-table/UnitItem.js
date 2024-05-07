import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Sheet,
  Switch,
  Typography
} from "@mui/joy";
import React, { memo } from "react";

const UnitItem = ({ row = {}, onClick }) => {
  return (
    <Sheet
      onClick={onClick}
      variant="outlined"
      sx={{
        p: 1,
        px: 2,
        borderRadius: "sm",
        width: "100%",
        maxWidth: 900,
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        ":hover": {
          boxShadow: "sm",
        },
        ":active": {
          outline: "1px solid",
        },
      }}
    >
      <Typography level="title-md">{row?.text}</Typography>
      <Box flex={1} />
      <IconButton>
        <Edit />
      </IconButton>
      <IconButton color="danger">
        <DeleteOutline />
      </IconButton>
      <Divider orientation="vertical" sx={{ mx: 1 }} />
      <Switch />
    </Sheet>
  );
};

export default memo(UnitItem);
