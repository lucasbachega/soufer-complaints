import { EditOutlined } from "@mui/icons-material";
import { Chip } from "@mui/joy";

function ToggleStatus() {
  return (
    <>
      <Chip
        variant="outlined"
        sx={{ position: "absolute", right: 50, top: 12 }}
        startDecorator={<EditOutlined />}
        onClick={() => {}}
      >
        Em aberto
      </Chip>
    </>
  );
}

export default ToggleStatus;
