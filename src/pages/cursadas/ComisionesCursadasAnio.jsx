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
import { traerMateriasComiAnio } from "../../services/servicesCursadas";
import InfoMuestraComisiones from "../../components/cursadas/InfoMuestraComisiones";
//import { CSVLink } from "react-csv";

//resultado por actividad

const ComisionesCursadasAnio = () => {
  const [anioI, setAnioI] = useState(2023);
  const [materias, setMaterias] = useState(null);
  const [sede, setSede] = useState(1);
  const [materia, setMateria] = useState("");

  
  useEffect(() => {
    const getMatComisiones = async () => {
      const resu = await traerMateriasComiAnio(anioI);
      //console.log(resu);
      setMaterias(resu);
    };
    if(anioI && sede){
    getMatComisiones();
    }
  }, [anioI, sede]);

  useEffect(() => {
    const getMatComisiones = async () => {
      const resu = await traerMateriasComiAnio(2023);
      setMaterias(resu);
    };

    getMatComisiones();
  }, []);

  
  const onHandleChange = (event) => {
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
    }
    if (event.target.name === "sede") {
      setSede(event.target.value);
    }
  };

  const onHandleChangeM = async (event) => {
    console.log(event.target.value);
    //const resu = await traerComisionesMateriaAnio(anioI, event.target.value);
    //setComisiones(resu);
    setMateria(event.target.value);
  };

  const onHandleInfo = async (event) => {
    const resu = await traerMateriasComiAnio(anioI);
      //console.log(resu);
      setMaterias(resu);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={12} bgcolor={"darkblue"} color={"white"}>
          <Typography variant="h6" textAlign={"center"}>
            Resultado Comisiones por Actividad
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
          <Grid item xs={12} md={3}>
            <InputLabel id="sede">Sede</InputLabel>
            <Select
              variant="standard"
              name="sede"
              id="sede"
              value={sede}
              onChange={onHandleChange}
            >
                <MenuItem value={'1'}>Mendoza</MenuItem>
                <MenuItem value={'2'}>San Rafael</MenuItem>
                <MenuItem value={'3'}>Gral.Alvear</MenuItem>
                <MenuItem value={'4'}>Este</MenuItem>
              
            </Select>
          </Grid>

          <Grid item xs={12} md={5}>
            <InputLabel id="materias">Actividad</InputLabel>
            <Select
              variant="standard"
              name="materias"
              id="materias"
              onChange={onHandleChangeM}
            >
              {materias
                ? materias.map((elemento, index) => (
                    <MenuItem value={elemento.nombre} key={index}>
                      {elemento.nombre}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>
          
        </Box>
      </Grid>

      {materia && anioI>2018 ? (
        <InfoMuestraComisiones anio={anioI} materia={materia} sede={sede}/>
      ) : null}
    </Container>
  );
};

export default ComisionesCursadasAnio;

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
