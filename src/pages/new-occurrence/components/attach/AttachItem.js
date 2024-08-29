import { DeleteOutlineOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/joy";
import { ImageListItem } from "@mui/material";
import Zoom from "react-medium-image-zoom";

function AttachItem({ preview, filename, onRemove = () => {}, id }) {
  return (
    <ImageListItem
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
      }}
      title={filename}
    >
      {onRemove && (
        <Tooltip title="Remover">
          <IconButton
            onClick={() => onRemove(id)}
            variant="solid"
            sx={{ position: "absolute", zIndex: 10, top: 5, right: 5 }}
          >
            <DeleteOutlineOutlined />
          </IconButton>
        </Tooltip>
      )}
      <Zoom>
        <img src={preview} width={"100%"} />
      </Zoom>
    </ImageListItem>
  );
}

export default AttachItem;
