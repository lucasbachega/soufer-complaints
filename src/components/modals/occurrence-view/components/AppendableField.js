import { AttachmentOutlined } from "@mui/icons-material";
import { Box, Button, FormControl, Stack, Typography } from "@mui/joy";
import { ImageList } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AttachItem from "../../../../pages/new-occurrence/components/attach/AttachItem";
import { getBlob } from "../../../../utils/images";
import TextInputArea from "../../../inputs/TextInputArea";

function AppendableField({
  inputProps,
  value = "",
  onChange = () => {},
  fieldName,
  onFilesChange = () => {},
  files = [],
  readOnly,
}) {
  const handleDropFiles = async (acceptedFiles) => {
    let prepared = [];
    for (let index = 0; index < acceptedFiles.length; index++) {
      const file = acceptedFiles[index];
      const blob = await getBlob(file);
      const fileId = nanoid(5);
      try {
        const data = {
          id: fileId,
          filename: file.path,
          preview: URL.createObjectURL(file),
          type: file.type,
          blob: new Blob([blob], { type: file.type }),
        };
        prepared.push(data);
      } catch (error) {}
    }
    if (prepared && prepared.length) {
      onFilesChange(prepared);
    }
  };

  const handleRemoveFile = useCallback(
    (fileId = "") => {
      onFilesChange([...files?.filter((file) => file.id !== fileId)]);
    },
    [files]
  );

  const { getRootProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: handleDropFiles,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <AttachItem
      id={file.id}
      filename={file.name}
      key={file.id}
      preview={file.preview}
      onRemove={handleRemoveFile}
    />
  ));

  return (
    <FormControl>
      <TextInputArea
        minRows={1}
        onChange={(v) => {
          if (!fieldName || readOnly) return;
          onChange(fieldName, v);
        }}
        value={value}
        {...inputProps}
        sx={{ py: 1 }}
        readOnly={readOnly}
        labelRightContent={
          readOnly && (
            <Typography component={"span"} color="neutral" level="body-xs">
              Editado por: <strong>André Martins</strong>
            </Typography>
          )
        }
        endDecorator={
          <Box width={"100%"}>
            {Boolean(thumbs?.length) && (
              <Box>
                <ImageList sx={{ p: 1 }} variant="masonry" cols={3} gap={8}>
                  {thumbs}
                </ImageList>
              </Box>
            )}
            {!readOnly && (
              <Stack width={"100%"} direction={"row"} gap={1}>
                <Box flex={1} />
                <div {...getRootProps({ className: "dropzone" })}>
                  <Button
                    size="sm"
                    variant="plain"
                    startDecorator={<AttachmentOutlined />}
                  >
                    Anexar
                  </Button>
                </div>
              </Stack>
            )}
          </Box>
        }
      />
    </FormControl>
  );
}

export default AppendableField;
