/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import * as React from "react";

import { Typography } from "@mui/joy";
import { useMediaQuery, useTheme } from "@mui/material";
import LoadingScreen from "../../loading/LoadingScreen";
import ModalOccurrenceView from "../../modals/occurrence-view/ModalOccurrenceView";
import Filterbar from "./Filterbar";
import OccurrenceListCard from "./OccurrenceListCard";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function OccurrencesTable({
  data = [],
  getData = () => {},
  loading,
  filters = {},
  onChangeFilters,
  sx,
  readOnly,
  role = "admin",
}) {
  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [viewMode, setViewMode] = React.useState(isSmall ? "cards" : "table");

  React.useEffect(() => {
    if (isSmall) {
      setViewMode("cards");
    }
  }, [isSmall]);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created_at");

  const [modalView, setModalView] = React.useState(null);

  const handleClickRow = React.useCallback((row) => setModalView(row), []);

  const renderRows = React.useCallback(
    (row) => {
      if (viewMode === "cards") {
        return (
          <OccurrenceListCard
            key={row.id}
            row={row}
            onClick={handleClickRow}
            isSelected={row?.id === modalView?.id}
          />
        );
      } else {
        return (
          <TableItem
            key={row.id}
            row={row}
            onClick={handleClickRow}
            isSelected={row?.id === modalView?.id}
          />
        );
      }
    },
    [viewMode, modalView?.id]
  );

  const handleRequestSort = React.useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  return (
    <React.Fragment>
      <Filterbar
        onChange={onChangeFilters}
        filters={filters}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <Box
        flex={1}
        display={"flex"}
        flexBasis={0}
        sx={{ p: 3, pb: 5, pt: 0, ...sx }}
      >
        {viewMode === "cards" ? (
          <Box width={"100%"}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {data?.length ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridGap: "10px",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(340px,1fr))",
                      gridAutoRows: "auto",
                    }}
                    width={"100%"}
                  >
                    {data.map(renderRows)}
                  </Box>
                ) : (
                  <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={1}
                    height={400}
                  >
                    <Typography
                      textAlign={"center"}
                      level="title-lg"
                      color="neutral"
                    >
                      Nenhuma ocorrência encontrada
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>
        ) : (
          <>
            <Sheet
              className="OrderTableContainer"
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 0,
                borderRadius: "sm",
                flex: 1,
                flexBasis: 0,
                overflow: "auto",
                minHeight: 0,
              }}
            >
              {loading ? (
                <LoadingScreen />
              ) : data?.length ? (
                <Table
                  aria-labelledby="tableTitle"
                  stickyHeader
                  hoverRow
                  noWrap
                  sx={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    "--TableCell-headBackground":
                      "var(--joy-palette-background-level1)",
                    "--Table-headerUnderlineThickness": "1px",
                    "--TableRow-hoverBackground":
                      "var(--joy-palette-background-level1)",
                    "--TableCell-paddingY": "10px",
                  }}
                >
                  <TableHeader
                    onRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                  />
                  <tbody>
                    {stableSort(data, getComparator(order, orderBy))?.map(
                      renderRows
                    )}
                  </tbody>
                </Table>
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={1}
                  height={400}
                >
                  <Typography
                    textAlign={"center"}
                    level="title-lg"
                    color="neutral"
                  >
                    Nenhuma ocorrência encontrada
                  </Typography>
                </Box>
              )}
            </Sheet>
          </>
        )}
      </Box>
      {Boolean(modalView) && (
        <ModalOccurrenceView
          data={modalView}
          open={Boolean(modalView)}
          onClose={() => setModalView(null)}
          onRefresh={getData}
          readOnly={readOnly}
          role={role}
        />
      )}
    </React.Fragment>
  );
}
