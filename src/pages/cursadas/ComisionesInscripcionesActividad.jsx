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
import { traerInscriptosactividadSede, traerInscriptosPropuestaSede, traerpropuestaversion } from "../../services/servicesCursadas";
//import InfoMuestraComisiones from "../../components/cursadas/InfoMuestraComisiones";
import InfoMuestraInscriptosSede from "../../components/cursadas/infoMuestraInscriptosSede";
import { CSVLink } from "react-csv";
import HelpPanelInscriptosActividadesPropuestas from "../../components/ayudas/HelpPanelInscriptosActividadesPropuestas";

const ComisionesInscripcionesActividad = () => {
  const [anioI, setAnioI] = useState(2025);
  const [sede, setSede] = useState(1);
  const [versionact, setVersionact] = useState('0');
  const [propuesta, setPropuesta]= useState('99')
  const [materias, setMaterias] = useState("");
  const [totalInsc, setTotalInsc] = useState(0);
  

  
  const traerVersionAc=async(propuesta)=>{
        const resu = await traerpropuestaversion(propuesta)
        return resu[0].version_actual
  }
  
  
  useEffect(() => {
  
  }, []);



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

  const onHandleChangeP =async (event)=>{
    setPropuesta(event.target.value)
    if (event.target.value !== '99'){
    setVersionact(await traerVersionAc(event.target.value))
    }
  }

  const onHandleInfo = (event) => {
    const getMatComisiones = async () => {
      let resu=null
      let sumaTotal=0
      if(propuesta==='99'){
          resu = await traerInscriptosactividadSede(anioI, sede);
          sumaTotal = resu.reduce((acumulador, item) => {
            return acumulador + Number(item.tot);
          }, 0);
      }else{
        //console.log('hhh')
          resu = await traerInscriptosPropuestaSede(anioI,sede,versionact)
           sumaTotal = resu.reduce((acumulador, item) => {
         return acumulador + Number(item.tot);
         }, 0);
      }
      setMaterias(resu);
      setTotalInsc(sumaTotal)
    };

    getMatComisiones();
  };
  //console.log(materias)
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
                  <Typography variant="h6" textAlign={"center"}>
                    Inscriptos a Cursadas por Sede 
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

          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={4}>
          <InputLabel id="propuesta">Propuesta</InputLabel>
            <Select
              variant="standard"
              name="propuesta"
              id="propuesta"
              onChange={onHandleChangeP}
            >   
                <MenuItem value={'99'}>Todas</MenuItem>
                <MenuItem value={'2'}>L.Administracion</MenuItem>
                <MenuItem value={'3'}>L.Economia</MenuItem>
                <MenuItem value={'6'}>LNRG</MenuItem>
                <MenuItem value={'7'}>L.Logistica</MenuItem>
                <MenuItem value={'8'}>C.Publico</MenuItem>
              
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
                        
                        <CSVLink data={materias} filename={"ListadoInsc.csv"}>Exportar</CSVLink>
                       
                        </Button> :null 
                  }              

          </Grid>

        </Box>
      </Grid>

      {materias ? (
        
        <InfoMuestraInscriptosSede sede={sede} materias={materias} total={totalInsc}/>
      ) : <HelpPanelInscriptosActividadesPropuestas />}
    </Container>
  );
};

export default ComisionesInscripcionesActividad;

