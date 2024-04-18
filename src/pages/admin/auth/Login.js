import { Button, Link, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Typography mb={3} level="h4">
        Fazer login
      </Typography>
      <Stack
        onSubmit={(e) => e.preventDefault()}
        component={"form"}
        direction={"column"}
        gap={2}
      >
        <TextInput
          label={"E-mail"}
          required
          value={email}
          onChange={setEmail}
        />
        <PasswordInput value={password} onChange={setPassword} />
        <Typography
          mt={-0.5}
          level="body-sm"
          color="primary"
          textAlign={"right"}
          component={Link}
          fontWeight={500}
          onClick={() => navigate("/auth/forgot-password")}
        >
          Esqueci a senha
        </Typography>
        <Button
          size="lg"
          type="submit"
          variant="solid"
          sx={{
            alignSelf: "center",
            width: 300,
            mt: 3,
          }}
        >
          Entrar
        </Button>
      </Stack>
    </>
  );
};

export default Login;
