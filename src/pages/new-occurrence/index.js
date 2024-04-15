import { Box, Container } from "@mui/joy";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "./components/Appbar";
import AttachBox from "./components/AttachBox";
import OccurrenceForm from "./components/OccurrenceForm";

export default (props) => {
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(-1), []);

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar onCancel={onCancel} />
      <Box flex={1} flexBasis={0} overflow={"auto"} p={4} pt={"30px"}>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}
        >
          <OccurrenceForm />
          <AttachBox />
        </Container>
      </Box>
    </Box>
  );
};
