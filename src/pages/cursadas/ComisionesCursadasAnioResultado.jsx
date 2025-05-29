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
import { traerMateriasComiAnio ,  traerDetalleComisiones} from "../../services/servicesCursadas";
import InfoMuestraComisiones  from "../../components/cursadas/InfoMuestraComisiones";
import HelpBusquedaResultadoA from "../../components/ayudas/HelpBusquedaResultadoA";
import NotDataFound from "../../components/ayudas/NotDataFound";
//import { CSVLink } from "react-csv";

//resultado por actividad
/*
import {
  datosHistoricosResultados,
 
  traerNumerosComisiones,
} from "../../services/servicesCursadas";

*/const ComisionesCursadasAnioResultado = () => {
  const [anioI, setAnioI] = useState(2023);
  const [materias, setMaterias] = useState(null);
  const [sede, setSede] = useState(1);
  const [propuesta, setPropuesta] = useState('0');
  const [materia, setMateria] = useState("");
  const [materiaA, setMateriaA]=useState("")
  const [habilitado, sethabilitado]=useState(false)
  const [recursado, setRecursado]= useState('N')

  const [datosComianio, setDatoscomianio]=useState(null)
  const [datosComianioA, setDatoscomianioA]=useState(null)

  const [resumenMateriaAnio, setResumenMateriaAnio]= useState(null)
  const [resumenMateriaAnioA, setResumenMateriaAnioA]= useState(null)

  
  useEffect(() => {
    const getMatComisiones = async () => {
      //
      try{
      const resu = await traerMateriasComiAnio(anioI,sede);
      
      //console.log(resu);
      setMaterias(resu)
      setMateria(resu[0].nombre)
      }catch(error){
        alert('Año sin comisiones')
    }
      
    };
    if(anioI && sede && anioI>2016){
    getMatComisiones();
    }
   
  }, [anioI, sede]);

  

  useEffect(() => {
    const getMatComisiones = async () => {
      const resu = await traerMateriasComiAnio(2024,1);
      setMaterias(resu);
    };

    getMatComisiones();
  }, []);

  
  const onHandleChange = (event) => {
    
    setMaterias(null)
    sethabilitado(false)
    if (event.target.name === "anioI") {
      setAnioI(event.target.value);
      //setTimeout(()=>setMateria(null),1000)
    }
    if (event.target.name === "sede") {
      setSede(event.target.value); 
      
    }

    if (event.target.name === "recursado") {
      setRecursado(event.target.value); 
      
    }
    setDatoscomianio(null)
    setDatoscomianioA(null)
    //alert(materia)
    setMateria(null)
    setTimeout(()=>setMateria(materiaA),1000)
    
  };

  const onHandleChangeM = async (event) => {
    //console.log(event.target.value);
    //const resu = await traerComisionesMateriaAnio(anioI, event.target.value);
    //setComisiones(resu);
   sethabilitado(false)
    setMateria(null)
   setTimeout(()=>{
    setMateria(event.target.value)
    setMateriaA(event.target.value) 
  },1000)
    
    
    //setEjecuta(true)
  };
  

  const onHandleChangeP=(event)=>{
    //console.log(event.target.value)
    setPropuesta(event.target.value)
    setDatoscomianio(null)
    setDatoscomianioA(null)
  }
  
  const calcularActividadCompleta=(detalle, t)=>{


    let cantiRegular = detalle.reduce((total,valorActual)=>{return total + parseInt(valorActual.regular)}, 0)
    let cantiReprobado = detalle.reduce((total,valorActual)=>{return total + parseInt(valorActual.reprobado)}, 0)
    let cantiAusente = detalle.reduce((total,valorActual)=>{return total + parseInt(valorActual.ausente)}, 0)
    let cantiPromo = detalle.reduce((total,valorActual)=>{return total + parseInt(valorActual.promocionado)}, 0)
    let cantiAprobE1 = detalle.reduce((total,valorActual)=>{return total + parseInt(valorActual.examenuno)},0)
    let cantiAprobE2 = detalle.reduce((total, valorActual)=>{return total + parseInt(valorActual.examendos)},0)
    let cantiTotal = detalle.reduce((total,valorActual)=>{return total + parseInt(valorActual.total)}, 0)
    
   
    const datoresumen = {
      totalInsc: cantiTotal,
      totalRegulares: cantiRegular,
      totalReprobados: cantiReprobado,
      totalAusentes: cantiAusente,
      totalPromocionados: cantiPromo,
      totalAprobadosE1: cantiAprobE1,
      totalAprobadosE2: cantiAprobE2,
      indiceR: cantiTotal ? (cantiRegular / cantiTotal).toFixed(2) : 0,
      indiceP: cantiTotal ? (cantiPromo / cantiTotal).toFixed(2) : 0,
      indiceE1: cantiTotal ? (cantiAprobE1 / cantiTotal).toFixed(2) : 0,
      indiceE2: cantiTotal ? (cantiAprobE2 / cantiTotal).toFixed(2) : 0,
      indiceT: cantiTotal
        ? (0.7 * (cantiRegular / cantiTotal) + 0.3 * (cantiPromo / cantiTotal)).toFixed(2)
        : 0,
      indiceTE1: cantiTotal
        ? (0.7 * (cantiRegular / cantiTotal) + 0.3 * ((cantiPromo + cantiAprobE1) / cantiTotal)).toFixed(2)
        : 0,
      indiceTE2: cantiTotal
        ? (0.7 * (cantiRegular / cantiTotal) + 0.3 * ((cantiPromo + cantiAprobE2) / cantiTotal)).toFixed(2)
        : 0,
    };
    
     //console.log(datoresumen)

    if (t===1){
      setResumenMateriaAnio(datoresumen)
    }else if(t===2){
      setResumenMateriaAnioA(datoresumen)
    }




  }






  const onHandleInfo = async (event) => {
    try {
      // Se ejecutan las llamadas en paralelo para mejorar el rendimiento
      const [resu, detalleComi, detalleComiA] = await Promise.all([
        traerMateriasComiAnio(anioI),
        traerDetalleComisiones(anioI, materia, sede, recursado,propuesta),
        traerDetalleComisiones(anioI-1, materia, sede, recursado, propuesta),
      ]);
  
      // Actualizamos los estados una vez que tenemos todos los datos
      setMaterias(resu);
      setDatoscomianio(detalleComi);
      setDatoscomianioA(detalleComiA);
      
    
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(()=>{
    if(datosComianio && datosComianioA){
      
        calcularActividadCompleta(datosComianio,1)
        calcularActividadCompleta(datosComianioA,2)
        
    }
  },[datosComianio,datosComianioA])

  useEffect(()=>{
    if(resumenMateriaAnio && resumenMateriaAnioA){
      //console.log(resumenMateriaAnio, resumenMateriaAnioA)
    sethabilitado(true);
    }
  }, [resumenMateriaAnio,resumenMateriaAnioA])

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
          <Typography variant="h6" textAlign={"center"}>
            Resultado Comisiones por Sede - Actividad 
          </Typography>
        </Grid>
        
          <Grid item xs={12} md={1} sx={{ mr: 1 }}>
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
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={2}>
            <InputLabel id="propuesta">Propuesta</InputLabel>
            <Select
              variant="standard"
              name="propuesta"
              id="propuesta"
              value={propuesta}
              onChange={onHandleChangeP}
            >
                <MenuItem value={'0'}>Todas</MenuItem>
                <MenuItem value={'2'}>L.Administracion</MenuItem>
                <MenuItem value={'3'}>L.Economía</MenuItem>
                <MenuItem value={'7'}>L.Logistica</MenuItem>
                <MenuItem value={'8'}>C.Público</MenuItem>
              
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel id="materias">Actividad</InputLabel>
            <Select
              variant="standard"
              name="materias"
              id="materias"
              onChange={onHandleChangeM}
            >
              {materias
                ?  materias.map((elemento, index) => (
                    <MenuItem value={elemento.nombre} key={index}>
                      {elemento.nombre}
                    </MenuItem>
                  ))
                 : null}
            </Select>
          </Grid>

          
          <Grid item xs={12} md={1}>
            <InputLabel id="sede">T.Comision</InputLabel>
            <Select
              variant="standard"
              name="recursado"
              id="recursado"
              value={recursado}
              onChange={onHandleChange}
            >
                <MenuItem value={'N'}>Normal</MenuItem>
               <MenuItem value={'R'}>Recursada</MenuItem>
                <MenuItem value={'S'}>Ambas.</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>
       
          
        </Box>
      </Grid>

      {materia && anioI>2018 && datosComianio && datosComianioA && habilitado  ? (
        <>
        {datosComianio.length >0 ?
        <InfoMuestraComisiones resumenM= {resumenMateriaAnio} datosComi={datosComianio} anio={anioI} materia={materia}/>
        : <NotDataFound message={'Año :' + anioI} messageone={'Podria ser que la actividad no corresponda a una propuesta o no se haya dictado en dicho año'}/>}
        <hr />
        {datosComianioA.length >0 ?
        <InfoMuestraComisiones resumenM= {resumenMateriaAnioA} datosComi={datosComianioA} anio={anioI-1} materia={materia}/>
        :<NotDataFound message={'Año :' + (anioI-1) } messageone={'Podria ser que la actividad no corresponda a una propuesta o no se haya dictado en dicho año'}/>}
        </>)
       : <HelpBusquedaResultadoA />}
    </Container>
  );
};

export default ComisionesCursadasAnioResultado;

/* <Grid item xs={12} md={1} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onHandleInfo}>
              Aceptar
            </Button>
          </Grid>*/