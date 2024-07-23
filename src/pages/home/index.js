import {
  AddCircleOutlineOutlined,
  AssignmentOutlined,
  Checklist,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, Container, Divider, Typography } from "@mui/joy";
import Capa from "../../assets/background/soufer-capa.jpeg";
import Logo from "../../assets/logo/soufer-logo.png";
import ActionCard from "./components/ActionCard";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserIsAdmin,
  selectUserIsGestor,
} from "../../store/reducers/userInfoSlice";
import UserIndicator from "./components/UserIndicator";

export default () => {
  const navigate = useNavigate();

  const isAdmin = useSelector(selectUserIsAdmin);
  const isGestor = useSelector(selectUserIsGestor);

  return (
    <Box flex={1} flexBasis={0} display={"flex"} alignItems={"flex-start"}>
      <Box flex={1} display={"flex"} flexDirection={"column"} height={"100%"}>
        <Box
          flex={1}
          flexBasis={0}
          overflow={"auto"}
          pb={5}
          position={"relative"}
        >
          <Box position={"absolute"} top={15} right={30}>
            <UserIndicator />
          </Box>
          <Container
            sx={{
              p: 4,
              paddingTop: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            maxWidth="md"
          >
            <img src={Logo} width={"140px"} />
            <Typography mt={2} level="h1" fontWeight={"500"}>
              Portal de ocorrências
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              maxWidth={"sm"}
              color="neutral"
              textAlign={"center"}
              level="body-lg"
            >
              Seja bem-vindo ao portal de ocorrências da Soufer. Informe suas
              reclamações ou consulte o painel de administrador.
            </Typography>
            <Box
              width={"100%"}
              mt={5}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={3}
              flexWrap={"wrap"}
            >
              <ActionCard
                Icon={AssignmentOutlined}
                title={"Minhas ocorrências"}
                description={"Acompanhe suas reclamações enviadas"}
                onClick={() => navigate("/my-occurrences")}
              />
              <ActionCard
                Icon={AddCircleOutlineOutlined}
                title={"Nova ocorrência"}
                description={"Preencha o formulário de reclamação"}
                onClick={() => navigate("/new-occurrence")}
              />
              {isGestor && (
                <ActionCard
                  disabled={!isAdmin}
                  Icon={Checklist}
                  title={"Gestor"}
                  description={
                    "Gerencie as ocorrências, explique as causas e correções."
                  }
                  onClick={() => navigate("/gestor")}
                />
              )}
              {isAdmin && (
                <ActionCard
                  disabled={!isAdmin}
                  Icon={SettingsOutlined}
                  title={"Administrador"}
                  description={"Configure usuários e acompanhe as ocorrências"}
                  onClick={() => navigate("/admin")}
                />
              )}
            </Box>
          </Container>
        </Box>
      </Box>
      <Box
        display={{ xs: "none", lg: "flex" }}
        style={{
          flex: 0.8,
          backgroundImage: `url(${Capa})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh", // ou a altura desejada
        }}
      />
    </Box>
  );
};
