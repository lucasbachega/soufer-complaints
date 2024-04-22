import { ExitToAppOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/joy";
import React from "react";

const AccountBox = () => {
  return (
    <Box
      width={"100%"}
      borderTop={1}
      borderColor={"divider"}
      p={2}
      display={"flex"}
      alignItems={"center"}
    >
      <Avatar color="primary">A</Avatar>
      <Box overflow={"hidden"} flexBasis={0} flex={1} px={1}>
        <Typography noWrap level="title-md">
          André Martins
        </Typography>
        <Tooltip title="andre@soufer.com.br">
          <Typography noWrap color="neutral" level="body-sm">
            andre@soufer.com.br
          </Typography>
        </Tooltip>
      </Box>
      <IconButton>
        <ExitToAppOutlined />
      </IconButton>
    </Box>
  );
};

export default AccountBox;
