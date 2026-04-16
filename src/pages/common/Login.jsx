import React, { useState } from "react";
import { 
  TextField, Button, Container, Card, CardContent, Typography, 
  Alert, Snackbar, Box, IconButton, InputAdornment, Fade, 
  CircularProgress, Stack 
} from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined, LockOutlined } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Configuración de Firebase
/*
const firebaseConfig={
  apiKey: "AIzaSyBqIhbsiNJA0ldQmOHq3q_qehTN55yAZbw",
  authDomain: "dashloginfce.firebaseapp.com",
  projectId: "dashloginfce",
  storageBucket: "dashloginfce.firebasestorage.app",
  messagingSenderId: "68713920224",
  appId: "1:68713920224:web:b92e0d411dfa531a7e4285"
  }
  */
  // Configuración de Firebase
  const getEnv = (key) => {
    // Intenta CRA primero, luego Vite como respaldo
    const value = process.env[key] || import.meta.env?.[key];
    if (!value) {
      console.error(`Error: La variable de entorno ${key} no está definida.`);
    }
    return value;
  };
  
  const firebaseConfig = {
    apiKey: getEnv("REACT_APP_FIREBASE_API_KEY"),
    authDomain: getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnv("REACT_APP_FIREBASE_PROJECT_ID"),
    storageBucket: getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getEnv("REACT_APP_FIREBASE_APP_ID")
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, complete todos los campos");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err) {
      // Normalización de errores de Firebase
      let mensajeError = "Error al intentar conectar con el servidor";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        mensajeError = "Correo o contraseña incorrectos";
      } else if (err.code === 'auth/too-many-requests') {
        mensajeError = "Demasiados intentos. Intente más tarde";
      }
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '70vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)',
      p: 3
    }}>
      <Container maxWidth={false} sx={{ maxWidth: '680px !important' }}>
        <Fade in={true} timeout={1000}>
          <Card sx={{ 
            borderRadius: 5, 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            bgcolor: 'rgba(255, 255, 255, 0.98)',
            overflow: 'visible',
            position: 'relative'
          }}>
            {/* Icono de Cabecera con Diseño Moderno */}
            <Box sx={{ 
              bgcolor: '#3b82f6', 
              width: 80, height: 80, 
              borderRadius: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto',
              mt: -5,
              transform: 'rotate(-10deg)',
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)',
              border: '4px solid white'
            }}>
              <LockOutlined sx={{ color: 'white', fontSize: 40, transform: 'rotate(10deg)' }} />
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 5 }, pt: 2 }}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 900, letterSpacing: -1, color: '#1e293b', mt: 2 }}>
                Ingreso
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
                Control de Gestión Académica
              </Typography>

              {error && (
                <Fade in={!!error}>
                  <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              <Stack spacing={3}>
                <TextField
                  label="Correo Institucional"
                  variant="filled"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
                />

                <TextField
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  variant="filled"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  InputProps={{ 
                    disableUnderline: true, 
                    sx: { borderRadius: 2 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{ 
                    py: 2, 
                    borderRadius: 2.5, 
                    bgcolor: '#1e3a8a',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    textTransform: 'none',
                    boxShadow: '0 8px 16px rgba(30, 58, 138, 0.25)',
                    '&:hover': { bgcolor: '#1e40af', boxShadow: '0 12px 20px rgba(30, 58, 138, 0.35)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? (
                    <CircularProgress size={26} color="inherit" />
                  ) : (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>Entrar al Sistema</span>
                      <LoginOutlined fontSize="small" />
                    </Stack>
                  )}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 2, fontWeight: 600 }}>
            FCE - UNCUYO • 2026
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: 2 }}>
          Acceso concedido. Redirigiendo...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;