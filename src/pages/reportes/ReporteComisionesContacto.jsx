import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import { traerDatosActividadContacto } from "../../services/servicesUtils";
import { blue } from "@mui/material/colors";
import ReporteComisiones from "../../components/reportes/ReporteComisiones";



const ReporteComisionesContacto = () => {
  const [anio, setAnio] = useState("");
  const [sede, setSede] = useState("");
  const [datos, setDatos] = useState(null);
  const [loading, setLoading]=useState(true)

  const ejecutarReporte = async () => {
    setDatos(null)
    setLoading(false)
    if (!anio || !sede) {
      alert("Por favor, complete ambos campos.");
      return;
    }
    const resultado = await traerDatosActividadContacto(anio, sede);
    console.log(resultado)
    setDatos(resultado);
  };

  

  return (
    <Container maxWidth="fluid" sx={{p:3}}>
      <Typography variant="h4" gutterBottom>
        Reporte de comisiones y contactos docentes
      </Typography>
     <Grid container gap={20}>
        <Grid item xs={12} md={3}>
            <FormControl fullWidth margin="normal">
                <InputLabel>Sede</InputLabel>
                <Select value={sede} onChange={(e) => setSede(e.target.value)}>
                <MenuItem value="1">Mendoza</MenuItem>
                <MenuItem value="2">San Rafael</MenuItem>
                <MenuItem value="3">Gral Alvear</MenuItem>
                <MenuItem value="4">Este</MenuItem>
                </Select>
            </FormControl>

        </Grid>
      <Grid item xs={12} md={2} >
            <TextField
                fullWidth
                label="Año"
                variant="outlined"
                margin="normal"
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
            />
      </Grid>
       <Grid item xs={12} md={2} sx={{marginTop:3}}>
            <Button variant="contained" color="primary" onClick={ejecutarReporte}>
                Ejecutar Consulta
            </Button>
      </Grid>
    </Grid>
      <hr />
      {!datos && !loading? <Box sx={{marginInline:5, marginTop:2,borderColor:blue}}><Alert severity='info'><Typography variant='h6'>...Procesando Datos</Typography></Alert></Box>

      :datos?<ReporteComisiones datosSimulados={datos} />:null}
    </Container>
  );
};

export default ReporteComisionesContacto;
