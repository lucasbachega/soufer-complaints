import {
  Add,
  ArrowBack,
  DirectionsBus,
  EmojiTransportation,
  Person,
  RefreshOutlined,
  Rule,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemDecorator,
  Tab,
  tabClasses,
  TabList,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/joy";
import React, { memo } from "react";
import { useSearchParams } from "react-router-dom";
import UserIndicator from "../../home/components/UserIndicator";

const TabNumber = ({ children }) => {
  if (!children) return;
  return (
    <Box
      component={"span"}
      width={20}
      height={20}
      borderRadius={100}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={(t) => t.palette.primary[100]}
    >
      <Typography component={"span"} fontWeight={600} fontSize={".8rem"}>
        {children}
      </Typography>
    </Box>
  );
};

const Appbar = ({
  onClose = () => {},
  loading,
  onRefresh = () => {},
  openNew = () => {},
  stats = {},
}) => {
  const [params, setParams] = useSearchParams();

  const tab = params.get("tab") || "personal";

  return (
    <Box zIndex={100} borderBottom={1} borderColor={"divider"}>
      <Box
        px={{ xs: 1, md: 2 }}
        py={1}
        pb={0}
        bgcolor={"#FFF"}
        display={"flex"}
        alignItems={"center"}
        gap={1}
      >
        <IconButton size="md" onClick={onClose}>
          <ArrowBack />
        </IconButton>
        <Avatar
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          color="primary"
          variant="soft"
          size="md"
        >
          <DirectionsBus />
        </Avatar>
        <Typography sx={{ fontSize: { xs: "17px", md: "20px" } }} level={"h3"}>
          Transporte coletivo
        </Typography>
        <Box flex={1} />
        <UserIndicator
          disableExit
          disableUsername
          sx={{
            height: 35,
            pr: 2,
            boxShadow: "none",
            display: { xs: "none", lg: "flex" },
          }}
        />
        <Tooltip title="Atualizar">
          <IconButton disabled={loading} onClick={onRefresh}>
            <RefreshOutlined />
          </IconButton>
        </Tooltip>
        <Button
          sx={{ px: 2, ml: 1, display: { xs: "none", md: "flex" } }}
          startDecorator={<Add />}
          onClick={openNew}
        >
          Solicitar transporte
        </Button>
      </Box>
      <Tabs
        variant="plain"
        size="md"
        aria-label="Scrollable tabs"
        defaultValue={"personal"}
        value={tab}
        onChange={(e, v) => {
          params.set("tab", v.toString());
          setParams(params);
        }}
        sx={{
          pl: { xs: 1, md: "6.4em" },
          border: "none",
          width: "100%",

          [`&& .${tabClasses.root}`]: {
            fontWeight: "500",
            bgcolor: "#FFF",
            borderRadius: 100,
            "&:hover": {
              bgcolor: (t) => t.palette.primary[100],
            },
            "&::after": {
              bgcolor: "#FFF",
            },
            [`&.${tabClasses.selected}`]: {
              color: "primary.plainColor",
              "&::after": {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                bgcolor: "primary.500",
              },
            },
          },
        }}
      >
        <TabList
          underlinePlacement="none"
          sx={{
            fontSize: ".925rem",
            height: 40,
            overflow: "auto",
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Tab
            sx={{ flex: "none", scrollSnapAlign: "start" }}
            value={"personal"}
          >
            <ListItemDecorator>
              <Person />
            </ListItemDecorator>
            Minhas solicitações <TabNumber>{stats?.personal}</TabNumber>
          </Tab>
          <Tab
            sx={{ flex: "none", scrollSnapAlign: "start" }}
            value={"approver"}
          >
            <ListItemDecorator>
              <Rule />
            </ListItemDecorator>
            Para aprovar <TabNumber>{stats?.approver}</TabNumber>
          </Tab>
          <Tab
            sx={{ flex: "none", scrollSnapAlign: "start" }}
            value={"carrier"}
          >
            <ListItemDecorator>
              <EmojiTransportation />
            </ListItemDecorator>
            Transportadora <TabNumber>{stats?.carrier}</TabNumber>
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};

export default memo(Appbar);
