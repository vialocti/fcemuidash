import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
// 🚨 Importar useEffect y useRef para el scroll automático
import React, { useState, useRef, useEffect } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { helpmeDash } from "./services/servicesChatGpt"; // Manteniendo la importación original

const HelpBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 ¡Hola! Soy tu asistente de ayuda del DashBoard." },
  ]);
  const [input, setInput] = useState("");

  // 1. 🚨 Crear la referencia para el final de los mensajes
  const messagesEndRef = useRef(null);

  // Función auxiliar para realizar el scroll
  const scrollToBottom = () => {
    // Usamos 'optional chaining' (?) y 'scrollIntoView' con comportamiento suave
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 2. 🚨 Ejecutar el scroll cada vez que la lista de mensajes cambie
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Mostrar mensaje del usuario
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);

    // Respuesta por defecto (mientras carga)
    // Usamos un identificador único para el mensaje de carga
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "⏳ Pensando...", id: "loading" },
    ]);

    // Limpiar input inmediatamente
    setInput("");

    // Llamar a tu servicio conectado al asistente (simulación)
    const reply = await helpmeDash(userMessage);
    //const reply = await new Promise(resolve => setTimeout(() => resolve({ respuesta: "Esta es la respuesta del asistente." }), 1000));

    // Reemplazar el mensaje "Pensando..." por la respuesta real
    setMessages((prev) => {
      const copy = [...prev];
      // Buscamos el mensaje con el id 'loading' y lo reemplazamos
      const loadingIndex = copy.findIndex((msg) => msg.id === "loading");
      if (loadingIndex !== -1) {
        copy[loadingIndex] = { from: "bot", text: reply.respuesta };
      }
      return copy;
    });
  };

  return (
    <>
      {/* Botón flotante original */}
      <Fab
        color="primary"
        aria-label="help"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: 4,
          width: 64,
          height: 64,
          borderRadius: "50%",
          zIndex: 1500,
        }}
      >
        <HelpOutlineIcon fontSize="large" />
      </Fab>

      {/* Ventana de chat original */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            position: "fixed",
            bottom: 100,
            right: 20,
            m: 0,
            height: "60vh",
            maxHeight: "70vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🤖 Asistente de Ayuda
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            bgcolor: "#f9f9f9",
            // 🚨 Es crucial establecer un alto y overflow para que el scroll funcione
            height: "100%",
            overflowY: "auto",
            p: 0, // Ajuste de padding para un mejor uso del espacio
          }}
        >
          <List sx={{ pt: 1, pb: 1 }}>
            {messages.map((msg, i) => (
              <ListItem
                key={i}
                sx={{
                  justifyContent:
                    msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    bgcolor: msg.from === "user" ? "primary.main" : "grey.300",
                    color: msg.from === "user" ? "white" : "black",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    maxWidth: "70%",
                    boxShadow: 1,
                  }}
                >
                  <ListItemText primary={msg.text} />
                </Box>
              </ListItem>
            ))}
            {/* 3. 🚨 El elemento al que apuntará la referencia para el scroll */}
            <div ref={messagesEndRef} />
          </List>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Escribe tu duda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{ bgcolor: "white", borderRadius: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HelpBot;