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
import { traerComparativaInscripcionesAnio} from "../../services/servicesCursadas";
//import InfoMuestraComisiones from "../../components/cursadas/InfoMuestraComisiones";
//import InfoMuestraInscriptosSede from "../../components/cursadas/infoMuestraInscriptosSede";
//import { CSVLink } from "react-csv";
import InfoMuestraInscriptosAniosSede from "../../components/cursadas/infoMuestraInscriptosAniosSede";
import HelpPanelInscriptos from "../../components/ayudas/HelpPanelInscriptos";


//comparativa de Inscripciones 5 años
const ComparativaInscripcionesActividad = () => {
  const [anioI, setAnioI] = useState(2024);
  const [sede, setSede] = useState(1);
  //const [comisiones, setComisiones] = useState([]);
  const [materias, setMaterias] = useState(null);

  useEffect(() => {
  
  }, []);

  const onHandleChange = (event) => {
    setMaterias(null)
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
    }
  };

  const onHandleChangeM = async (event) => {
    //console.log(event.target.value);
    //const resu = await traerComisionesMateriaAnio(anioI, event.target.value);
    setMaterias(null)
    setSede(event.target.value);
  };

  const onHandleInfo = (event) => {
    const getMatComisiones = async () => {
      const resu = await traerComparativaInscripcionesAnio(anioI, sede);
      
      setMaterias(resu);
    };

    getMatComisiones();
  };

 // console.log(materias)
  
  return (
    <Container maxWidth='false' sx={{width:'90%',paddingInline:10}}>
      <Grid container>
       

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

        <Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>
                  <Typography variant="h5" textAlign={"center"}>
                    Comparativa de Inscripciones Actividades - Año y Sede 
                  </Typography>
                </Grid>

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
                {/*<MenuItem value={'3'}>Gral.Alvear</MenuItem>*/}
                <MenuItem value={'4'}>Este</MenuItem>
              
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>
          

        </Box>
      </Grid>

      {materias ? (
        
        <InfoMuestraInscriptosAniosSede sede={sede} materias={materias} anio={anioI} />
      ) : <HelpPanelInscriptos />}
    </Container>
  );
};

export default ComparativaInscripcionesActividad;


