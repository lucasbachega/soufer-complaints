import { AttachFileOutlined } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/joy";
import React, { memo } from "react";
import { formatDate } from "../../../utils/date_functions";
import { occurrenceStatus } from "../../../utils/occurrences";

const DefaultCell = memo(({ children, textProps, cellProps }) => {
  return (
    <td {...cellProps}>
      <Tooltip
        title={children}
        size="sm"
        variant="outlined"
        placement="bottom-start"
        arrow
      >
        <Typography {...textProps} noWrap level="body-xs">
          {children}
        </Typography>
      </Tooltip>
    </td>
  );
});

const TableItem = ({ row = {}, onClick, isSelected, type = "complaint" }) => {
  return (
    <tr
      key={row.id}
      onClick={() => onClick(row)}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#DDE7EE" : undefined,
      }}
    >
      <DefaultCell textProps={{ ml: "6px" }}>
        {formatDate(row.created_at)}
      </DefaultCell>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={occurrenceStatus[row.status]?.icon}
          color={occurrenceStatus[row.status]?.color}
        >
          {occurrenceStatus[row.status]?.text}
        </Chip>
      </td>

      {type === "insecurity" && (
        <>
          <DefaultCell>{row.problem}</DefaultCell>
          <DefaultCell>{row.detection}</DefaultCell>
          <DefaultCell>{row.local}</DefaultCell>
          <DefaultCell>{row.area}</DefaultCell>
        </>
      )}

      {type === "complaint" && (
        <>
          <DefaultCell>{row.categoria?.text}</DefaultCell>
          <DefaultCell>{row.produto?.text}</DefaultCell>
          <DefaultCell>{row.cliente}</DefaultCell>
          <DefaultCell>{row.representante}</DefaultCell>
        </>
      )}
      <DefaultCell>{row.unidade?.text}</DefaultCell>
      <DefaultCell>{row.setor?.text}</DefaultCell>
      {type === "complaint" && (
        <>
          <DefaultCell>{row.ordem_venda}</DefaultCell>
        </>
      )}

      <DefaultCell>
        {Boolean(row.anexos?.length) && (
          <Chip
            variant="outlined"
            size="sm"
            startDecorator={<AttachFileOutlined />}
          >
            {row.anexos?.length}
          </Chip>
        )}
      </DefaultCell>
    </tr>
  );
};

export default memo(TableItem);
