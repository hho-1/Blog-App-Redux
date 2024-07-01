import React from "react";
import LoginForm from "../components/auth/LoginFrom";
import { Box } from "@mui/material";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = ({ authType, setAuthType }) => {
  return (
    <>
      {authType === "login" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="84vh"
          margin="auto"
          sx={{ backgroundColor: "primary.backgroundMain" }}
        >
          <LoginForm setAuthType={setAuthType} />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="84vh"
          margin="auto"
          sx={{ backgroundColor: "primary.backgroundMain" }}
        >
          <RegisterForm setAuthType={setAuthType} />
        </Box>
      )}
    </>
  );
};

export default Auth;
