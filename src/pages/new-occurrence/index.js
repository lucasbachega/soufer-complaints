import { Box, Container } from "@mui/joy";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscartModal from "../../components/modals/DiscartModal";
import { occurrenceInitialState } from "../../utils/state_models";
import Appbar from "./components/Appbar";
import OccurrenceForm from "./components/OccurrenceForm";
import AttachBox from "./components/attach/AttachBox";

export default (props) => {
  const navigate = useNavigate();

  const [changed, setChanged] = useState(false);
  const [data, setData] = useState(occurrenceInitialState);
  const [files, setFiles] = useState([]);

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

  const handleAddFiles = useCallback((newFiles = []) => {
    setFiles((prev) => {
      return [...newFiles, ...prev];
    });
  }, []);

  const handleRemoveFile = useCallback((fileId = "") => {
    setFiles((prev) => {
      return [...prev?.filter((file) => file.id !== fileId)];
    });
  }, []);

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar onCancel={onCancel} isOk={isOk} />
      <Box
        flex={1}
        flexBasis={0}
        height={"100%"}
        overflow={"auto"}
        p={{ xs: 0, md: 4 }}
        pt={{ xs: "20px", md: "30px" }}
      >
        <Container
          maxWidth="lg"
          sx={{
            pb: 7,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            gap: { xs: 2, md: 4 },
          }}
        >
          <OccurrenceForm data={data} onChangeValue={handleChangeValue} />
          <AttachBox
            files={files}
            addFiles={handleAddFiles}
            onRemoveFile={handleRemoveFile}
          />
        </Container>
      </Box>
      <DiscartModal />
    </Box>
  );
};
