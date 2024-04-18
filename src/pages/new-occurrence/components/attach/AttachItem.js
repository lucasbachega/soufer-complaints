import {
  Close,
  DeleteOutlineOutlined,
  RemoveOutlined,
} from "@mui/icons-material";
import { IconButton, Box, Tooltip } from "@mui/joy";
import Zoom from "react-medium-image-zoom";

function AttachItem({ preview, filename }) {
  return (
    <Box
      border={1}
      width={200}
      height={"auto"}
      borderColor={"divider"}
      borderRadius={"md"}
      overflow={"hidden"}
      position={"relative"}
      boxShadow={"sm"}
      component={"div"}
      title={filename}
    >
      <Tooltip title="Remover">
        <IconButton
          variant="solid"
          sx={{ position: "absolute", zIndex: 10, top: 5, right: 5 }}
        >
          <DeleteOutlineOutlined />
        </IconButton>
      </Tooltip>
      <Zoom>
        <img src={preview} width={"100%"} />
      </Zoom>
    </Box>
  );
}

export default AttachItem;
