import { Home } from "@mui/icons-material";
import { Breadcrumbs, Link, Typography } from "@mui/joy";
import React from "react";
import { useLocation } from "react-router-dom";

const PathIndicator = () => {
  const { pathname } = useLocation();

  return (
    <Breadcrumbs
      sx={{ position: "absolute", left: 20, top: 20 }}
      aria-label="breadcrumb"
    >
      <Link underline="hover" fontWeight={400} color="primary" href="/">
        <Home sx={{ mr: 1 }} fontSize="medium" />
        Página inicial
      </Link>
      <Typography fontWeight={500} color="text.primary">
        {pathname?.includes("login")
          ? "Login"
          : pathname?.includes("forgot-password")
          ? "Esqueci a senha"
          : ""}
      </Typography>
    </Breadcrumbs>
  );
};

export default PathIndicator;
