import { Box, List } from "@mui/joy";
import React from "react";
import Logo from "../../../assets/logo/soufer-logo.png";

const Sidebar = () => {
  return (
    <Box
      width={"18em"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"#FFF"}
      boxShadow={"sm"}
    >
      <Box p={2} pt={4}>
        <img width={"160px"} src={Logo} />
      </Box>
      <Box flex={1} flexBasis={0} height={"100%"} overflow={"auto"}>
        <List></List>
      </Box>
    </Box>
  );
};

export default Sidebar;
