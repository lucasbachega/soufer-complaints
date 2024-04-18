import { Box, Button, Stack, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AttachItem from "./AttachItem";
import { AttachmentOutlined } from "@mui/icons-material";

const AttachBox = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
        ...prev,
      ]);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <AttachItem filename={file.name} key={file.name} preview={file.preview} />
  ));

  return (
    <Box
      border={1}
      borderColor={"divider"}
      borderRadius={"sm"}
      bgcolor={"#FFF"}
      flex={1}
      p={2}
    >
      <Stack mb={0.7} direction={"row"} alignItems={"center"} gap={2}>
        <AttachmentOutlined />
        <Typography level={"h3"}>Anexos</Typography>
      </Stack>
      <Typography color="neutral" level={"title-sm"}>
        Carregue arquivos dos tipos, PNG, JPEG ou WEBAPP
      </Typography>
      {Boolean(thumbs?.length) && (
        <Box
          mt={2}
          display={"flex"}
          alignItems={"flex-start"}
          gap={2}
          flexWrap={"wrap"}
        >
          {thumbs}
        </Box>
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
    </Box>
  );
};

export default AttachBox;
