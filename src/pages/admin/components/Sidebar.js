import {
  AssignmentOutlined,
  BusinessCenterOutlined,
  BusinessOutlined,
  CategoryOutlined,
  HomeOutlined,
  InventoryOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/joy";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo/soufer-logo.png";
import AccountBox from "./AccountBox";
import SidebarItem from "./SidebarItem";

const isSelected = (link, pathname) => {
  return new RegExp(`${link}`).test(pathname);
};

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <Box
      width={"16em"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"#FFF"}
      boxShadow={"sm"}
      position={"relative"}
    >
      <Tooltip placement="right" title="Página inicial">
        <IconButton
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 10, right: 15 }}
        >
          <HomeOutlined />
        </IconButton>
      </Tooltip>
      <Box p={2} pt={3}>
        <img width={"110px"} src={Logo} />
        <Typography mt={1} level="h4">
          Portal de ocorrências
        </Typography>
        <Typography color="neutral" level="title-md">
          ADMINISTRADOR
        </Typography>
      </Box>
      <Box flex={1} flexBasis={0} height={"100%"} overflow={"auto"}>
        <List sx={{ p: 2, pt: 0, gap: 0.5 }}>
          <Divider sx={{ mx: -2, mb: 1 }} />
          <SidebarItem
            Icon={AssignmentOutlined}
            label="Ocorrências"
            selected={isSelected("occurrences", pathname)}
            path="occurrences"
            onClick={(path) => navigate(`/admin/${path}`)}
          />
          <Divider sx={{ mx: -2, mt: 1 }} />
          <ListSubheader>Configurações</ListSubheader>
          <SidebarItem
            Icon={PeopleAltOutlined}
            label="Usuários"
            selected={isSelected("users", pathname)}
            path="users"
            onClick={(path) => navigate(`/admin/${path}`)}
          />
          <SidebarItem
            Icon={BusinessOutlined}
            label="Unidades"
            selected={isSelected("units", pathname)}
            path="units"
            onClick={(path) => navigate(`/admin/${path}`)}
          />
          <SidebarItem
            Icon={BusinessCenterOutlined}
            label="Setores"
            selected={isSelected("sectors", pathname)}
            path="sectors"
            onClick={(path) => navigate(`/admin/${path}`)}
          />
          <SidebarItem
            Icon={InventoryOutlined}
            label="Produtos"
            selected={isSelected("products", pathname)}
            path="products"
            onClick={(path) => navigate(`/admin/${path}`)}
          />
          <SidebarItem
            Icon={CategoryOutlined}
            label="Categorias"
            selected={isSelected("categories", pathname)}
            path="categories"
            onClick={(path) => navigate(`/admin/${path}`)}
          />
        </List>
      </Box>
      <AccountBox />
    </Box>
  );
};

export default Sidebar;
