/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import * as React from "react";

import { nanoid } from "@reduxjs/toolkit";
import ModalOccurrenceView from "../../modals/occurrence-view/ModalOccurrenceView";
import Filterbar from "./Filterbar";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import LoadingScreen from "../../loading/LoadingScreen";
import { Typography } from "@mui/joy";

export default function OccurrencesTable({
  data = [],
  getData = () => {},
  onUpdateOccurrence = ({ id = "", changes = {} }) => {},
  loading,
  filters = {},
  onChangeFilters,
}) {
  const [modalView, setModalView] = React.useState(null);

  const handleClickRow = React.useCallback((row) => setModalView(row), []);

  const renderRows = React.useCallback((row) => {
    return <TableItem key={row.id} row={row} onClick={handleClickRow} />;
  }, []);

  return (
    <React.Fragment>
      <Filterbar onChange={onChangeFilters} filters={filters} />
      <Box flex={1} display={"flex"} flexBasis={0} sx={{ p: 3, pb: 5, pt: 0 }}>
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
              sx={{
                position: "sticky",
                top: 0,
                left: 0,
                "--TableCell-headBackground":
                  "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground":
                  "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "15px",
              }}
            >
              <TableHeader />
              <tbody>{data.map(renderRows)}</tbody>
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
              <Typography textAlign={"center"} level="title-lg" color="neutral">
                Nenhuma ocorrência encontrada
              </Typography>
            </Box>
          )}
        </Sheet>
      </Box>
      <ModalOccurrenceView
        data={modalView}
        open={Boolean(modalView)}
        onClose={() => setModalView(null)}
        updateData={onUpdateOccurrence}
      />
    </React.Fragment>
  );
}
