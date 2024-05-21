import {
  AdminPanelSettingsOutlined,
  AssignmentOutlined,
} from "@mui/icons-material";
import { Box, Container, Divider, Typography } from "@mui/joy";
import Capa from "../../assets/background/soufer-capa.jpeg";
import Logo from "../../assets/logo/soufer-logo.png";
import ActionCard from "./components/ActionCard";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserIsAdmin } from "../../store/reducers/userInfoSlice";
import UserIndicator from "./components/UserIndicator";

export default () => {
  const navigate = useNavigate();

  const isAdmin = useSelector(selectUserIsAdmin);

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
              Boas vindas ao portal de ocorrências da Soufer, informe suas
              reclamações ou consulte o painel de administrador
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
                title={"Nova ocorrência"}
                description={"Preencha o formulário de reclamação"}
                onClick={() => navigate("/new-occurrence")}
              />
              {isAdmin && (
                <ActionCard
                  disabled={!isAdmin}
                  Icon={AdminPanelSettingsOutlined}
                  title={"Painel do administrador"}
                  description={"Configure e acompanhe as ocorrências"}
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
