import { Box, Container, LinearProgress } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HttpClient } from "../../api/httpClient";
import DiscartModal from "../../components/modals/DiscartModal";
import { fetchCategories } from "../../store/reducers/occurrenceCategoriesSlice";
import { fetchProducts } from "../../store/reducers/productsSlice";
import { fetchSectors } from "../../store/reducers/sectorsSlice";
import { fetchUnits } from "../../store/reducers/unitsSlice";
import {
  insecurityRequiredFields,
  occurrenceInitialState,
} from "../../utils/state_models";
import Appbar from "./components/Appbar";
import AttachBox from "./components/attach/AttachBox";
import CompletedModal from "./components/CompletedModal";
import ErrorModal from "./components/ErrorModal";
import OccurrenceForm from "./components/OccurrenceForm";
import SelectType from "./components/SelectType";

export default (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  const step = params?.get("step") || "1";
  const type = params?.get("type") || "";

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

  const handleChangeType = useCallback(
    (value) => {
      params.set("type", value);
      params.set("step", "2");
      setData(occurrenceInitialState);
      setChanged(false);
      setParams(params);
    },
    [params]
  );

  const onCancel = useCallback(() => {
    if (changed) {
      DiscartModal.show(() => navigate(type ? -2 : -1));
      return;
    }
    navigate(type ? -2 : -1);
  }, [changed, type]);

  const handleChangeValue = useCallback((prop, value) => {
    setData((prev) => ({ ...prev, [prop]: value }));
    setChanged(true);
  }, []);

  const isOk = useMemo(() => {
    if (type === "insecurity") {
      let requiredData = {};
      insecurityRequiredFields.forEach((field) => {
        requiredData[field] = data[field];
      });
      return Object.values(requiredData)?.every(Boolean);
    }
    if (type === "complaint") {
      return Object.values(data)?.every(Boolean);
    }

    return false;
  }, [data, type]);

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
      type,
      setor: data.sector,
      unidade: data.unit,
      //
      categoria: data.category,
      cliente: data.customer,
      motivo: data.reason,
      ordem_venda: data.salesOrder,
      produto: data.product,

      //
      problem: data.problem || "",
      solutionObs: data.solutionObs || "",
      detection: data.detection || "",
      area: data.area || "",
      local: data.local || "",
    });
    if (res.ok) {
      if (files?.length) {
        await HttpClient.uploadArquivos({
          files,
          occurrenceId: res?.ocorrencia?._id,
        });
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
        type={type}
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
          {step === "1" && (
            <SelectType type={type} onChange={handleChangeType} />
          )}
          {step === "2" && Boolean(type) && (
            <>
              <OccurrenceForm
                type={type}
                data={data}
                loading={loading}
                onChangeValue={handleChangeValue}
              />
              <AttachBox
                files={files}
                addFiles={handleAddFiles}
                onRemoveFile={handleRemoveFile}
              />
            </>
          )}
        </Container>
      </Box>
      <DiscartModal />
      <CompletedModal
        open={completed}
        onClose={() => setCompleted(false)}
        onFinish={() => {
          setCompleted(false);
          navigate("/home");
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
