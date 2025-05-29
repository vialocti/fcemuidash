import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Button, Grid, Typography } from "@mui/material";
import { traerEpocasExamen, traeResultadosMesasPeriodo, traerResultadoTurno } from "../../services/servicesExamenes";
import ExamenesAnalysis from "../../components/examenes/ExamenesAnalisys";

const ReporteExamenEpocas = () => {

  const ubicaciones = [
    { value: '1', label: 'MZA' },
    { value: '2', label: 'SR' },
    { value: '3', label: 'GA' },
    { value: '4', label: 'ESTE' },
    { value: '5', label: 'FCE' }
  ];
  const currentYear = new Date().getFullYear();
  const [year1, setYear1] = useState("");
  const [year2, setYear2] = useState("");
  const [periodo, setPeriodo] = useState("T");
  const [epocasAnio1, setEpocasAnio1]= useState(null)
  const [epocasAnio2, setEpocasAnio2]= useState(null) 
  
  const [datosmesa, setDatosmesa]= useState(null)
  const [datos1, setDatos1]=useState(null)
  const [datos2, setDatos2]=useState(null)

  const [llamados1, setLlamados1]=useState(null)
  const [llamados2, setLlamados2]=useState(null)
  const [ubicacion, setUbicacion]= useState('')
  const [habilita, setHabilita]= useState(false)
 
 

   //trae los llamados de mesa
  const fetchMesas = async (anio, turnos, ubicacion=1) => {
    try {
      //console.log(selectedYear, turnosString,selectedUbicacion)
      const response = await traeResultadosMesasPeriodo(anio, turnos, ubicacion);
      setDatosmesa(response);
      const mesasData = response;

      // Construir el string con los llamado_mesa separados por comas
      const llamadoMesasString = mesasData
        .map(mesa => mesa.llamado_mesa) // Extrae el llamado_mesa
        .join(','); // Une los valores con comas
  
     return llamadoMesasString
    } catch (error) {
      console.error('Error al obtener mesas:', error);
    }
  };




 
  const handleGenerarReporte = () => {

    let turnos_dos=null
    let turnos_uno=null
    if (periodo!=='T'){
    turnos_uno = epocasAnio1.filter(element =>element.epoca ===periodo)
    turnos_dos = epocasAnio2.filter(element =>element.epoca ===periodo)
    }

    const generarDatosLLamados=async()=>{
        setLlamados1(await fetchMesas(year1,turnos_uno[0].periodos,1))
        setLlamados2(await fetchMesas(year2,turnos_dos[0].periodos,1))
      }

    if (turnos_dos, turnos_uno){
      generarDatosLLamados()
    }
   
  };
  ///traer datos de epoca


  //funcion de carga de datos

  const fetchResultados = async (llamados) => {
    try {
      //const response = await axios.get(http://200.12.136.75:5000/examenes/resultadoturno/${llamados});
      const response = await traerResultadoTurno(llamados)
      const resultadosMap = {
        A: 0,
        R: 0,
        U: 0,
      };
  
      // Recorrer el array y llenar los totales
      response.forEach(item => {
        resultadosMap[item.resultado] = parseInt(item.total, 10) || 0;
      });
      //console.log(resultadosMap)
  
      return resultadosMap;
     
    } catch (error) {
      console.error('Error al obtener turnos:', error);
      return false
    }
  };

  useEffect(()=>{
    

    const generarDatos=async()=>{
      setDatos1(await fetchResultados(llamados1))
      setDatos2(await fetchResultados(llamados2))
    }

 
    if(llamados1 && llamados2){
      generarDatos()
    }

  },[llamados1, llamados2])


  //set epocas anio
  useEffect(()=>{
    

    const traerEpocasAnio=async ()=>{
        setEpocasAnio1(await traerEpocasExamen(year1))
    }

     if(year1){
        traerEpocasAnio()
     }
  }, [year1])

  useEffect(()=>{
    

    const traerEpocasAnio=async ()=>{
        setEpocasAnio2(await traerEpocasExamen(year2))
    }

     if(year2){
        traerEpocasAnio()
     }
  }, [year2])


 if(datos1 && datos2){
  console.log(datos1, datos2)
 }
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Reporte de Resultados de Exámenes</Typography>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Año Inicio</InputLabel>
          <Select value={year1} onChange={(e) => setYear1(e.target.value)}>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i} value={currentYear - i}>{currentYear - i}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Año Final</InputLabel>
          <Select value={year2} onChange={(e) => setYear2(e.target.value)}>
            <MenuItem value="">(Opcional)</MenuItem>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i} value={currentYear - i}>{currentYear - i}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="ubicacion-label">Ubicación</InputLabel>
              <Select
                labelId="ubicacion-label"
                id="ubicacionSelect"
                value={ubicacion}
                label="Ubicación"
                onChange={(e) => {
                  setUbicacion(e.target.value);
                
                }}
              >
                <MenuItem value="">
                  <em>Seleccione una ubicación</em>
                </MenuItem>
                {ubicaciones.map((ubi, index) => (
                  <MenuItem key={index} value={ubi.value}>
                    {ubi.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Período</InputLabel>
          <Select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          {/*  <MenuItem value="T">Año Completo</MenuItem> */}
            <MenuItem value="I">Junio-Agosto</MenuItem>
            <MenuItem value="M">Noviembre-Diciembre</MenuItem>
            <MenuItem value="F">Febrero-Marzo</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleGenerarReporte}>
          Generar Reporte
        </Button>
      </Grid>
        {datos1 && datos2 ? <ExamenesAnalysis year1={datos1} year2={datos2} anio1={year1} anio2={year2} periodo={periodo}/> :null}

    </Grid>

  
  );
};

export default ReporteExamenEpocas;
