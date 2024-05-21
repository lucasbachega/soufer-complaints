import { Box, Container, Typography } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo/soufer-logo.png";

const AuthWrapper = () => {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      position={"relative"}
      alignItems={"center"}
      p={3}
    >
      <Container
        maxWidth="xs"
        component={Box}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        sx={{ pt: 3, pb: 10 }}
      >
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <img src={Logo} width={"200px"} />
          <Typography mt={1} fontWeight={500} textAlign={"center"} level="h2">
            Portal de ocorrências
          </Typography>
        </Box>
        <Box
          borderRadius={"lg"}
          mt={4}
          border={1}
          bgcolor={"#FFF"}
          borderColor={(t) => t.palette.background.level3}
          p={2}
          pb={5}
          width={"100%"}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AuthWrapper;
