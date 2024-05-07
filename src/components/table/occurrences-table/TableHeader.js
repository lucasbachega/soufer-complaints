import { Tooltip, Typography } from "@mui/joy";
import React, { memo } from "react";

const ColumnCell = memo(({ children, thStyle, thProps, width = 180 }) => {
  return (
    <th
      style={{
        fontSize: ".8rem",
        width,
        padding: "12px 6px",
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

const TableHeader = ({}) => {
  return (
    <thead>
      <tr>
        <ColumnCell
          width={130}
          thStyle={{
            padding: "12px 12px",
          }}
        >
          Data
        </ColumnCell>
        <ColumnCell width={120}>Status</ColumnCell>
        <ColumnCell>Unidade</ColumnCell>
        <ColumnCell>Cliente</ColumnCell>
        <ColumnCell>Representante</ColumnCell>
        <ColumnCell>Ordem de venda</ColumnCell>
        <ColumnCell>Setor</ColumnCell>
        <ColumnCell>Produto</ColumnCell>
        <ColumnCell>Categoria</ColumnCell>
        <ColumnCell width={100}>Anexo</ColumnCell>
      </tr>
    </thead>
  );
};

export default TableHeader;
