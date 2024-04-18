import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import TextInput from "../../../components/inputs/TextInput";
import TextArea from "../../../components/inputs/TextInputArea";
import CategoriesSelector from "../../../components/inputs/selectors/CategoriesSelector";
import ProductsSelector from "../../../components/inputs/selectors/ProductsSelector";
import SectorsSelector from "../../../components/inputs/selectors/SectorsSelector";
import UnitsSelector from "../../../components/inputs/selectors/UnitsSelector";
import { occurrenceInitialState } from "../../../utils/state_models";

const OccurrenceForm = ({
  data = occurrenceInitialState,
  onChangeValue = (prop = "", value = "") => {},
}) => {
  return (
    <Box
      border={1}
      borderColor={"divider"}
      p={2}
      borderRadius={"sm"}
      bgcolor={"#FFF"}
      flex={{ xs: undefined, md: 1 }}
      width={"100%"}
    >
      <Typography gutterBottom level={"h3"}>
        Preencha os campos
      </Typography>
      <Typography color="neutral" level={"title-sm"}>
        * Campos obrigatórios
      </Typography>
      <Stack mt={3} spacing={2}>
        <UnitsSelector
          value={data?.unit}
          onChange={(v) => onChangeValue("unit", v)}
        />
        <TextInput
          value={data?.customer}
          onChange={(v) => onChangeValue("customer", v)}
          label={"Cliente"}
          required
        />
        <TextInput
          value={data?.representative}
          onChange={(v) => onChangeValue("representative", v)}
          label={"Representante"}
          required
        />
        <TextInput
          value={data?.salesOrder}
          onChange={(v) => onChangeValue("salesOrder", v)}
          label={"Ordem de venda / Renomeio"}
          required
        />
        <SectorsSelector
          value={data?.sector}
          onChange={(v) => onChangeValue("sector", v)}
        />
        <ProductsSelector
          value={data?.product}
          onChange={(v) => onChangeValue("product", v)}
        />
        <CategoriesSelector
          value={data?.category}
          onChange={(v) => onChangeValue("category", v)}
        />
        <TextArea
          value={data?.reason}
          onChange={(v) => onChangeValue("reason", v)}
          label={"Motivo"}
          placeholder={"Descreva o motivo da ocorrência"}
          required
        />
      </Stack>
    </Box>
  );
};

export default OccurrenceForm;
