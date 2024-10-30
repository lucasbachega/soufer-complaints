import { AttachmentOutlined } from "@mui/icons-material";
import { Box, Divider, FormControl, Stack, Typography } from "@mui/joy";
import React from "react";
import { occurrenceStatus } from "../../../../utils/occurrences";
import TextInputArea from "../../../inputs/TextInputArea";
import DetailItem from "../../occurrence-view/components/DetailItem";
import FilesSection from "../../occurrence-view/components/FilesSection";

const DetailsSection = ({ data = {}, readOnly, onChangeValue = () => {} }) => {
  return (
    <>
      <Stack gap={3}>
        {data?.status === "rejected" && (
          <FormControl>
            <TextInputArea
              minRows={1}
              readOnly={readOnly}
              autoFocus={!readOnly}
              onChange={(v) => {
                onChangeValue("motivoRej", v);
              }}
              value={data?.motivoRej}
              label="Motivo da rejeição"
              placeholder={"Descreva o motivo da rejeição..."}
              sx={{ py: 1 }}
            />
          </FormControl>
        )}
        <Box>
          <Typography color="neutral" gutterBottom level="title-sm">
            Problema
          </Typography>
          <Typography level="body-md" fontWeight={600}>
            {data?.problem}
          </Typography>
        </Box>
        <Box>
          <Typography color="neutral" gutterBottom level="title-sm">
            Sugestão de solução
          </Typography>
          <Typography level="body-md" fontWeight={600}>
            {data?.solutionObs}
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack pb={3} direction={"column"} gap={1}>
        <DetailItem label={"Status"} value={occurrenceStatus[data?.status]?.text} />
        <DetailItem label={"Unidade"} value={data?.unidade?.text} />
        <DetailItem label={"Setor"} value={data?.setor?.text} />
        <DetailItem label={"Detecção"} value={data?.detection} />
        <DetailItem label={"Local"} value={data?.local} />
        <DetailItem label={"Área"} value={data?.area} />
      </Stack>
      <Stack direction="row" alignItems={"center"} gap={2}>
        <AttachmentOutlined />
        <Typography level="h3">Anexos ({data?.anexos?.length})</Typography>
      </Stack>
      <Box pb={5}>
        {Boolean(data?.anexos?.length) ? (
          <FilesSection occurrenceId={data?._id} files={data?.anexos || []} />
        ) : (
          <Typography fontStyle={"italic"} color="neutral" level="body-md">
            Nenhum anexo adicionado
          </Typography>
        )}
      </Box>
    </>
  );
};

export default DetailsSection;
