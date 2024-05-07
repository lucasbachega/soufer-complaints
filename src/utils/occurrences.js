import { AutorenewRounded, CheckCircle } from "@mui/icons-material";

export const occurrenceStatus = {
  open: {
    icon: <AutorenewRounded />,
    text: "Aberto",
    color: "neutral",
  },
  completed: {
    icon: <CheckCircle />,
    text: "Concluído",
    color: "success",
  },
};
