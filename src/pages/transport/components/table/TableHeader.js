import { ArrowDownward } from "@mui/icons-material";
import { Box, Link } from "@mui/joy";
import { visuallyHidden } from "@mui/utils";
import React, { memo } from "react";

const headCells = [
  {
    id: "created_at",
    numeric: false,
    disablePadding: true,
    label: "Solicitado em",
    width: "100px",
    roles: ["personal", "approver", "carrier"],
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    roles: ["approver", "carrier"],
    label: "Solicitante",
  },
  {
    id: "to",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Destino",
  },
  {
    id: "time",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Dia/Horário (Ida)",
  },
  {
    id: "timeReturn",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Dia/Horário (Volta)",
  },
  {
    id: "people",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Pessoas",
    width: "52px",
  },
  {
    id: "shift",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Turno",
    width: "100px",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Status",
    width: "140px",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    roles: ["personal", "approver", "carrier"],
    label: "Observações",
  },
];

const TableHeader = ({ order, orderBy, onRequestSort, role }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells
          .filter((item) => item.roles.includes(role))
          .map((headCell) => {
            const active = orderBy === headCell.id;
            return (
              <th
                key={headCell.id}
                style={{ width: headCell.width || "130px" }}
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
