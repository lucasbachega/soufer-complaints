import { ArrowDownward } from "@mui/icons-material";
import { Box, Link } from "@mui/joy";
import { visuallyHidden } from "@mui/utils";
import React, { memo } from "react";

const headCells = [
  {
    id: "created_at",
    numeric: false,
    disablePadding: true,
    label: "Data",
    types: ["complaint", "insecurity"],
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    types: ["complaint", "insecurity"],
  },
  {
    id: "categoriaTexto",
    numeric: false,
    disablePadding: false,
    label: "Categoria",
    types: ["complaint"],
  },
  {
    id: "problem",
    numeric: false,
    disablePadding: false,
    label: "Problema",
    types: ["insecurity"],
  },
  {
    id: "detection",
    numeric: false,
    disablePadding: false,
    label: "Detecção",
    types: ["insecurity"],
  },
  {
    id: "local",
    numeric: false,
    disablePadding: false,
    label: "Local",
    types: ["insecurity"],
  },
  {
    id: "area",
    numeric: false,
    disablePadding: false,
    label: "Área",
    types: ["insecurity"],
  },
  {
    id: "produtoTexto",
    numeric: false,
    disablePadding: false,
    label: "Produto",
    types: ["complaint"],
  },
  {
    id: "cliente",
    numeric: false,
    disablePadding: false,
    label: "Cliente",
    types: ["complaint"],
  },
  {
    id: "representante",
    numeric: false,
    disablePadding: false,
    label: "Representante",
    types: ["complaint"],
  },
  {
    id: "unidadeTexto",
    numeric: false,
    disablePadding: false,
    label: "Unidade",
    types: ["complaint", "insecurity"],
  },
  {
    id: "setorTexto",
    numeric: false,
    disablePadding: false,
    label: "Setor",
    types: ["complaint", "insecurity"],
  },
  {
    id: "ordem_venda",
    numeric: false,
    disablePadding: false,
    label: "Ordem de venda",
    types: ["complaint"],
  },
  {
    id: "anexos",
    numeric: false,
    disablePadding: false,
    label: "Anexos",
    types: ["complaint", "insecurity"],
  },
];

const TableHeader = ({ order, orderBy, onRequestSort, type }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells
          .filter((cell) => cell?.types.includes(type))
          .map((headCell) => {
            const active = orderBy === headCell.id;
            return (
              <th
                key={headCell.id}
                style={{ width: "130px" }}
                aria-sort={
                  active
                    ? { asc: "ascending", desc: "descending" }[order]
                    : undefined
                }
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  underline="none"
                  color="neutral"
                  textColor={active ? "primary.plainColor" : undefined}
                  component="button"
                  onClick={createSortHandler(headCell.id)}
                  fontWeight="lg"
                  level="body-xs"
                  startDecorator={
                    headCell.numeric ? (
                      <ArrowDownward sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  endDecorator={
                    !headCell.numeric ? (
                      <ArrowDownward sx={{ opacity: active ? 1 : 0 }} />
                    ) : null
                  }
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        active && order === "desc"
                          ? "rotate(0deg)"
                          : "rotate(180deg)",
                    },
                    "&:hover": { "& svg": { opacity: 1 } },
                  }}
                >
                  {headCell.label}
                  {active ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </Link>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
