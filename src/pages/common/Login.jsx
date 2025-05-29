import React, { useState } from "react";
import { TextField, Button, Container, Card, CardContent, Typography, Alert, Snackbar } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Configuración de Firebase usando variables de entorno
/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
*/
const firebaseConfig={
  apiKey: "AIzaSyBqIhbsiNJA0ldQmOHq3q_qehTN55yAZbw",
  authDomain: "dashloginfce.firebaseapp.com",
  projectId: "dashloginfce",
  storageBucket: "dashloginfce.firebasestorage.app",
  messagingSenderId: "68713920224",
  appId: "1:68713920224:web:b92e0d411dfa531a7e4285"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Inicio de sesión exitoso"
      />
    </Container>
  );
};

export default Login;
