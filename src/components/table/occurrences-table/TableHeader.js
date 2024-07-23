import { ArrowDownward } from "@mui/icons-material";
import { Box, Link, Tooltip, Typography } from "@mui/joy";
import { visuallyHidden } from "@mui/utils";
import React, { memo } from "react";

const headCells = [
  {
    id: "created_at",
    numeric: false,
    disablePadding: true,
    label: "Data",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "unidadeTexto",
    numeric: false,
    disablePadding: false,
    label: "Unidade",
  },
  {
    id: "cliente",
    numeric: false,
    disablePadding: false,
    label: "Cliente",
  },
  {
    id: "representante",
    numeric: false,
    disablePadding: false,
    label: "Representante",
  },
  {
    id: "ordem_venda",
    numeric: false,
    disablePadding: false,
    label: "Ordem de venda",
  },
  {
    id: "setorTexto",
    numeric: false,
    disablePadding: false,
    label: "Setor",
  },
  {
    id: "produtoTexto",
    numeric: false,
    disablePadding: false,
    label: "Produto",
  },
  {
    id: "categoriaTexto",
    numeric: false,
    disablePadding: false,
    label: "Categoria",
  },
  {
    id: "anexos",
    numeric: false,
    disablePadding: false,
    label: "Anexos",
  },
];

const ColumnCell = memo(({ children, thStyle, thProps, width = 180 }) => {
  return (
    <th
      style={{
        fontSize: ".8rem",
        width,
        ...thStyle,
      }}
      {...thProps}
    >
      <Tooltip title={children} size="sm" variant="outlined" arrow>
        <Typography level="body-xs">{children}</Typography>
      </Tooltip>
    </th>
  );
});

const TableHeader = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => {
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
