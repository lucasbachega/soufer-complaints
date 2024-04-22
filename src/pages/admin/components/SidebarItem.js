import { ListItemButton, ListItemContent, ListItemDecorator } from "@mui/joy";
import React from "react";

const SidebarItem = ({
  selected,
  path = "",
  onClick = "",
  label = "",
  Icon,
}) => {
  return (
    <ListItemButton
      selected={selected}
      onClick={() => onClick(path)}
      sx={{ borderRadius: "md", height: 40 }}
    >
      <ListItemDecorator>
        <Icon />
      </ListItemDecorator>
      <ListItemContent sx={{ fontSize: ".975rem", fontWeight: "500" }}>
        {label}
      </ListItemContent>
    </ListItemButton>
  );
};

export default SidebarItem;
