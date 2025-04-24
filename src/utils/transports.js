import {
  AccessTime,
  CheckCircle,
  ThumbDownOffAlt
} from "@mui/icons-material";

export const transportStatus = {
  pending: {
    icon: <AccessTime />,
    text: "Em aprovação",
    color: "warning",
  },
  approved: {
    text: "Aguardando confirmação",
    color: "primary",
  },
  rejected: {
    icon: <ThumbDownOffAlt />,
    text: "Recusado",
    color: "danger",
  },
  confirmed: {
    icon: <CheckCircle />,
    text: "Confirmado",
    color: "success",
  },
};
