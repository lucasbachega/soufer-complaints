/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import * as React from "react";

import { List, Typography } from "@mui/joy";
import LoadingScreen from "../../loading/LoadingScreen";
import ProductItem from "./ProductItem";

export default function ProductsTable({
  data = [],
  onRemoveRow = () => {},
  loading,
}) {
  const renderRows = React.useCallback(
    (row) => {
      return <ProductItem key={row.id} row={row} onRemove={onRemoveRow} />;
    },
    [onRemoveRow]
  );

  return (
    <React.Fragment>
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
                Nenhum produto encontrado
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}
