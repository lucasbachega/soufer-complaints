import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import OccurrencesTable from "../../components/table/occurrences-table";

export default () => {
  const navigate = useNavigate();
  return (
    <Box flex={1} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Box display={"flex"} alignItems={"center"} gap={1} p={2}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography level="h2">Gestor de ocorrências</Typography>
      </Box>
      <OccurrencesTable data={[]} />
    </Box>
  );
};
