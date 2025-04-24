/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import * as React from "react";

import { DirectionsBusOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/joy";
import { useMediaQuery, useTheme } from "@mui/material";
import LoadingScreen from "../../../../components/loading/LoadingScreen";
import { ToggleListMode } from "../../../../components/table/occurrences-table/Filterbar";
import ModalViewTransport from "../../view/ModalViewTransport";
import TableHeader from "./TableHeader";
import CardItem from "./item/CardItem";
import TableItem from "./item/TableItem";

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

export default function TransportsTable({
  data = [],
  getData = () => {},
  loading,
  sx,
  role,
}) {
  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [viewMode, setViewMode] = React.useState("cards");

  React.useEffect(() => {
    if (isSmall) {
      setViewMode("cards");
    }
  }, [isSmall]);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created_at");

  const [modalView, setModalView] = React.useState(null);

  const handleClickRow = React.useCallback(setModalView, []);

  const renderRows = React.useCallback(
    (row) => {
      if (viewMode === "cards") {
        return (
          <CardItem
            key={row?._id}
            row={row}
            onClick={handleClickRow}
            isSelected={row?._id === modalView?._id}
            role={role}
          />
        );
      } else {
        return (
          <TableItem
            key={row?._id}
            row={row}
            role={role}
            onClick={handleClickRow}
            isSelected={row?._id === modalView?._id}
          />
        );
      }
    },
    [viewMode, modalView?._id, role]
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
      <Stack
        p={3}
        pb={0}
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
      >
        <ToggleListMode value={viewMode} onChange={setViewMode} />
      </Stack>
      <Box
        mt={2}
        flex={1}
        display={"flex"}
        flexBasis={0}
        sx={{ p: 3, pb: 3, pt: 0, ...sx }}
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
                    <DirectionsBusOutlined
                      color="disabled"
                      sx={{ fontSize: "4rem", mb: 2 }}
                    />
                    <Typography
                      textAlign={"center"}
                      level="title-lg"
                      color="neutral"
                    >
                      Nenhum transporte solicitado
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
              variant="plain"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 0,
                borderRadius: "md",
                flex: 1,
                flexBasis: 0,
                overflow: "auto",
                boxShadow: "md",
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
                    role={role}
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
                  <DirectionsBusOutlined
                    color="disabled"
                    sx={{ fontSize: "4rem", mb: 2 }}
                  />
                  <Typography
                    textAlign={"center"}
                    level="title-lg"
                    color="neutral"
                  >
                    Nenhum transporte solicitado
                  </Typography>
                </Box>
              )}
            </Sheet>
          </>
        )}
      </Box>
      {Boolean(modalView) && (
        <ModalViewTransport
          data={modalView}
          open={Boolean(modalView)}
          onClose={() => setModalView(null)}
          onRefresh={getData}
          role={role}
        />
      )}
    </React.Fragment>
  );
}
