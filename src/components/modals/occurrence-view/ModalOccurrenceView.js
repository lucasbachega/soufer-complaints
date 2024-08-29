import { AttachmentOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogContent,
  Divider,
  Drawer,
  FormControl,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";
import { formatMoment } from "../../../utils/date_functions";
import { getFileUrl } from "../../../utils/images";
import TextInputArea from "../../inputs/TextInputArea";
import DiscartModal from "../DiscartModal";
import AppendableField from "./components/AppendableField";
import DetailItem from "./components/DetailItem";
import FilesSection from "./components/FilesSection";
import ToggleStatus from "./components/ToggleStatus";

const formatFiles = (files = [], occurrenceId) => {
  return files?.map((file) => ({
    ...file,
    preview: getFileUrl(occurrenceId, file?.filename),
  }));
};

const ModalOccurrenceView = ({
  open,
  data = {},
  onClose,
  onRefresh = () => {},
  readOnly,
  role = "admin",
}) => {
  const dispatch = useDispatch();

  const filterAndFormatFiles = (type) => {
    if (!data) return [];
    const files = data?.admin_anexos?.filter((item) => item?.type === type);
    return files?.length
      ? formatFiles(
          files.map((item) => ({ ...item, uploaded: true })),
          data?.id
        )
      : [];
  };

  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [copyData, setCopyData] = useState({ ...(data || {}) });
  const [causaFiles, setCausaFiles] = useState(filterAndFormatFiles("causa"));
  const [correcaoFiles, setCorrecaoFiles] = useState(
    filterAndFormatFiles("correcao")
  );
  const [toDeleteFiles, setToDeleteFiles] = useState([]);

  const isOk = useRef(false);

  useEffect(() => {
    const timeoutIsOk = setTimeout(() => {
      isOk.current = true;
    }, 500);
    return () => {
      clearTimeout(timeoutIsOk);
      isOk.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOk.current) {
      setChanged(true);
    }
  }, [causaFiles, correcaoFiles, copyData, toDeleteFiles]);

  const handleClose = () => {
    if (changed && !readOnly) {
      DiscartModal.show(() => onClose());
      return;
    }
    isOk.current = false;
    setChanged(false);
    onClose();
  };

  const handleToDeleteFilesChange = useCallback((filename) => {
    setToDeleteFiles((prev) => [...prev, filename]);
  }, []);

  const handleChangeValue = useCallback((field, value) => {
    setCopyData((prev) => ({ ...prev, [field]: value }));
    setChanged(true);
  }, []);

  //rating
  const handleChangeRating = useCallback((type, newRating) => {
    let changes = {};
    if (type === "causa") {
      changes.ratingCausa = newRating;
    } else if (type === "correcao") {
      changes.ratingCorrecao = newRating;
    }
    setCopyData((prev) => ({ ...prev, ...changes }));
    onRefresh();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      await HttpClient[role].updateOcorrencia(data?.id, {
        ...copyData,
        deleteAdminAnexos: toDeleteFiles,
      });

      const uploadFiles = async (files, type) => {
        if (files?.length) {
          const res = await HttpClient[role].uploadOcorrenciaArquivos({
            files,
            occurrenceId: data?.id,
            type,
          });
          return res?.ok ? res?.anexos || [] : [];
        }
        return [];
      };

      const toUploadCausaFiles = causaFiles?.filter((item) => !item?.uploaded);
      const toUploadCorrecaoFiles = correcaoFiles?.filter(
        (item) => !item?.uploaded
      );

      await uploadFiles(toUploadCausaFiles, "causa");
      await uploadFiles(toUploadCorrecaoFiles, "correcao");

      onRefresh();
      onClose();
      dispatch(openSnackbar({ message: "Ocorrência salva" }));
    } catch (error) {
      dispatch(setError({ title: "Erro ao salvar ocorrência", error }));
    } finally {
      setLoading(false);
    }
  };

  if (!copyData || !data) return;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e, reason) => reason === "backdropClick" && handleClose()}
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(0px)" } },
        content: {
          sx: {
            p: 2.5,
            width: "100%",
            maxWidth: 800,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <ModalClose onClick={handleClose} sx={{ zIndex: 100 }} />
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
      <DialogContent sx={{ position: "relative", p: 0, pt: 5, pr: 3, m: 0 }}>
        <Stack direction={"column"} gap={3}>
          {copyData?.status === "rejected" && (
            <FormControl>
              <TextInputArea
                minRows={1}
                readOnly={readOnly}
                autoFocus={!readOnly}
                onChange={(v) => {
                  handleChangeValue("motivoRej", v);
                }}
                value={copyData?.motivoRej}
                label="Motivo da rejeição"
                placeholder={"Descreva o motivo da rejeição..."}
                sx={{ py: 1 }}
              />
            </FormControl>
          )}
          <AppendableField
            readOnly={readOnly}
            answerBy={copyData?.answerBy || null}
            inputProps={{
              label: "Análise de causa",
              placeholder: readOnly
                ? "Nada sobre a causa"
                : "Adicione notas sobre a causa...",
            }}
            fieldName={"causa"}
            value={copyData?.causa}
            onChange={handleChangeValue}
            onToDeleteFilesChange={handleToDeleteFilesChange}
            files={causaFiles}
            onFilesChange={setCausaFiles}
            showRating={data?.status === "completed"}
            rating={data?.ratingCausa}
            occurrenceId={data?.id}
            type="causa"
            onChangeRating={handleChangeRating}
          />
          <AppendableField
            readOnly={readOnly}
            answerBy={copyData?.answerBy || null}
            inputProps={{
              label: "Ação de correção",
              placeholder: readOnly
                ? "Nada sobre a correção"
                : "Adicione notas sobre a correção...",
            }}
            fieldName={"correcao"}
            value={copyData?.correcao}
            onChange={handleChangeValue}
            onToDeleteFilesChange={handleToDeleteFilesChange}
            files={correcaoFiles}
            onFilesChange={setCorrecaoFiles}
            showRating={data?.status === "completed"}
            rating={data?.ratingCorrecao}
            occurrenceId={data?.id}
            type="correcao"
            onChangeRating={handleChangeRating}
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
            <FilesSection occurrenceId={data?._id} files={data?.anexos || []} />
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
          <Box
            mb={-1}
            sx={{ display: "flex", alignItems: "center", gap: 1, pt: 1 }}
          >
            <Button
              onClick={handleSave}
              size="sm"
              loading={loading}
              disabled={loading || !changed}
            >
              Salvar
            </Button>
            <Button onClick={handleClose} size="sm" variant="plain">
              Fechar
            </Button>
            <Box flex={1} />
            <Typography level="body-xs" fontWeight={"sm"} color="neutral">
              {copyData?.id}
            </Typography>
          </Box>
        </>
      )}
      <DiscartModal />
    </Drawer>
  );
};

export default memo(ModalOccurrenceView);
