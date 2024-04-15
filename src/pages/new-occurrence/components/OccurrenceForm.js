import { Box, Stack, Typography } from "@mui/joy";
import React from "react";
import SelectInput from "../../../components/SelectInput";
import TextInput from "../../../components/TextInput";
import TextArea from "../../../components/TextInputArea";

const OccurrenceForm = () => {
  return (
    <Box
      border={1}
      borderColor={"divider"}
      p={2}
      borderRadius={"sm"}
      bgcolor={"#FFF"}
      flex={1}
    >
      <Typography gutterBottom level={"h3"}>
        Preencha os campos
      </Typography>
      <Typography color="neutral" level={"title-sm"}>
        * Campos obrigatórios
      </Typography>
      <Stack mt={3} spacing={2}>
        <SelectInput
          required
          label={"Unidade"}
          placeholder={"Selecione uma unidade"}
          options={[
            { label: "Cambuí", value: "1" },
            { label: "São João BV", value: "2" },
          ]}
        />
        <TextInput label={"Cliente"} required />
        <TextInput label={"Representante"} required />
        <TextInput label={"Ordem de venda / Renomeio"} required />
        <TextInput label={"Setor"} required />
        <TextInput label={"Produto"} required />
        <TextInput label={"Categoria da ocorrência"} required />
        <TextArea
          label={"Motivo"}
          placeholder={"Descreva o motivo da ocorrência"}
          required
        />
      </Stack>
    </Box>
  );
};

export default OccurrenceForm;
