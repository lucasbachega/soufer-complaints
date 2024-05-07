/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import * as React from "react";

import { List, Typography } from "@mui/joy";
import LoadingScreen from "../../loading/LoadingScreen";
import Filterbar from "./Filterbar";
import UnitItem from "./UnitItem";

export default function Unitstable({ data = [], getData = () => {}, loading }) {
  const [modalView, setModalView] = React.useState(null);

  const handleClickRow = React.useCallback((row) => setModalView(row), []);

  const renderRows = React.useCallback((row) => {
    return <UnitItem key={row.id} row={row} onClick={handleClickRow} />;
  }, []);

  return (
    <React.Fragment>
      <Filterbar />
      <Box flex={1} display={"flex"} flexBasis={0} sx={{ p: 3, pb: 5, pt: 0 }}>
        <Box flex={1}>
          {loading ? (
            <LoadingScreen />
          ) : data?.length ? (
            <List
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {data.map(renderRows)}
            </List>
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
                Nenhuma unidade encontrada
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}
