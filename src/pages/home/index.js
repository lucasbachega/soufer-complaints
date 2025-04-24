import {
  Add,
  CampaignOutlined,
  Checklist,
  DirectionsBusOutlined,
  ReportGmailerrorredOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, Container, Link, Typography } from "@mui/joy";
import Capa from "../../assets/background/soufer-capa.jpeg";
import Logo from "../../assets/logo/soufer-logo.png";
import ActionCard from "./components/ActionCard";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pkge from "../../../package.json";
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
      <Box flex={1.5} display={"flex"} flexDirection={"column"} height={"100%"}>
        <Box
          flex={1}
          flexBasis={0}
          overflow={"auto"}
          pb={5}
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"xl"}
        >
          <Box position={"absolute"} top={15} right={30}>
            <UserIndicator />
          </Box>
          <Container
            sx={{
              flex: 1,
              p: 3,
              paddingTop: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            maxWidth="md"
          >
            <img src={Logo} width={"130px"} />
            <Typography mt={2} level="h2" fontWeight={"600"}>
              Portal de serviços
            </Typography>
            <Typography
              maxWidth={"sm"}
              color="neutral"
              textAlign={"center"}
              level="title-md"
            >
              Seja bem-vindo ao portal de serviços da Soufer.
            </Typography>
            <Box
              width={"100%"}
              mt={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"flex-start"}
              gap={1.5}
              flexWrap={"wrap"}
            >
              <ActionCard
                Icon={CampaignOutlined}
                title={"Reclamações"}
                description={"Veja e acompanhe suas reclamações enviadas"}
                onClick={() => navigate("/my-occurrences")}
              />
              <ActionCard
                Icon={Add}
                title={"Nova ocorrência"}
                description={
                  "Envie uma nova reclamação ou prática insegura para análise"
                }
                onClick={() => navigate("/new-occurrence")}
              />
              <ActionCard
                Icon={ReportGmailerrorredOutlined}
                title={"Práticas inseguras"}
                description={"Acompanhe suas observações de práticas inseguras"}
                onClick={() => navigate("/insecurity")}
              />
              {isGestor && (
                <ActionCard
                  disabled={!isAdmin}
                  Icon={Checklist}
                  title={"Gestor"}
                  description={"Analise e gerencie ocorrências enviadas"}
                  onClick={() => navigate("/gestor")}
                />
              )}
              {isAdmin && (
                <ActionCard
                  disabled={!isAdmin}
                  Icon={SettingsOutlined}
                  title={"Administrador"}
                  description={
                    "Configure usuários, setores, áreas e muito mais."
                  }
                  onClick={() => navigate("/admin")}
                />
              )}
              <ActionCard
                Icon={DirectionsBusOutlined}
                title={"Transporte coletivo"}
                description={"Solicite e gerencie serviços de transporte."}
                onClick={() => navigate("/transport")}
                isNew
              />
            </Box>
          </Container>
          <Box
            mt={"auto"}
            p={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography
              fontWeight={"sm"}
              color="neutral"
              level="body-xs"
              textAlign={"center"}
            >
              Versão: {pkge.version}
            </Typography>
            <Typography
              fontWeight={"sm"}
              color="neutral"
              level="body-xs"
              textAlign={"center"}
            >
              Desenvolvido com 🤍 por{" "}
              <Link
                fontWeight={"sm"}
                level="inherit"
                href="https://www.instagram.com/lucascbachega/"
                target="_blank"
              >
                lucascbachega
              </Link>
              .
            </Typography>
          </Box>
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
          backgroundAttachment: "fixed",
        }}
      />
    </Box>
  );
};
