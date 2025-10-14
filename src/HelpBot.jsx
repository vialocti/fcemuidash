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
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { helpmeDash } from "./services/servicesChatGpt";

const HelpBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 ¡Hola! Soy tu asistente de ayuda del DashBoard." },
  ]);
  const [input, setInput] = useState("");

  const handleSend =async  () => {

    if (!input.trim()) return;

    // mostrar mensaje del usuario
    setMessages((prev) => [...prev, { from: "user", text: input }]);
  
    // respuesta por defecto (mientras carga)
    setMessages((prev) => [...prev, { from: "bot", text: "⏳ Pensando..." }]);
  
    // Llamar a tu servicio conectado al asistente
    const reply = await helpmeDash(input);
    console.log(reply)
    // Reemplazar el mensaje "Pensando..." por la respuesta real
    setMessages((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { from: "bot", text: reply };
      return copy;
    });
  
    setInput("");
  };

  return (
    <>
      {/* Botón flotante con borde redondeado */}
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

      {/* Ventana de chat con más estilo */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4, // redondeado
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
        <DialogContent dividers sx={{ bgcolor: "#f9f9f9" }}>
          <List>
            {messages.map((msg, i) => (
              <ListItem
                key={i}
                sx={{
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
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

