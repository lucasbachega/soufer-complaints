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
import React from "react";
import { formatMoment } from "../../utils/date_functions";
import TextArea from "../inputs/TextInputArea";

const ModalOccurrenceView = ({ open, data, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog minWidth={"sm"} maxWidth={"sm"} layout={"center"}>
          <ModalClose />
          <Typography lineHeight={1} level="title-sm" color="neutral">
            Ocorrência: {data?.id}
          </Typography>
          <Typography lineHeight={1} level="h3" color="neutral">
            {formatMoment(data?.date)}
          </Typography>
          <Typography lineHeight={1} level="h2">
            Atraso na entrega
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Chip
            variant="outlined"
            sx={{ position: "absolute", right: 50, top: 12 }}
            startDecorator={<EditOutlined />}
            onClick={() => {}}
          >
            Em aberto
          </Chip>
          <Stack direction={"column"} gap={2}>
            <TextArea
              minRows={1}
              label={"Análise de causa"}
              endDecorator={
                <Stack width={"100%"} direction={"row"} gap={1}>
                  <Box flex={1} />
                  <Button size="sm" variant="plain">
                    Cancelar
                  </Button>
                  <Button size="sm">Salvar</Button>
                </Stack>
              }
            />
            <TextArea
              minRows={1}
              label={"Ação de correção"}
              endDecorator={
                <Stack width={"100%"} direction={"row"} gap={1}>
                  <Box flex={1} />
                  <Button size="sm" variant="plain">
                    Cancelar
                  </Button>
                  <Button size="sm">Salvar</Button>
                </Stack>
              }
            />
          </Stack>
          <Stack pb={5} mt={2} direction={"column"} gap={2}>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Unidade
              </Typography>
              <Typography flex={1} level="title-sm">
                1103 - Cambuí
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Cliente
              </Typography>
              <Typography flex={1} level="title-sm">
                Str participações
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Representante
              </Typography>
              <Typography flex={1} level="title-sm">
                Matheus
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Ordem de venda
              </Typography>
              <Typography flex={1} level="title-sm">
                442520 / 458423
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Setor
              </Typography>
              <Typography flex={1} level="title-sm">
                --
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Produto
              </Typography>
              <Typography flex={1} level="title-sm">
                Telha
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Categoria
              </Typography>
              <Typography flex={1} level="title-sm">
                Atraso na entrega
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography color="neutral" width={150} level="title-sm">
                Motivo
              </Typography>
              <Typography flex={1} level="title-sm">
                Material não foi entregue no prazo combinado com o cliente,
                material ainda consta em carregamento.{" "}
              </Typography>
            </Stack>
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default ModalOccurrenceView;
