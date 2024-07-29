import { AttachmentOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo, useCallback, useEffect, useState } from "react";
import { HttpClient } from "../../../api/httpClient";
import { formatMoment } from "../../../utils/date_functions";
import TextInputArea from "../../inputs/TextInputArea";
import AppendableField from "./components/AppendableField";
import DetailItem from "./components/DetailItem";
import FilesSection from "./components/FilesSection";
import ToggleStatus from "./components/ToggleStatus";

const ModalOccurrenceView = ({
  open,
  data = {},
  onClose,
  updateData = () => {},
  readOnly,
  role = "admin",
}) => {
  const [loading, setLoading] = useState(false);
  const [copyData, setCopyData] = useState(null);
  const [causaFiles, setCausaFiles] = useState([]);
  const [correcaoFiles, setCorrecaoFiles] = useState([]);

  useEffect(() => {
    if (data) {
      setCopyData({ ...data });
    }
  }, [data]);

  const handleChangeValue = useCallback(
    (field, value) => setCopyData((prev) => ({ ...prev, [field]: value })),
    []
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await HttpClient[role].updateOcorrencia(data?.id, {
        ...copyData,
      });
      updateData({
        id: data?.id,
        changes: copyData,
      });
      console.log(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (!copyData || !data) return;

  return (
    <Modal
      open={open}
      slotProps={{ backdrop: { sx: { backdropFilter: "blur(1px)" } } }}
    >
      <ModalDialog maxWidth={"sm"} minWidth={"sm"} layout={"center"}>
        <ModalClose onClick={onClose} sx={{ zIndex: 100 }} />
        <Stack
          borderRadius={"sm"}
          m={-2.5}
          p={2.5}
          py={1.5}
          boxShadow={"sm"}
          direction={"row"}
          alignItems={"flex-end"}
          zIndex={70}
          bgcolor={"#FFF"}
          gap={1}
        >
          <Box flex={1}>
            <Typography level="body-xs" fontWeight={"sm"} color="neutral">
              {copyData?.id}
            </Typography>
            <Typography level="h5" fontWeight={"lg"} color="neutral">
              {formatMoment(copyData?.created_at)}
            </Typography>
            <Typography level="h3">{copyData?.categoria?.text}</Typography>
          </Box>
          <ToggleStatus
            readOnly={readOnly}
            status={copyData?.status}
            onChange={handleChangeValue}
          />
        </Stack>
        <DialogContent sx={{ position: "relative", p: 0, pt: 3, pr: 3, m: 0 }}>
          <Stack direction={"column"} gap={2}>
            {copyData?.status === "rejected" && (
              <FormControl>
                <TextInputArea
                  minRows={1}
                  autoFocus
                  onChange={(v) => {
                    handleChangeValue("motivoRejeicao", v);
                  }}
                  value={copyData?.motivoRejeicao}
                  label="Motivo da rejeição"
                  placeholder={"Descreva o motivo da rejeição..."}
                  sx={{ py: 1 }}
                />
              </FormControl>
            )}
            <AppendableField
              readOnly={readOnly}
              inputProps={{
                label: "Análise de causa",
                placeholder: readOnly
                  ? "Nada sobre a causa"
                  : "Adicione notas sobre a causa...",
              }}
              fieldName={"causa"}
              value={copyData?.causa}
              onChange={handleChangeValue}
              files={causaFiles}
              onFilesChange={setCausaFiles}
            />
            <AppendableField
              readOnly={readOnly}
              inputProps={{
                label: "Ação de correção",
                placeholder: readOnly
                  ? "Nada sobre a correção"
                  : "Adicione notas sobre a correção...",
              }}
              fieldName={"correcao"}
              value={copyData?.correcao}
              onChange={handleChangeValue}
              files={correcaoFiles}
              onFilesChange={setCorrecaoFiles}
            />
          </Stack>

          <Stack py={3} direction={"column"} gap={2}>
            <DetailItem label={"Unidade"} value={data?.unidade?.text} />
            <DetailItem label={"Cliente"} value={data?.cliente} />
            <DetailItem label={"Representante"} value={data?.representante} />
            <DetailItem label={"Ordem de venda"} value={data?.ordem_venda} />
            <DetailItem label={"Setor"} value={data?.setor?.text} />
            <DetailItem label={"Produto"} value={data?.produto?.text} />
            <DetailItem label={"Categoria"} value={data?.categoria?.text} />
            <DetailItem label={"Motivo"} value={data?.motivo} />
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
        </DialogContent>
        {!readOnly && (
          <>
            <Divider />
            <DialogActions sx={{ height: 25, pb: 1 }}>
              <Button
                onClick={handleSave}
                size="sm"
                loading={loading}
                disabled={loading}
              >
                Salvar
              </Button>
              <Button size="sm" variant="plain">
                Cancelar
              </Button>
              <Box flex={1} />
            </DialogActions>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default memo(ModalOccurrenceView);
