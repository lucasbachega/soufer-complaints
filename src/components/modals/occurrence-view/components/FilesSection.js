import { ImageList } from "@mui/material";
import React, { memo } from "react";
import AttachItem from "../../../../pages/new-occurrence/components/attach/AttachItem";
import { getFileUrl } from "../../../../utils/images";

const FilesSection = ({ files = [], occurrenceId }) => {
  const thumbs = files.map((file) => (
    <AttachItem
      id={file?.filename}
      filename={file?.originalname}
      key={file?.filename}
      preview={getFileUrl(occurrenceId, file?.filename)}
      onRemove={null}
    />
  ));

  return (
    <ImageList sx={{ mt: 2 }} variant="masonry" cols={3} gap={8}>
      {thumbs}
    </ImageList>
  );
};

export default memo(FilesSection);
