import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import AppRoutes from "./components/routes/AppRoutes";
import Login from "./pages/common/Login";
import { signOut } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const auth = useMemo(() => getAuth(), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEmail("");
    setError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Opcional: forzar limpieza local
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
  


  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Se ha enviado un correo para restablecer tu contraseña.");
      handleCloseDialog();
    } catch (error) {
      setError("Error al enviar el correo: " + error.message);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return user ? (
    <AppRoutes onLogout={handleLogout} user={user} />
  ) : (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" mb={2}>
          Bienvenido al DashBoard de la FCE
        </Typography>
        <Login />
       {/** 
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenDialog}
          sx={{ mt: 2 }}
        >
          Olvidé mi contraseña
        </Button>*/}
      </Box>

      {/* Diálogo para restablecer contraseña */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Restablecer Contraseña</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleResetPassword} color="secondary" variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
