import { Box, Button, Container, Typography } from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const volverInicio = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button variant="contained" color="primary" onClick={volverInicio}>
        Volver al inicio
      </Button>
    </Container>
  );
};

export default PageNotFound;
