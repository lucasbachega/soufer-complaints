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
      {children}
    </th>
  );
});

const TableHeader = ({}) => {
  return (
    <thead>
      <tr>
        <ColumnCell>Nome</ColumnCell>
        <ColumnCell>Criada em</ColumnCell>
        <ColumnCell></ColumnCell>
      </tr>
    </thead>
  );
};

export default TableHeader;
