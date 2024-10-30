import { Box } from "@mui/joy";
import { useNavigate, useSearchParams } from "react-router-dom";
import Appbar from "./components/Appbar";
import ByMeSection from "./sections/ByMeSection";
import PendingSection from "./sections/PendingSection";

export default () => {
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  const tab = params.get("tab") || "by_me";

  const onClose = () => navigate("/home");

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"}>
      <Appbar onClose={onClose} onRefresh={() => {}} loading={false} />
      <Box my={1} />
      {tab === "by_me" && <ByMeSection />}
      {tab === "pending" && <PendingSection />}
    </Box>
  );
};
