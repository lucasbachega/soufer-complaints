import { DirectionsBusOutlined, PeopleAltOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Chip,
  DialogContent,
  Divider,
  Drawer,
  ModalClose,
  Stack,
  Typography,
} from "@mui/joy";
import React, { memo, useMemo } from "react";
import DetailItem from "../../../components/modals/occurrence-view/components/DetailItem";
import { formatDate, formatMoment } from "../../../utils/date_functions";
import { transportStatus } from "../../../utils/transports";
import ApproveButton from "./components/ApproveButton";
import ConfirmButton from "./components/ConfirmButton";
import RejectButton from "./components/RejectButton";

const ModalViewTransport = ({
  open,
  data = {},
  onClose = () => {},
  onRefresh = () => {},
  readOnly,
  role,
}) => {
  const waypoints = useMemo(
    () => data?.points?.filter((item) => item !== data?.to),
    [data]
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e, reason) => reason === "backdropClick" && onClose()}
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(0px)" } },
        content: {
          sx: {
            width: "100%",
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <ModalClose onClick={onClose} sx={{ zIndex: 100 }} />
      <DialogContent sx={{ p: 3 }}>
        <DirectionsBusOutlined color="primary" sx={{ fontSize: "3rem" }} />
        <Typography mt={2} fontWeight={"md"} color="neutral" level="title-sm">
          Solicitação de transporte
        </Typography>
        <Typography fontWeight={"lg"} level="h3">
          <Typography component={"span"} color="neutral" fontWeight={"md"}>
            Para:
          </Typography>{" "}
          {data?.to}
        </Typography>
        {Boolean(waypoints?.length) && (
          <>
            <Stack mt={1} borderLeft={3} borderColor={"divider"} pl={2}>
              <Typography
                gutterBottom
                fontWeight={"md"}
                level="title-sm"
                color="neutral"
              >
                Passando por:
              </Typography>
              {waypoints?.map((item, idx) => (
                <Typography
                  gutterBottom
                  key={idx?.toString()}
                  fontWeight={"lg"}
                  level="title-md"
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </>
        )}

        {role === "personal" && (
          <>
            {data?.status === "approved" && (
              <Alert sx={{ mt: 2 }} variant="soft" color="primary">
                <div>
                  <Box fontWeight={"lg"} fontSize={".9rem"}>
                    Transporte aprovado
                  </Box>
                  <Typography level="body-sm" color={"neutral"}>
                    Sua solicitação foi aprovada por {data?.user?.name || "--"}{" "}
                    e está aguardando a confirmação da transportadora.
                  </Typography>
                </div>
              </Alert>
            )}
            {data?.status === "confirmed" && (
              <Alert sx={{ mt: 2 }} variant="soft" color="success">
                <div>
                  <Box fontWeight={"lg"} fontSize={".9rem"}>
                    Transporte confirmado
                  </Box>
                  <Typography level="body-sm" color={"neutral"}>
                    Sua solicitação foi confirmada pela transporadora.
                  </Typography>
                </div>
              </Alert>
            )}
            {data?.status === "rejected" && (
              <Alert sx={{ mt: 2 }} variant="soft" color="danger">
                <div>
                  <Box fontWeight={"lg"} fontSize={".9rem"}>
                    Transporte rejeitado
                  </Box>
                  <Stack gap={0.5} mt={1}>
                    <DetailItem
                      width={120}
                      label={"Responsável"}
                      value={data?.user?.name || "--"}
                    />
                    <DetailItem
                      width={120}
                      label={"Motivo"}
                      value={data?.rejectionReason || "Não informado"}
                    />
                  </Stack>
                </div>
              </Alert>
            )}
          </>
        )}
        <Box
          mt={2}
          border={1}
          borderColor={"divider"}
          borderRadius={"md"}
          p={2}
        >
          <Typography fontWeight={"md"} level="title-lg" color="neutral">
            Detalhes
          </Typography>
          <Stack mt={2} gap={1}>
            <DetailItem
              width={120}
              label={"Ida"}
              value={formatMoment(data?.time)}
            />
            <DetailItem
              width={120}
              label={"Volta"}
              value={data?.timeReturn && formatMoment(data?.timeReturn) }
            />
            <DetailItem
              width={120}
              label={"Pessoas"}
              value={
                <Chip
                  variant="soft"
                  color="primary"
                  startDecorator={<PeopleAltOutlined />}
                >
                  {data?.people}
                </Chip>
              }
            />
            <DetailItem width={120} label={"Turno"} value={data?.shift} />
            <DetailItem width={120} label={"Observações"} value={data?.notes} />
            <DetailItem
              width={120}
              label={"Solicitante"}
              value={data?.user?.name}
            />
            <DetailItem
              width={120}
              label={"Status"}
              color={transportStatus[data?.status]?.color}
              value={transportStatus[data?.status]?.text}
            />
            <DetailItem
              width={120}
              label={"Solicitado em"}
              value={formatDate(data?.created_at)}
            />
          </Stack>
        </Box>
      </DialogContent>
      {role !== "personal" && (
        <>
          <Divider />
          <Stack p={2} direction={"row"} alignItems={"center"} sx={{ gap: 1 }}>
            {role === "approver" && (
              <ApproveButton
                transportId={data?._id}
                onClose={onClose}
                onRefresh={onRefresh}
              />
            )}
            {role === "carrier" && (
              <ConfirmButton
                transportId={data?._id}
                onClose={onClose}
                onRefresh={onRefresh}
              />
            )}
            <RejectButton
              transportId={data?._id}
              onClose={onClose}
              onRefresh={onRefresh}
            />
            <Box flex={1} />
            <Chip
              variant="soft"
              color={transportStatus[data?.status]?.color}
              size="lg"
              startDecorator={transportStatus[data?.status]?.icon}
            >
              {role === "approver"
                ? "Para aprovar"
                : role === "carrier"
                ? "Para confirmar"
                : transportStatus[data?.status]?.text}
            </Chip>
          </Stack>
        </>
      )}
    </Drawer>
  );
};

export default memo(ModalViewTransport);
