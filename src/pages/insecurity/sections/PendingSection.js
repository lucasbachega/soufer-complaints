import { AccessTime, CheckCircleOutlineOutlined } from "@mui/icons-material";
import {
    Box,
    ListItemDecorator,
    Stack,
    Tab,
    tabClasses,
    TabList,
    Tabs,
} from "@mui/joy";
import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import InsecurityActionItem from "../../../components/table/occurrences-table/components/InsecurityActionItem";

const PendingSection = () => {
  const [status, setStatus] = useState("pending");

  const [data, setData] = useState([
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
    {
      id: nanoid(),
      title:
        "Realizar construção para material v4, ativar item Lorem imspusm dsas kque sdsa consegue teste titulo unisversal grande.",
      createdAt: new Date().toISOString(),
      fromDate: new Date().toISOString(),
      toDate: new Date().toISOString(),
      assignBy: {
        name: "Lucas Bachega",
        email: "lucas.cbachega@gmail.com",
      },
      files: [],
    },
  ]);

  return (
    <Box mt={-2} flex={1} flexBasis={0} overflow={"auto"}>
      <Stack direction={"row"} p={2}>
        <Tabs
          aria-label="tabs"
          value={status}
          onChange={(e, v) => setStatus(v)}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            disableUnderline
            sx={{
              p: 0.5,
              gap: 0.5,
              fontWeight: "500",
              borderRadius: "lg",
              bgcolor: "primary.100",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            <Tab value={"pending"} disableIndicator>
              <ListItemDecorator>
                <AccessTime />
              </ListItemDecorator>
              Pendentes
            </Tab>
            <Tab value={"completed"} disableIndicator>
              <ListItemDecorator>
                <CheckCircleOutlineOutlined />
              </ListItemDecorator>
              Concluídas
            </Tab>
          </TabList>
        </Tabs>
      </Stack>

      <Box
        p={3}
        pt={0}
        pb={"100px"}
        sx={{
          display: "grid",
          gridGap: "10px",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px,1fr))",
          gridAutoRows: "auto",
        }}
      >
        {data?.map((item) => (
          <InsecurityActionItem key={item?.id} data={item} />
        ))}
      </Box>
    </Box>
  );
};

export default PendingSection;
