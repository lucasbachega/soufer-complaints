import { Close, Warning } from "@mui/icons-material";
import { Alert, Button, IconButton, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../../../api/httpClient";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TextInput from "../../../components/inputs/TextInput";
import { login } from "../../../store/reducers/userInfoSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await HttpClient.login({
      username,
      password,
    });
    if (res?.ok) {
      localStorage.setItem("username", username);
      dispatch(login({}));
      navigate("/admin");
    } else {
      setError(res?.error?.message);
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <>
      <Typography mb={3} level="h4">
        Fazer login
      </Typography>
      <Stack
        onSubmit={handleLogin}
        component={"form"}
        direction={"column"}
        gap={2}
      >
        {Boolean(error) && (
          <Alert
            sx={{ mb: 1 }}
            startDecorator={<Warning />}
            variant="soft"
            color="danger"
            endDecorator={
              <React.Fragment>
                <IconButton
                  onClick={() => setError(null)}
                  variant="soft"
                  size="sm"
                  color="danger"
                >
                  <Close />
                </IconButton>
              </React.Fragment>
            }
          >
            {error}
          </Alert>
        )}
        <TextInput
          label={"Usuário"}
          required
          value={username}
          onChange={setUsername}
          disabled={loading}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          disabled={loading}
        />
        <Button
          size="lg"
          type="submit"
          variant="solid"
          loading={loading}
          disabled={!password?.trim() || !username?.trim() || loading}
          sx={{
            alignSelf: "center",
            width: 300,
            mt: 3,
          }}
        >
          {loading ? "Entrando" : "Entrar"}
        </Button>
      </Stack>
    </>
  );
};

export default Login;
