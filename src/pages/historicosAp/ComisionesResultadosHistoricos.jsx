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
import { datosHistoricosResultados, traerActividadesHistoricas } from "../../services/servicesCursadas";
import InfoMuestraResultadosHistoricos from "../../components/cursadas/InfoMuestraResultadosHistoricos";
import HelpBusquedaHA from "../../components/ayudas/HelpBusquedaHA";


const ComisionesResultadosHistoricos = () => {

 const [anioI, setAnioI]=useState(2021)
 const [anioF, setAnioF]=useState(2021)
 const [materias, setMaterias]= useState([])
 const [actividad, setActividad]= useState('')
 const [sede, setSede]= useState('1')
 const [tcomi, setTcomi]=useState('N')
 const [datosHistoricos, setDatosHistoricos]=useState(null)


 const onHandleChange=(e)=>{
    setDatosHistoricos(null)
    if(e.target.name==='anioI'){
      setAnioI(e.target.value)
      setAnioF(e.target.value)
    }else if(e.target.name==='anioF'){
      setAnioF(e.target.value)
    }else if(e.target.name==='actividades'){
      setActividad(e.target.value)
    }else if(e.target.name==='sede'){
      setSede(e.target.value)
    }else if(e.target.name==='tcomi'){
      setTcomi(e.target.value)
    }
 
  }
  //traer activades de sede 1 año 2021
  useEffect(()=>{
    const getActividades= async()=>{
    setMaterias(await traerActividadesHistoricas(sede, anioI))
    }

    getActividades()
  
  },[])

  useEffect(()=>{

  },[materias, datosHistoricos])

  //si cambiamos sede o anio inicio
  useEffect(() => {
     
    const getActividades= async()=>{
        
        setMaterias(await traerActividadesHistoricas(sede, anioI))
    }

    if(sede && anioI){
      getActividades()
     
    }
    
  }, [sede, anioI])
  
  //console.log(materias)
  const onHandleInfo=async()=>{
    setDatosHistoricos(await datosHistoricosResultados(anioI, anioF,sede, actividad, tcomi))
   // console.log(datosHistoricos)

  }

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
        ><
          Grid item xs={12} md={12} bgcolor={"blue"} color={"white"} sx={{borderRadius:2,width:'97%',p:1,marginBottom:2}}>
          <Typography variant="h5" textAlign={"center"}>
            Resultado Actividades Historico - Intervalo Años - Sede - Actividad - Tipo Comisión
          </Typography>
        </Grid>

        <Grid item xs={12} md={2} sx={{ mr: 1 }}>
            <InputLabel id="anioI">Año Inicio</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioI"
              name="anioI"
              onChange={onHandleChange}
              value={anioI}
            />
          </Grid>

          <Grid item xs={12} md={2} sx={{ mr: 1 }}>
            <InputLabel id="anioF">Año Fin</InputLabel>

            <TextField
              variant="standard"
              type="text"
              id="anioF"
              name="anioF"
              onChange={onHandleChange}
              value={anioF}
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
          <Grid item xs={12} md={2}>
            <InputLabel id="tcomi">Tipo Comisión</InputLabel>
            <Select
              variant="standard"
              name="tcomi"
              id="tcomi"
              value={tcomi}
              onChange={onHandleChange}
            >
                <MenuItem value={'N'}>Normal</MenuItem>
                <MenuItem value={'R'}>Recursada</MenuItem>
                <MenuItem value={'S'}>Ambas</MenuItem>
         
              
            </Select>
          </Grid>
          <Grid item xs={12} md={1} sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={onHandleInfo}>
                        Aceptar
                 </Button>
            </Grid>
          <Grid item xs={12} md={8}>
            <InputLabel id="actividades">Actividad</InputLabel>
            <Select
              variant="standard"
              name="actividades"
              id="actividades"
              onChange={onHandleChange}
            >
              <MenuItem value="Todas">Todas</MenuItem>
              {materias && materias.length>0
                ? materias.map((elemento, index) => (
                    <MenuItem value={elemento.actividad_nombre} key={index}>
                      {elemento.actividad_nombre}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>

          

        </Box>

      </Grid>
      {datosHistoricos
      
        ?<InfoMuestraResultadosHistoricos sede={sede} resultados={datosHistoricos} materia={actividad}/>
        :<HelpBusquedaHA/>

      }
    
    </Container>
  )
}

export default ComisionesResultadosHistoricos
