import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { helpmeDash } from "./services/servicesChatGpt";

const quickActions = [
  { label: "Estudiantes activos", route: "/estudiantes-activos" },
  { label: "Ingresantes", route: "/ingresantes" },
  { label: "Egresados", route: "/egreaniocarrera" },
  { label: "Exámenes", route: "/reporteexamenes" },
  { label: "Cursadas", route: "/listado-cursada-actividad" },
  { label: "Dashboard", route: "/dashboard" },
  { label: "Reinscriptos", route: "/alumnos-reinscriptos" },
  { label: "Reportes", route: "/reportegeneral" },
];

const HelpBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 ¡Hola! Soy tu asistente del DashBoard. Podés preguntarme algo o ir directo a una sección:",
    },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const goTo = (route, label) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: `Ir a ${label}` },
      { from: "bot", text: `Navegando a ${label}...` },
    ]);
    setTimeout(() => {
      setOpen(false);
      navigate(route);
    }, 600);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "⏳ Pensando...", id: "loading" },
    ]);
    setInput("");

    const reply = await helpmeDash(userMessage);

    setMessages((prev) => {
      const copy = [...prev];
      const loadingIndex = copy.findIndex((msg) => msg.id === "loading");
      if (loadingIndex !== -1) {
        copy[loadingIndex] = { from: "bot", text: reply.respuesta };
      }
      return copy;
    });

    // Si el backend indica navegar, hacerlo automáticamente
    if (reply.action === "navigate" && reply.route) {
      setTimeout(() => {
        setOpen(false);
        navigate(reply.route);
      }, 1200);
    }
  };

  return (
    <>
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
            height: "65vh",
            maxHeight: "75vh",
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
          🤖 Asistente del DashBoard
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            bgcolor: "#f9f9f9",
            height: "100%",
            overflowY: "auto",
            p: 0,
          }}
        >
          <List sx={{ pt: 1, pb: 1 }}>
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
                    maxWidth: "75%",
                    boxShadow: 1,
                  }}
                >
                  <ListItemText primary={msg.text} />
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>

          {/* Quick action chips */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {quickActions.map((action) => (
                <Chip
                  key={action.route}
                  label={action.label}
                  onClick={() => goTo(action.route, action.label)}
                  color="primary"
                  variant="outlined"
                  size="small"
                  clickable
                />
              ))}
            </Stack>
          </Box>
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
            placeholder="Preguntame algo o pedime que te lleve a una sección..."
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
