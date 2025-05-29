import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Azul claro
    },
    secondary: {
      main: "#f48fb1", // Rosa tenue
    },
    background: {
      default: "#121212", // Fondo oscuro
      paper: "#1E1E1E", // Tarjetas más oscuras
    },
    text: {
      primary: "#E0E0E0", // Texto blanco/gris
      secondary: "#B0BEC5", // Texto gris claro
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default darkTheme;
