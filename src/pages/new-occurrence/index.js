import { Box, Container } from "@mui/joy";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscartModal from "../../components/modals/DiscartModal";
import { occurrenceInitialState } from "../../utils/state_models";
import Appbar from "./components/Appbar";
import AttachBox from "./components/AttachBox";
import OccurrenceForm from "./components/OccurrenceForm";

export default (props) => {
  const navigate = useNavigate();

  const [changed, setChanged] = useState(false);
  const [data, setData] = useState(occurrenceInitialState);

  const onCancel = useCallback(() => {
    if (changed) {
      DiscartModal.show(() => navigate(-1));
      return;
    }
    navigate(-1);
  }, [changed]);

  const handleChangeValue = useCallback((prop, value) => {
    setData((prev) => ({ ...prev, [prop]: value }));
    setChanged(true);
  }, []);

  const isOk = useMemo(() => {
    return Object.values(data)?.every(Boolean);
  }, [data]);

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar onCancel={onCancel} isOk={isOk} />
      <Box flex={1} flexBasis={0} overflow={"auto"} p={4} pt={"30px"}>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}
        >
          <OccurrenceForm data={data} onChangeValue={handleChangeValue} />
          <AttachBox />
        </Container>
      </Box>
      <DiscartModal />
    </Box>
  );
};
