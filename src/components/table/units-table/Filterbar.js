import { Search } from "@mui/icons-material";
import { Box, FormControl, FormLabel, Input } from "@mui/joy";
import React from "react";

const Filterbar = ({ filters, onChange }) => {
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="md">
        <FormLabel>Pesquisar</FormLabel>
        <Input sx={{width: 300}} startDecorator={<Search />} placeholder="Pesquise uma unidade" />
      </FormControl>
    </React.Fragment>
  );
  return (
    <>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          p: 3,
          pt: 0,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "250px" },
          },
        }}
      >
        {renderFilters()}
      </Box>
    </>
  );
};

export default Filterbar;
