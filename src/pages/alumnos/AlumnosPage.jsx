import { Box, Container, Grid, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'

import AlumnosSedePropuesta from '../../components/alumnos/AlumnosSedePropuesta'
import { useAlumnosActivos } from '../../hooks/useAlumnosActivos'
import { traerCoeficientesPropuestasPlan } from '../../services/servicesRendimiento'

const AlumnosPage = () => {


  const {loading, error, alumnosUbiSede, alumnosAnioCursada} = useAlumnosActivos()
  
  const [datosAlu, setDatosalu]=useState(null)
  const [datosAluCursada, setDatosAluCursada]= useState(null)
  const [datoscoeft, setDatosCoef]= useState([])
  
  
  useEffect(() => {

        
   //console.log(alumnosUbiSede)
     const datos = {
        cantiCPNmza:0, //cpn mendoza
        cantiCPNsr:0, //cpn san radael
        cantiCPN:0,  //total CPN 
        cantiCPmza:0, //cp mendoza 19
        cantiCP26mza:0, //cp mendoza 26
        cantiCPsr:0, //cp sr 19
        cantiCP26sr:0, //cp sr 26
        cantiCP:0, //total cp 19
        cantiLA98:0, 
        cantiLA19:0,
        cantiLA26:0,
        cantiLE98:0,
        cantiLE19:0,
        cantiLE26:0,
        cantiLLOmza:0,
        cantiLLOeste:0,
        cantiLLO:0,
        cantiLLO2mza:0,
        cantiLLO2este:0,
        cantiLLO2:0,
        cantiLNRGeste:0,
        cantiLNRGgval:0,
        cantiLNRG:0,
        
        
      }
    const cargarcantiplanes = async() => {
      
     
    console.log(alumnosUbiSede)
    
      let srCPN = null 
      let srCP = null
      let srCP26=null

      let mzaCPN=null
      let mzaCP=null
      let mzaCP26 = null
    
      let mzaLA98=null
      let mzaLA19 = null  
      let mzaLA26=null

      let mzaLE98 = null
      let mzaLE19 = null
      let mzaLE26=null
      
      let mzaLLO = null
      let mzaLLO2 = null
        
      let esteLLO=null
      let esteLLO2=null
    
      let esteLNRG=null
      let galvLNRG = null
      

     

      srCPN = alumnosUbiSede.filter(ele=>ele.sede==='SRF' && ele.codigo==='CPN98')
      srCP =alumnosUbiSede.filter(ele=>ele.sede==='SRF' && ele.codigo ==='CP19')  
      srCP26 =alumnosUbiSede.filter(ele=>ele.sede==='SRF' && ele.codigo ==='CP26')

      mzaCPN = alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CPN98')
      mzaCP =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CP19')
      mzaCP26 = alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CP26')
         
      mzaLA98 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA98')
      mzaLA19 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA19')
      mzaLA26 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA26')
      
      mzaLE98 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE98')
      mzaLE19 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE19')
      mzaLE26 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE26')
    
      mzaLLO =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LLO16')
      mzaLLO2 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LLO25')
     
      esteLLO =alumnosUbiSede.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='LLO16')
      esteLLO2 =alumnosUbiSede.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='LLO25')

      esteLNRG =alumnosUbiSede.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='GNR12')
      galvLNRG =alumnosUbiSede.filter(ele=>ele.sede==='GALV' && ele.codigo ==='GNR12')
      
      
      //console.log(mzaCP.length,mzaLE26.length,mzaLA26.length)

      
      datos.cantiCPNmza = mzaCPN.length===1 ? mzaCPN[0].count : mzaCPN.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
      datos.cantiCPNsr = srCPN.length===1 ? srCPN[0].count : srCPN.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0)
      datos.cantiCPN= datos.cantiCPNmza + datos.cantiCPNsr //total cpn
      
      datos.cantiLA98 = mzaLA98.length===1 ? mzaLA98[0].count : mzaLA98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0)
      datos.cantiLE98 = mzaLE98.length===1 ? mzaLE98[0].count : mzaLE98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0)
       
      //cp mza
       datos.cantiCPmza = mzaCP.length===1 ? mzaCP[0].count : mzaCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiCP26mza = mzaCP26.length===1 ? mzaCP26[0].count : mzaCP26.map(item=>item.count).reduce((prev, curr)=>prev + Number(curr), 0)
       
       //cp sr
       datos.cantiCPsr = srCP.length===1 ? srCP[0].count : srCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiCP26sr = srCP26.length===1 ? srCP26[0].count : srCP26.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)


      datos.cantiCP=datos.cantiCPmza + datos.cantiCPsr//total CP

       datos.cantiLA19 = mzaLA19.length===1 ? mzaLA19[0].count : mzaLA19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLE19 = mzaLE19.length===1 ? mzaLE19[0].count : mzaLE19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLA26 = mzaLA26.length===1 ? mzaLA26[0].count : mzaLA26.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLE26 = mzaLE26.length===1 ? mzaLE26[0].count : mzaLE26.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)

       datos.cantiLLOmza = mzaLLO.length===1 ? mzaLLO[0].count : mzaLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLLO2mza = mzaLLO2.length===1 ? mzaLLO2[0].count : mzaLLO2.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)

       //mzaLA19 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA19')
       //mzaLE19 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE19')
       
       //logistica este
       datos.cantiLLOeste = esteLLO.length===1 ? esteLLO[0].count : esteLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLLO2este = esteLLO2.length===1 ? esteLLO2[0].count : esteLLO2.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)

       
       datos.cantiLLO=datos.cantiLLOmza + datos.cantiLLOeste //total LLO
      
       datos.cantiLLO2=datos.cantiLLO2mza + datos.cantiLLO2este //total LLO

       datos.cantiLNRGeste = esteLNRG.length===1 ? esteLNRG[0].count : esteLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLNRGgval = galvLNRG.length===1 ? galvLNRG[0].count : galvLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       
      
       datos.cantiLNRG = parseInt(datos.cantiLNRGgval) + parseInt(datos.cantiLNRGeste)        
      setDatosCoef(await traerCoeficientesPropuestasPlan())
      console.log(datos.cantiCP)
      console.log(datos)
      setDatosalu(datos)
      }
    
   
    if(alumnosUbiSede){
      
        cargarcantiplanes()
        setDatosAluCursada(alumnosAnioCursada)
    }
  }, [alumnosUbiSede, alumnosAnioCursada])
  
  


  


  if(loading) return <p>Cargando datos .....</p>

  if(error) return <p>Error de Carga</p>
   
  return (
  
<Container maxWidth={false} sx={{ width: '90%', px: 10, mt: 3 }}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: 'beige',
          width: '100%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            px: 2,
            py: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5">
            Estudiantes Activos Ciclo Lectivo
          </Typography>
        </Box>

        {/* Cantidad de estudiantes */}
   
      </Box>
    </Grid>

    {/* Componente condicional */}
    {datosAlu && (
      <Grid item xs={12}>
        <AlumnosSedePropuesta
          alumnosSede={datosAlu}
          alumnoscursada={datosAluCursada}
          datoscoeft={datoscoeft}
        />
      </Grid>
    )}
  </Grid>
</Container>
  )

}
export default AlumnosPage