import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { traeResultadosMesasPeriodo, traerPeriodosExamen } from '../../../services/servicesExamenes';

import { calcularaniolectivo } from '../../../utils/helpers/calcularanio'

function extraerPeriodosComoString(arrayDeDatos) {
  // 1. Validar que el input sea un array válido
  if (!Array.isArray(arrayDeDatos) || arrayDeDatos.length === 0) {
    return ""; // Devolver un string vacío si el array no es válido o está vacío
  }

  // 2. Extraer los valores de 'turno_examen_periodo'
  const periodos = arrayDeDatos.map(objeto => objeto.turno_examen_periodo);

  // 3. Unir los valores en un string y devolverlo
  return periodos.join(',');
}

const calcularSumasPorCriterios = (arr, filtros) => {
  // 1. Filtra el array usando todos los criterios del objeto 'filtros'.
  // Si el objeto de filtros está vacío, filter() devolverá el array completo,
  // lo cual es exactamente lo que queremos.
  const datosFiltrados = arr.filter(objeto => {
    // `every()` verifica que el objeto cumpla con CADA criterio especificado en 'filtros'.
    return Object.keys(filtros).every(criterio => {
      // Comparamos el valor del objeto con el valor del filtro para esa clave (criterio).
      return objeto[criterio] === filtros[criterio];
    });
  });

  // 2. Suma los campos 'aprobados', 'ausentes' y 'reprobados' de los elementos filtrados.
  // Usamos reduce, pero esta vez el acumulador es un objeto.
  const sumas = datosFiltrados.reduce((acumulador, objeto) => {
    // Aseguramos la conversión a número con parseInt para cada campo
    acumulador.aprobados += parseInt(objeto.aprobados, 10) || 0;
    acumulador.ausentes += parseInt(objeto.ausentes, 10) || 0;
    acumulador.reprobados += parseInt(objeto.reprobados, 10) || 0;
    
    return acumulador;
  }, { aprobados: 0, ausentes: 0, reprobados: 0 }); // El valor inicial del acumulador es este objeto.

  // 3. Devuelve el objeto con las sumas finales.
  return sumas;
};


