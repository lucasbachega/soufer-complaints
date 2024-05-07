import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { formatMoment } from "../../../utils/date_functions";
import TextArea from "../../inputs/TextInputArea";
import ToggleStatus from "./components/ToggleStatus";
import SaveInput from "../../inputs/SaveInput";
import { HttpClient } from "../../../api/httpClient";

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
        <ModalDialog minWidth={"sm"} layout={"center"}>
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
          <Stack pb={5} mt={2} direction={"column"} gap={2}>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Unidade
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.unidade?.text || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Cliente
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.cliente || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Representante
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.representante || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Ordem de venda
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.order_venda || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Setor
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.setor?.text || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Produto
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.produto?.text || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Categoria
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.categoria?.text || "--"}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Motivo
              </Typography>
              <Typography flex={1} level="title-sm">
                {data?.reason || "--"}
              </Typography>
            </Stack>
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default memo(ModalOccurrenceView);
