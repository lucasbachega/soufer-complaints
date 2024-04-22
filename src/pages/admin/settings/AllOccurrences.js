import {
  AssignmentOutlined,
  GetApp,
  RefreshOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/joy";
import React from "react";
import OccurrencesTable from "../../../components/table/occurrences-table";

const AllOccurrences = () => {
  return (
    <>
      <Box p={3} pb={2} display={"flex"} alignItems={"center"} gap={2}>
        <AssignmentOutlined sx={{ fontSize: "2rem" }} />
        <Typography level="h2">Todas as ocorrências</Typography>
        <Box flex={1} />
        <IconButton>
          <RefreshOutlined />
        </IconButton>
        <Button startDecorator={<GetApp />} color="success">
          Exportar para Excel
        </Button>
      </Box>
      <OccurrencesTable />
    </>
  );
};

export default AllOccurrences;