const ExamenesTab = () => {
 
  const colorDeFondo = '#e0f7fa'; // Color de fondo personalizado
  const [periodosturno, setPeriodosturno] = useState('')
  const [examenesresultados, setExamenesresultados] = useState([])
  const [anioselected, setAnioselected] = useState(calcularaniolectivo())

  //cantidad sedes
  const [totmesas, setTotmesas] = useState(0)
  const [totalexamenes, setTotalexamenes] = useState(0)
  const [totalaprobados, setTotalaprobados] = useState(0)
  const [totaldesaprobados, setTotaldesaprobados] = useState(0)
  const [totalausentes , setTotalausentes] = useState(0)

  const [aprobadosMza, setAprobadosMza] = useState(0)
  const [desaprobadosMza, setDesaprobadosMza] = useState(0)
  const [ausentesMza, setAusentesMza] = useState(0)

  const [aprobadosSR, setAprobadosSR] = useState(0)
  const [desaprobadosSR, setDesaprobadosSR] = useState(0)
  const [ausentesSR, setAusentesSR] = useState(0)

  const [aprobadosEste, setAprobadosEste] = useState(0)
  const [desaprobadosEste, setDesaprobadosEste] = useState(0)
  const [ausentesEste, setAusentesEste] = useState(0)


  const [aprobadosGA, setAprobadosGA] = useState(0)
  const [desaprobadosGA, setDesaprobadosGA] = useState(0)
  const [ausentesGA, setAusentesGA] = useState(0)

 //cantidades por propuestas

 const [aprobadosCPN, setAprobadosCPN] = useState(0)
  const [desaprobadosCPN, setDesaprobadosCPN] = useState(0)
  const [ausentesCPN, setAusentesCPN] = useState(0)

  const [aprobadosCP, setAprobadosCP] = useState(0)
  const [desaprobadosCP, setDesaprobadosCP] = useState(0)
  const [ausentesCP, setAusentesCP] = useState(0)

  const [aprobadosLA, setAprobadosLA] = useState(0)
  const [desaprobadosLA, setDesaprobadosLA] = useState(0)
  const [ausentesLA, setAusentesLA] = useState(0)


  const [aprobadosLE , setAprobadosLE] = useState(0)
  const [desaprobadosLE, setDesaprobadosLE] = useState(0)
  const [ausentesLE, setAusentesLE] = useState(0)

  const [aprobadosLLO, setAprobadosLLO] = useState(0)
  const [desaprobadosLLO, setDesaprobadosLLO] = useState(0)
  const [ausentesLLO, setAusentesLLO] = useState(0)


  const [aprobadosLNRG, setAprobadosLNRG] = useState(0)
  const [desaprobadosLNRG, setDesaprobadosLNRG] = useState(0)
  const [ausentesLNRG, setAusentesLNRG] = useState(0)

  const determinarColorDeFondo = (car) => {
    let relacion = 0;
    car= car || ''; // Asegurarse de que 'car' no sea undefined o null
    if (car==='CP'){
      relacion = aprobadosCP / (desaprobadosCP + aprobadosCP);
    }
    if (car==='CPN'){ 
      relacion = aprobadosCPN / (desaprobadosCPN + aprobadosCPN);
    }

    if (car==='LA'){
      relacion = aprobadosLA / (desaprobadosLA + aprobadosLA);
    }
    if (car==='LE'){
      relacion = aprobadosLE / (desaprobadosLE + aprobadosLE);
    }

    if (car==='LLO'){
      relacion = aprobadosLLO / (desaprobadosLLO + aprobadosLLO);
    }
    if (car==='LNRG'){  
      relacion = aprobadosLNRG / (desaprobadosLNRG + aprobadosLNRG);
    }


    if (relacion >= (totalaprobados/(totalaprobados+totaldesaprobados)).toFixed(2)) return 'success.light';
    if (relacion <= (totalaprobados/(totalaprobados+totaldesaprobados)).toFixed(2)) return 'warning.light';
    
    return 'error.light';
  };

  useEffect(() => {
   
   const fetchTurnos = async () => {
        try {

            const response = await traerPeriodosExamen(anioselected) 
            const periodosString = extraerPeriodosComoString(response);
            //console.log(periodosString)
            setPeriodosturno(periodosString);
          
          } catch (error) {
            console.error('Error al obtener turnos:', error);
          }

    }  
    if (anioselected) {
      fetchTurnos(); 
    }
 } ,[anioselected]);


  useEffect(() => {
    const fetchResultados = async () => {
      try {
       const response = await traeResultadosMesasPeriodo(anioselected,periodosturno,5)
     // console.log(response)
     setTotmesas(response.length)
      setExamenesresultados(response)
      } catch (error) {
        console.error('Error al obtener resultados de mesas:', error);
      }
    };
    if (anioselected && periodosturno) {
      fetchResultados();
    }
  },[anioselected, periodosturno])


  useEffect(() => { 
    const totalGeneral = calcularSumasPorCriterios(examenesresultados, {});
    console.log("Total General:", totalGeneral);

    setTotalexamenes(totalGeneral.aprobados + totalGeneral.reprobados + totalGeneral.ausentes);
    setTotalaprobados(totalGeneral.aprobados);
    setTotaldesaprobados(totalGeneral.reprobados);
    setTotalausentes(totalGeneral.ausentes);



    // Sumas por sede
    const totalUbicacion1 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 1 });
     //console.log("Total para Ubicación 1:", totalUbicacion1);
     setAprobadosMza(totalUbicacion1.aprobados);
     setDesaprobadosMza(totalUbicacion1.reprobados);
     setAusentesMza(totalUbicacion1.ausentes);

    const totalUbicacion2 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 2 });
    setAprobadosSR(totalUbicacion2.aprobados);
    setDesaprobadosSR(totalUbicacion2.reprobados);
    setAusentesSR(totalUbicacion2.ausentes);
    
    const totalUbicacion3 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 3 });
     
    setAprobadosGA(totalUbicacion3.aprobados);
    setDesaprobadosGA(totalUbicacion3.reprobados);
    setAusentesGA(totalUbicacion3.ausentes);

    const totalUbicacion4 = calcularSumasPorCriterios(examenesresultados, { mesa_examen_ubicacion: 4 });
    
    setAprobadosEste(totalUbicacion4.aprobados);
    setDesaprobadosEste(totalUbicacion4.reprobados);
    setAusentesEste(totalUbicacion4.ausentes);


    
  //suma por propuestas
  const totalCPN = calcularSumasPorCriterios(examenesresultados, { propuesta: "CPN" });

  setAprobadosCPN(totalCPN.aprobados);
  setDesaprobadosCPN(totalCPN.reprobados);
  setAusentesCPN(totalCPN.ausentes);

  const totalCP = calcularSumasPorCriterios(examenesresultados, { propuesta: "CP" });
  
  setAprobadosCP(totalCP.aprobados);
  setDesaprobadosCP(totalCP.reprobados);
  setAusentesCP(totalCP.ausentes);

  const totalLA = calcularSumasPorCriterios(examenesresultados, { propuesta: "LA" });
  
  setAprobadosLA(totalLA.aprobados);
  setDesaprobadosLA(totalLA.reprobados);
  setAusentesLA(totalLA.ausentes);

  const totalLE = calcularSumasPorCriterios(examenesresultados, { propuesta: "LE" });
  
  setAprobadosLE(totalLE.aprobados);
  setDesaprobadosLE(totalLE.reprobados);
  setAusentesLE(totalLE.ausentes);
  
  const totalLLO = calcularSumasPorCriterios(examenesresultados, { propuesta: "LLO" });
  
  setAprobadosLLO(totalLLO.aprobados);
  setDesaprobadosLLO(totalLLO.reprobados);
  setAusentesLLO(totalLLO.ausentes);
   
  
  const totalLNRG = calcularSumasPorCriterios(examenesresultados, { propuesta: "LNRG" });
  
  setAprobadosLNRG(totalLNRG.aprobados);
  setDesaprobadosLNRG(totalLNRG.reprobados);
  setAusentesLNRG(totalLNRG.ausentes);
  

  },[examenesresultados]);

  return (
    <Grid container spacing={2} >
    {/* Primera fila: 1 columna */}
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant='h4'>Datos de Examenes Ciclo Lectivo</Typography>
      </Paper>
    </Grid>

    {/* Segunda fila: 3 columnas */}
    <Grid item xs={12} md={2}>
      <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Mesas Examenes</Typography><Typography variant='h5'>{totmesas}</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Inscripciones.</Typography><Typography variant='h5'>{totalexamenes}</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Aprobados</Typography><Typography variant='h5'>{totalaprobados}</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Desaprobados</Typography><Typography variant='h5'>{totaldesaprobados}</Typography>
      </Paper>
    </Grid>

    <Grid item xs={12} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Ausentes</Typography><Typography variant='h5'>{totalausentes}</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
       <Typography>  Rel.Aprobados:</Typography> <Typography variant='h5'> {(totalaprobados/(totalaprobados+totaldesaprobados)).toFixed(2)}</Typography>
      </Paper>
    </Grid>



    {/* Tercera fila: 4 columnas */}
    <Grid item xs={12} sm={6} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('CP') }}>
        <Typography >CP</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosCP}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosCP}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesCP}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosCP / (desaprobadosCP + aprobadosCP)).toFixed(2)}
          </Typography>

      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LA') }}>
        <Typography>Lic.Administración</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosLA}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosLA}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesLA}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosLA / (desaprobadosLA + aprobadosLA)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LE') }}>
        <Typography>Lic.Economía</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosLE}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosLE}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesLE}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosLE / (desaprobadosLE + aprobadosLE)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LLO') }}>
        <Typography>Lic.Logistística</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosLLO}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosLE}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesLLO}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosLLO / (desaprobadosLLO + aprobadosLLO)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('CPN') }}>
        <Typography>CPN</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosCPN}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosCPN}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesCPN}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosCPN / (desaprobadosCPN + aprobadosCPN)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center',backgroundColor: determinarColorDeFondo('LNRG') }}>
        <Typography>Lic.Neg.RG</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosLNRG}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosLNRG}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesLNRG}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosLNRG / (desaprobadosLNRG + aprobadosLNRG)).toFixed(2)}
          </Typography>
       
      </Paper>
    </Grid>

    {/* Cuarta fila: 4 columnas */}
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Mendoza</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosMza}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosMza}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesMza}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosMza / (desaprobadosMza + aprobadosMza)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography>San Rafael</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosSR}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosSR}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesSR}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosSR / (desaprobadosSR + aprobadosSR)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography>Gral.Alvear</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosGA}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosGA}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesGA}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosGA / (desaprobadosGA + aprobadosGA)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <Typography>San Martin</Typography>
        <Typography variant='h6'>Aprobados: {aprobadosEste}</Typography>
        <Typography variant='h6'>Desaprobados: {desaprobadosEste}</Typography>
        <Typography variant='h6'>Ausentes: {ausentesEste}</Typography>
        <Typography variant='h6'>
           Relacion_AP {(aprobadosEste / (desaprobadosEste + aprobadosEste)).toFixed(2)}
          </Typography>
      </Paper>
    </Grid>
  </Grid>
    

  )
}

export default ExamenesTab