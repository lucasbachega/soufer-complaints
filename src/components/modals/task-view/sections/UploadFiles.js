import { AttachmentOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { ImageList } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HttpClient } from "../../../../api/httpClient";
import AttachItem from "../../../../pages/new-occurrence/components/attach/AttachItem";
import { getBlob } from "../../../../utils/images";
import LoadingScreen from "../../../loading/LoadingScreen";

const UploadFiles = ({
  initialFiles = [],
  taskId,
  loading,
  onRefresh = () => {},
}) => {
  const [files, setFiles] = useState(initialFiles || []);

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
      } catch (error) {
        console.log(error);
      }
    }
    if (prepared && prepared.length) {
      const res = await HttpClient.uploadArquivosTask({
        taskId,
        files: prepared,
      });
      if (res?.ok) {
        onRefresh();
        setFiles((prev) => prev.concat(prepared));
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: handleDropFiles,
  });

  useEffect(() => {
    setFiles(initialFiles || []);
  }, [initialFiles]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <AttachItem
      id={file.id}
      filename={file.filename}
      key={file.id}
      preview={file.preview}
      onRemove={null}
    />
  ));

  return (
    <Box
      border={1}
      borderColor={"divider"}
      borderRadius={"sm"}
      bgcolor={"#FFF"}
      p={2}
      mt={2}
      width={"100%"}
    >
      <Stack mb={0.7} direction={"row"} alignItems={"center"} gap={2}>
        <AttachmentOutlined />
        <Typography level={"h3"}>Anexos</Typography>
      </Stack>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Typography color="neutral" level={"title-sm"}>
            Carregue arquivos dos tipos, PNG, JPEG ou WEBAPP
          </Typography>
          {Boolean(thumbs?.length) && (
            <ImageList sx={{ mt: 2 }} variant="masonry" cols={3} gap={8}>
              {thumbs}
            </ImageList>
          )}
          <Box
            component={"div"}
            borderRadius={2}
            mt={3}
            p={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={1}
            border={(t) => `2px dotted ${t.palette.divider}`}
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            <Typography level="title-md">Arraste os arquivos aqui</Typography>
            <Typography level="title-md">ou</Typography>
            <Button>Fazer upload</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UploadFiles;
