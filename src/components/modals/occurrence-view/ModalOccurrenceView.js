import { AttachmentOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { HttpClient } from "../../../api/httpClient";
import { formatMoment } from "../../../utils/date_functions";
import SaveInput from "../../inputs/SaveInput";
import DetailItem from "./components/DetailItem";
import FilesSection from "./components/FilesSection";
import ToggleStatus from "./components/ToggleStatus";

const ModalOccurrenceView = ({
  open,
  data = {},
  onClose,
  updateData = () => {},
}) => {
  return (
    <Modal
      open={open}
      slotProps={{ backdrop: { sx: { backdropFilter: "blur(1px)" } } }}
    >
      <ModalOverflow sx={{ overflowY: "scroll", overflowX: "hidden" }}>
        <ModalDialog maxWidth={"sm"} minWidth={"sm"} layout={"center"}>
          <ModalClose onClick={onClose} />
          <Typography lineHeight={1} level="body-sm" color="neutral">
            Ocorrência: {data?.id}
          </Typography>
          <Typography lineHeight={1} level="h4" color="neutral">
            {formatMoment(data?.created_at)}
          </Typography>
          <Typography lineHeight={1} level="h2">
            {data?.categoria?.text}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <ToggleStatus
            initialStatus={data?.status}
            occurrenceId={data?.id}
            onUpdate={(newValue) =>
              updateData({
                id: data?.id,
                changes: {
                  status: newValue,
                },
              })
            }
          />
          <Stack direction={"column"} gap={2}>
            <SaveInput
              inputProps={{
                label: "Análise de causa",
                placeholder: "Adicione notas sobre a causa...",
              }}
              initialValue={data?.causa}
              onSave={async (value) =>
                await HttpClient.admin.updateOcorrencia(data?.id, {
                  causa: value,
                })
              }
              onSuccess={(newValue) =>
                updateData({
                  id: data?.id,
                  changes: {
                    causa: newValue,
                  },
                })
              }
            />
            <SaveInput
              inputProps={{
                label: "Ação de correção",
                placeholder: "Adicione notas sobre a correção...",
              }}
              initialValue={data?.correcao}
              onSave={async (value) =>
                await HttpClient.admin.updateOcorrencia(data?.id, {
                  correcao: value,
                })
              }
              onSuccess={(newValue) =>
                updateData({
                  id: data?.id,
                  changes: {
                    correcao: newValue,
                  },
                })
              }
            />
          </Stack>
          <Stack pb={2} mt={2} direction={"column"} gap={2}>
            <DetailItem label={"Unidade"} value={data?.unidade?.text} />
            <DetailItem label={"Cliente"} value={data?.cliente} />
            <DetailItem label={"Representante"} value={data?.representante} />
            <DetailItem label={"Ordem de venda"} value={data?.order_venda} />
            <DetailItem label={"Setor"} value={data?.setor?.text} />
            <DetailItem label={"Produto"} value={data?.produto?.text} />
            <DetailItem label={"Categoria"} value={data?.categoria?.text} />
            <DetailItem label={"Motivo"} value={data?.reason} />
          </Stack>
          <Stack direction="row" alignItems={"center"} gap={2}>
            <AttachmentOutlined />
            <Typography level="h3">Anexos ({data?.anexos?.length})</Typography>
          </Stack>
          <Box pb={5}>
            {Boolean(data?.anexos?.length) ? (
              <FilesSection
                occurrenceId={data?._id}
                files={data?.anexos || []}
              />
            ) : (
              <Typography fontStyle={"italic"} color="neutral" level="body-md">
                Nenhum anexo adicionado
              </Typography>
            )}
          </Box>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default memo(ModalOccurrenceView);
