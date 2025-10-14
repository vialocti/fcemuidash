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
import HelpBot from "./HelpBot";
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

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
        .message-bubble {
            animation: pop-in 0.3s forwards;
            transform: scale(0.95);
            opacity: 0;
        }
        @keyframes pop-in { to { transform: scale(1); opacity: 1; } }
        .dot-flashing { position: relative; width: 10px; height: 10px; border-radius: 5px; background-color: #4b5563; color: #4b5563; animation: dotFlashing 1s infinite linear alternate; animation-delay: .5s; }
        .dot-flashing::before, .dot-flashing::after { content: ''; display: inline-block; position: absolute; top: 0; }
        .dot-flashing::before { left: -15px; width: 10px; height: 10px; border-radius: 5px; background-color: #4b5563; color: #4b5563; animation: dotFlashing 1s infinite alternate; animation-delay: 0s; }
        .dot-flashing::after { left: 15px; width: 10px; height: 10px; border-radius: 5px; background-color: #4b5563; color: #4b5563; animation: dotFlashing 1s infinite alternate; animation-delay: 1s; }
        @keyframes dotFlashing { 0% { background-color: #4b5563; } 50%, 100% { background-color: #d1d5db; } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
}, []);

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
    <>
    <AppRoutes onLogout={handleLogout} user={user} />
    <HelpBot />
    </>
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
