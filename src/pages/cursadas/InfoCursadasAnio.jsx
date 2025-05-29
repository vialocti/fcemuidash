import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { traerComisionesPerLect, traerComparativaInscripcionesActividad, traerListadoAlumnosComision, traerListadoComisiones } from '../../services/servicesCursadas.js'

import PestañasComisiones from '../../components/cursadas/infocursadas/PestañasComisiones.jsx'
import TablaComparativaInscripciones from '../../components/cursadas/TablaComparativaInscripciones.jsx'

const InfoCursadasAnio = () => {
  const [comisionesAnio, setComisionesAnio] = useState(null)
 const [comisionesAnioSel, setComisionesAnioSel] = useState(null)
  const [sedeComisionesPLM, setSedeComisionesPLM] = useState(null)
  const [comisiones, setComisiones] = useState(null)
  const [comisionNombre, setComisionNombre] = useState('')
  const [pgenerico, setPgenerico] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [comision, setComision] = useState('')
  const [anio, setAnio] = useState(0)

  const [sedeSel, setSedeSel] = useState('')
  const [periodosPorSede, setPeriodosPorSede] = useState([])
  const [actividad, setActividad] = useState('')
  const [actividadesUnicas, setActividades] = useState([])
  const [datos, setDatos] = useState(null)
  const [procesado, setProcesado]=useState(false)
  const [habilitado, sethabilitado]=useState(false)

  useEffect(() => {
    let fecha = new Date().toISOString()
    let fechacompa = fecha.substring(0, 4) + '-04-01'
    setAnio(Number(fecha.substring(0, 4)) - (fecha < fechacompa ? 1 : 0))
  }, [])

  useEffect(() => {
    const cargar = async () => {
      setComisionesAnio(await traerListadoComisiones(anio))
      setSedeComisionesPLM(await traerComisionesPerLect(anio))
    }
    cargar()
  }, [anio])


  
  
  const traerubicacion = sede => ({ MZA: 1, SRF: 2, ESTE: 4 }[sede] || null)

  const traerPgenerico = nombre => ({
    'Anual': 1, '1er Cuatrimestre': 2, '2do Cuatrimestre': 3,
    '1er Bimestre': 10, '2do Bimestre': 11,
    '3er Bimestre': 12, '4to Bimestre': 13
  }[nombre] || null)

  const obtenerPeriodosPorSede = (sede) => {
    const periodos = sedeComisionesPLM
      ?.filter(item => item.sede === sede)
      .map(item => item.nombre)
    const periodosUnicos = [...new Set(periodos)]
    setPeriodosPorSede(periodosUnicos)
  }
//
  const mostrarActividades = (sede, nombre) => {
    let ubi = traerubicacion(sede)
    let pgen = traerPgenerico(nombre)
    setPgenerico(pgen)
    setPeriodo(nombre)
  
    const comisionesFiltro = comisionesAnio
      ?.filter(item => item.ubicacion === ubi && item.periodo_generico === pgen)
  
    const actividadesUnicas = [...new Set(comisionesFiltro?.map(item => item.mater))]
      .sort((a, b) => a.localeCompare(b)) // ← Orden alfabético
  
    setActividades(actividadesUnicas)
    setComision('')
  }
  
  const filtrarComisionesPorActividad = async (actividadNombre, sede, periodoNombre) => {
    const ubicacion = traerubicacion(sede)
    const periodoGenerico = traerPgenerico(periodoNombre)
  
    const comisionesFiltradas = comisionesAnio
      ?.filter(item =>
        item.mater === actividadNombre &&
        item.ubicacion === ubicacion &&
        item.periodo_generico === periodoGenerico
      )
  
    const resultados = await Promise.all(
      comisionesFiltradas.map(async (item) => {
        const listado = await traerListadoAlumnosComision(item.comision, anio, sedeSel, actividadNombre)
        const cantidad = Array.isArray(listado) ? listado.length : 0;

        return {
          comision: item.comision,
          nombre: item.nmat,
          alumnos:listado || [],
          total: cantidad
        }
      })
    )
  
   // console.log(resultados)
    return resultados
  }
  useEffect(()=>{
    if(comisiones){
    setProcesado(false)
    }
  }, [comisiones])
  
  const onHandleMostrar = async () => {
    setComisiones(null)
    setDatos(null)
    if(!procesado){
    setProcesado(true)
    const resultadoI = await traerComparativaInscripcionesActividad(anio, sedeSel, actividad,pgenerico)
    setDatos(resultadoI)
    const resultadoC = await filtrarComisionesPorActividad(actividad, sedeSel, periodo)
    setComisiones(resultadoC)
    }
    //console.log(datos)
  }
  
  

  return (
    <Container>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center" color="white" backgroundColor="#444444" sx={{ borderRadius: 1 }}>
            Informe de Inscriptos por Actividad
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id="select-sede-label">Sede</InputLabel>
            <Select
              labelId="select-sede-label"
              value={sedeSel}
              label="Sede"
              onChange={(e) => {
                setSedeSel(e.target.value)
                setPeriodo('')
                obtenerPeriodosPorSede(e.target.value)
                setComisionesAnioSel(null)
                setComisionNombre(null)
              }}
            >
              {[...new Set(sedeComisionesPLM?.map(item => item.sede))]
                .filter(sede => sede !== 'GALV')
                .map((sede, index) => (
                  <MenuItem key={index} value={sede}>{sede}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth disabled={!sedeSel}>
            <InputLabel id="select-periodo-label">Periodo Lectivo</InputLabel>
            <Select
              labelId="select-periodo-label"
              value={periodo}
              label="Periodo Lectivo"
              onChange={(e) => {
                const nombre = e.target.value
                setPeriodo(nombre)
                mostrarActividades(sedeSel, nombre)
                setComisiones(null)
              }}
            >
              {periodosPorSede?.map((nombre, index) => (
                <MenuItem key={index} value={nombre}>
                  {sedeSel} - {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5}>
            <FormControl fullWidth disabled={!actividadesUnicas}>
                <InputLabel id="select-actividad-label">Actividad</InputLabel>
                <Select
                  labelId="select-actividad-label"
                  value={actividad}
                  label="Actividad"
                  onChange={async (e) => {
                  
                    const act = e.target.value
                    setComisionNombre(null)
                    setProcesado(false)
                    setActividad(act)
                    setComisiones(null)
                    
                   
                  
                  
                  }}
                >
                  {actividadesUnicas?.map((nombre, index) => (
                    <MenuItem key={index} value={nombre}>
                      {nombre}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

        </Grid>
        <Grid item xs={12} md={2}>
            <Button onClick={onHandleMostrar}>Mostrar</Button>
        </Grid>          
      </Grid>

      <Grid container spacing={2} alignItems="center">
       {datos && comisiones ?<>
       
        {datos  &&(
          
          
          <TablaComparativaInscripciones datos={datos} />
        
      )}
  
      {comisiones && comisiones.length > 0 && (
            
            <PestañasComisiones comisiones={comisiones} />
            
      )}
      </>
      :procesado?<>   <CircularProgress size={24} sx={{ mt:4,ml: 2 }} /><Typography variant='h5' sx={{ mt:4,ml: 2 }} >Procesando Datos...</Typography></>:null} 
      </Grid>
      
       
        
    </Container>
  )
}

export default InfoCursadasAnio
