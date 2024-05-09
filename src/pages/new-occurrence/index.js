import { Box, Container, LinearProgress } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../../api/httpClient";
import DiscartModal from "../../components/modals/DiscartModal";
import { fetchCategories } from "../../store/reducers/occurrenceCategoriesSlice";
import { fetchProducts } from "../../store/reducers/productsSlice";
import { fetchSectors } from "../../store/reducers/sectorsSlice";
import { fetchUnits } from "../../store/reducers/unitsSlice";
import { occurrenceInitialState } from "../../utils/state_models";
import Appbar from "./components/Appbar";
import CompletedModal from "./components/CompletedModal";
import ErrorModal from "./components/ErrorModal";
import OccurrenceForm from "./components/OccurrenceForm";
import AttachBox from "./components/attach/AttachBox";

export default (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchSectors());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
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

  const handleCreate = async () => {
    setError(null);
    setLoading(true);
    const res = await HttpClient.registrarOcorrencia({
      categoria: data.category,
      cliente: data.customer,
      motivo: data.reason,
      ordem_venda: data.salesOrder,
      produto: data.product,
      representante: data.representative,
      setor: data.sector,
      unidade: data.unit,
    });
    if (res.ok) {
      if (files?.length) {
        const uploadRes = await HttpClient.uploadArquivos({
          files,
          occurrenceId: res?.ocorrencia?._id,
        });
        console.log(uploadRes);
      }
      setCompleted(true);
    } else {
      setError(res?.error?.message);
    }

    setLoading(false);
  };

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar
        onCancel={onCancel}
        isOk={isOk}
        loading={loading}
        onCreate={handleCreate}
      />
      {loading && (
        <div>
          <LinearProgress variant="soft" />
        </div>
      )}
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
          <OccurrenceForm
            data={data}
            loading={loading}
            onChangeValue={handleChangeValue}
          />
          <AttachBox
            files={files}
            addFiles={handleAddFiles}
            onRemoveFile={handleRemoveFile}
          />
        </Container>
      </Box>
      <DiscartModal />
      <CompletedModal
        open={completed}
        onClose={() => setCompleted(false)}
        onFinish={() => {
          setCompleted(false);
          navigate(-1);
        }}
      />
      <ErrorModal
        open={Boolean(error)}
        error={error}
        onClose={() => setError(null)}
        onRetry={() => {
          setError(null);
          handleCreate();
        }}
      />
    </Box>
  );
};
