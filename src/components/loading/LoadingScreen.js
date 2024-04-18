import { Box, CircularProgress, Typography } from "@mui/joy";
import React from "react";
import Logo from "../../assets/logo/soufer-logo.png";

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
      <img src={Logo} />
      <Typography
        textAlign={"center"}
        mt={2}
        color="neutral"
        level={"title-lg"}
      >
        Portal de ocorrências - ADM
      </Typography>
      <CircularProgress sx={{ mt: 5 }} size="md" />
    </Box>
  );
};

export default LoadingScreen;
