import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { traerInscriptosactividadSede } from "../../services/servicesCursadas";
//import InfoMuestraComisiones from "../../components/cursadas/InfoMuestraComisiones";
import InfoMuestraInscriptosSede from "../../components/cursadas/infoMuestraInscriptosSede";
import { CSVLink } from "react-csv";

const ComisionesInscripcionesActividad = () => {
  const [anioI, setAnioI] = useState(2023);
  const [sede, setSede] = useState(1);
  //const [comisiones, setComisiones] = useState([]);
  const [materias, setMaterias] = useState("");

  useEffect(() => {
  
  }, []);
/*
  useEffect(() => {
    const getMatComisiones = async () => {
      const resu = await traerInscriptosactividadSede(anioI, sede);
      console.log(resu)
      setMaterias(resu);
    };

    getMatComisiones();
  }, []);
*/
  /*
  useEffect(() => {
    const getComisionesMat = async () => {
      const resu = await traerComisionesMateriaAnio(anioI, materia);
      setComisiones(resu);
    };
    if (materia) {
      getComisionesMat();
    }
  }, [materia, anioI]);
*/

  const onHandleChange = (event) => {
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
    }
  };

  const onHandleChangeM = async (event) => {
    //console.log(event.target.value);
    //const resu = await traerComisionesMateriaAnio(anioI, event.target.value);
    //setComisiones(resu);
    setSede(event.target.value);
  };

  const onHandleInfo = (event) => {
    const getMatComisiones = async () => {
      const resu = await traerInscriptosactividadSede(anioI, sede);
      
      setMaterias(resu);
    };

    getMatComisiones();
  };
  console.log(materias)
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={12} bgcolor={"darkblue"} color={"white"}>
          <Typography variant="h6" textAlign={"center"}>
            Inscriptos a cursadas por Sede 
          </Typography>
        </Grid>

        <Box
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 2,
            backgroundColor: "beige",
            width: "97%",
            p: 2,
            flexWrap: "wrap",
          }}
        >
          <Grid item xs={12} md={2} sx={{ mr: 1 }}>
            <InputLabel id="anioI">Año.Lectivo</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioI"
              name="anioI"
              onChange={onHandleChange}
              value={anioI}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="sede">Sede</InputLabel>
            <Select
              variant="standard"
              name="sede"
              id="sede"
              onChange={onHandleChangeM}
            >
                <MenuItem value={'1'}>Mendoza</MenuItem>
                <MenuItem value={'2'}>San Rafael</MenuItem>
                <MenuItem value={'3'}>Gral.Alvear</MenuItem>
                <MenuItem value={'4'}>Este</MenuItem>
              
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>
          <Grid item xs={12} md={1} sx={{mt:2}}>
               {materias ?
                        <Button variant='outlined'>
                        
                        <CSVLink data={materias} filename={"ListadoInsc" +  ".csv"}>Exportar</CSVLink>
                       
                        </Button> :null 
                  }              

          </Grid>

        </Box>
      </Grid>

      {materias ? (
        
        <InfoMuestraInscriptosSede sede={sede} materias={materias} />
      ) : null}
    </Container>
  );
};

export default ComisionesInscripcionesActividad;

/*
 <Grid item xs={12} md={5}>
            <InputLabel id="comisiones">Comisiones</InputLabel>
            <Select
              variant="standard"
              name="comisiones"
              id="comisiones"
              onChange={onHandleChangeCom}
              value={comisiones}
            >
              {comisiones.length > 0
                ? comisiones.map((elemento, index) => (
                    <MenuItem value={elemento.comision} key={index}>
                      {elemento.nmat}-{elemento.nombre}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>
*/
