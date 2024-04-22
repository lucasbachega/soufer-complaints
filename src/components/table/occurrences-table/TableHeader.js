import React from "react";

const TableHeader = ({}) => {
  return (
    <thead>
      <tr>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 12px" }}>
          Data
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Status
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Unidade
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Cliente
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Representante
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Or. de venda
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Setor
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Produto
        </th>
        <th style={{ width: 120, fontSize: ".8rem", padding: "12px 6px" }}>
          Categoria
        </th>
        <th style={{ width: 100, fontSize: ".8rem", padding: "12px 6px" }}>
          Anexo
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
