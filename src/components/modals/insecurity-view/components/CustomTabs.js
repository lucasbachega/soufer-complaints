import { NotesOutlined, PersonAddOutlined } from "@mui/icons-material";
import { Tab, tabClasses, TabList, Tabs } from "@mui/joy";
import React from "react";

const CustomTabs = ({ tab, onChange = () => {} }) => {
  return (
    <Tabs
      size="sm"
      aria-label="Disabled tabs"
      defaultValue={"by_me"}
      value={tab}
      onChange={(e, v) => {
        onChange(v);
      }}
      sx={{
        mt: 1,
        ml: 3,
        mb: -1.5,
        [`&& .${tabClasses.root}`]: {
          flex: "initial",
          fontWeight: "500",
          bgcolor: "#FFF",
          "&:hover": {
            bgcolor: "#FFF",
          },
          "&::after": {
            bgcolor: "#FFF",
          },
          [`&.${tabClasses.selected}`]: {
            color: "primary.plainColor",
            "&::after": {
              height: 2,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              bgcolor: "primary.500",
            },
          },
        },
      }}
    >
      <TabList disableUnderline>
        <Tab value={0}>
          <NotesOutlined /> Detalhes
        </Tab>
        <Tab value={1}>
          <PersonAddOutlined /> Atruibuir tarefas
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default CustomTabs;
