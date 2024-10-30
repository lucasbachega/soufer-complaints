import {
  CampaignOutlined,
  ReportGmailerrorredOutlined,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import TextInput from "../../../components/inputs/TextInput";
import TextArea from "../../../components/inputs/TextInputArea";
import CategoriesSelector from "../../../components/inputs/selectors/CategoriesSelector";
import ProductsSelector from "../../../components/inputs/selectors/ProductsSelector";
import SectorsSelector from "../../../components/inputs/selectors/SectorsSelector";
import UnitsSelector from "../../../components/inputs/selectors/UnitsSelector";
import DetectionSelector from "../../../components/inputs/selectors/insecurity/DetectionSelector";
import { occurrenceInitialState } from "../../../utils/state_models";

const OccurrenceForm = ({
  data = occurrenceInitialState,
  onChangeValue = (prop = "", value = "") => {},
  loading,
  type,
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
      {type === "complaint" ? (
        <CampaignOutlined color="primary" sx={{ fontSize: "2rem" }} />
      ) : (
        <ReportGmailerrorredOutlined
          color="primary"
          sx={{ fontSize: "2rem" }}
        />
      )}
      <Typography mt={1} gutterBottom level={"h3"}>
        {type === "complaint" ? "Nova reclamação" : "Relatar prática insegura"}
      </Typography>
      <Typography color="neutral" level={"body-sm"}>
        * Campos obrigatórios
      </Typography>
      <Stack mt={3} spacing={2}>
        {type === "complaint" && (
          <>
            <TextArea
              autoFocus
              disabled={loading}
              value={data?.reason}
              onChange={(v) => onChangeValue("reason", v)}
              label={"Motivo"}
              placeholder={"Descreva o motivo da reclamação"}
              required
              minRows={4}
            />
            <UnitsSelector
              disabled={loading}
              value={data?.unit}
              onChange={(v) => onChangeValue("unit", v)}
            />
            <TextInput
              disabled={loading}
              value={data?.customer}
              onChange={(v) => onChangeValue("customer", v)}
              label={"Cliente"}
              required
            />
            <TextInput
              disabled={loading}
              value={data?.salesOrder}
              onChange={(v) => onChangeValue("salesOrder", v)}
              label={"Ordem de venda"}
              required
            />
            <SectorsSelector
              disabled={loading}
              value={data?.sector}
              onChange={(v) => onChangeValue("sector", v)}
            />
            <ProductsSelector
              disabled={loading}
              value={data?.product}
              onChange={(v) => onChangeValue("product", v)}
            />
            <CategoriesSelector
              disabled={loading}
              value={data?.category}
              onChange={(v) => onChangeValue("category", v)}
            />
          </>
        )}

        {type === "insecurity" && (
          <>
            <TextArea
              autoFocus
              disabled={loading}
              value={data?.problem}
              onChange={(v) => onChangeValue("problem", v)}
              label={"Problema"}
              placeholder={"Fale mais sobre o problema"}
              required
              minRows={4}
            />
            <TextArea
              minRows={4}
              disabled={loading}
              value={data?.solutionObs}
              onChange={(v) => onChangeValue("solutionObs", v)}
              label={"Sugestão de solução (opcional)"}
              placeholder={"Descreva uma possível solução"}
            />
            <UnitsSelector
              disabled={loading}
              value={data?.unit}
              onChange={(v) => onChangeValue("unit", v)}
            />
            <SectorsSelector
              disabled={loading}
              value={data?.sector}
              onChange={(v) => onChangeValue("sector", v)}
            />
            <DetectionSelector
              disabled={loading}
              value={data?.detection}
              onChange={(v) => onChangeValue("detection", v)}
            />
            <TextInput
              label={"Local"}
              required
              disabled={loading}
              value={data?.local}
              onChange={(v) => onChangeValue("local", v)}
            />
            <TextInput
              label={"Área"}
              required
              disabled={loading}
              value={data?.area}
              onChange={(v) => onChangeValue("area", v)}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default OccurrenceForm;
