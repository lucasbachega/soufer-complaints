import { DateRange } from "@mui/icons-material";
import { Box, FormControl, FormLabel, Option, Select } from "@mui/joy";
import React from "react";
import CategoryFilter from "./filters/CategoryFilter";

const Filterbar = ({ filters, onChange }) => {
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Data</FormLabel>
        <Select
          startDecorator={<DateRange />}
          size="sm"
          value={filters?.period}
          placeholder="Filtrar por data"
          onChange={(e, v) => onChange("period", v)}
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="today">Hoje</Option>
          <Option value="month">Este mês</Option>
          <Option value="year">Este ano</Option>
          <Option value="all">Todo o período</Option>
        </Select>
      </FormControl>
      {/* <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar por status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          value={filters?.status}
          onChange={(e, v) => onChange("status", v)}
        >
          <Option value="open">Em aberto</Option>
          <Option value="completed">Concluído</Option>
        </Select>
      </FormControl> */}
      <CategoryFilter
        value={filters?.category}
        onChange={(v) => onChange("category", v)}
      />
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
