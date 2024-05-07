import { Box, CircularProgress } from "@mui/joy";
import React from "react";

const LoadingScreen = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      height={"100%"}
      width={"100%"}
      p={4}
      pb={"150px"}
    >
      <CircularProgress sx={{ mt: 5 }} size="md" />
    </Box>
  );
};

export default LoadingScreen;
