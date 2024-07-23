import { DateRange } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Option,
  Select,
  ToggleButtonGroup,
} from "@mui/joy";
import React from "react";
import CategoryFilter from "./filters/CategoryFilter";

const ToggleListMode = ({ value, onChange = () => {} }) => {
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(e, v) => {
        if (v !== null) {
          onChange(v);
        }
      }}
      exclusive
    >
      <Button value="table">Tabela</Button>
      <Button value="cards">Cards</Button>
    </ToggleButtonGroup>
  );
};

const Filterbar = ({ filters, onChange, viewMode, setViewMode }) => {
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
      <CategoryFilter
        value={filters?.category || null}
        onChange={(v) => onChange("category", v)}
      />
    </React.Fragment>
  );
  return (
    <>
      <Box
        width={"100%"}
        sx={{
          borderRadius: "sm",
          p: 3,
          pt: 0,
          display: "flex",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "250px" },
          },
        }}
      >
        {renderFilters()}
        <Box
          flex={1}
          display={{ md: "flex", xs: "none" }}
          justifyContent={"flex-end"}
        >
          <ToggleListMode value={viewMode} onChange={setViewMode} />
        </Box>
      </Box>
    </>
  );
};

export default Filterbar;
