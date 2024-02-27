import React, {useEffect, useState} from 'react'


import AlumnosSedePropuesta from '../../components/alumnos/AlumnosSedePropuesta'
import { useAlumnosActivos } from '../../hooks/useAlumnosActivos'
import { Box, Grid, Typography , Step} from '@mui/material'

const AlumnosPage = () => {


  const {loading, error,cantidadA, alumnosUbiSede, planesact} = useAlumnosActivos(2023)
  
  const [datosAlu, setDatosalu]=useState(null)
  useEffect(() => {

      
   // console.log(alumnosUbiSede)
     const datos = {
        cantiCPNmza:0,
        cantiCPNsr:0,
        cantiCPN:0,
        cantiCPmza:0,
        cantiCPsr:0,
        cantiCP:0,
        cantiLA98:0,
        cantiLA19:0,
        cantiLE98:0,
        cantiLE19:0,
        cantiLLOmza:0,
        cantiLLOeste:0,
        cantiLLO:0,
        cantiLNRGeste:0,
        cantiLNRGgval:0,
        cantiLNRG:0
      }
    const cargarcantiplanes =() => {
      
     
    
      let mzaCPN=null
      let srCPN = null
      let mzaCP=null
      let srCP = null
      let mzaLA98=null
      let mzaLE98 = null
      let mzaLA19=null
      let mzaLE19 = null
      let mzaLLO = null
      let esteLLO=null
      let esteLNRG=null
      let galvLNRG = null

      mzaCPN = alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CPN98')
      srCPN = alumnosUbiSede.filter(ele=>ele.sede==='SRF' && ele.codigo==='CPN98')
      mzaCP =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CP19')
      srCP =alumnosUbiSede.filter(ele=>ele.sede==='SRF' && ele.codigo ==='CP19')      
      
      mzaLA98 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA98')
      mzaLE98 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE98')
      mzaLA19 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA19')
      mzaLE19 =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE19')
      mzaLLO =alumnosUbiSede.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LLO')

      esteLLO =alumnosUbiSede.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='LLO')
      esteLNRG =alumnosUbiSede.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='GNR12')
      galvLNRG =alumnosUbiSede.filter(ele=>ele.sede==='GALV' && ele.codigo ==='GNR12')
      
      
      

      
      datos.cantiCPNmza = mzaCPN.length===1 ? mzaCPN[0].count : mzaCPN.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
      datos.cantiCPNsr = srCPN.length===1 ? srCPN[0].count : srCPN.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0)
      datos.cantiCPN= datos.cantiCPNmza + datos.cantiCPNsr //total cpn
      
      datos.cantiLA98 = mzaLA98.length===1 ? mzaLA98[0].count : mzaLA98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0)
      datos.cantiLE98 = mzaLE98.length===1 ? mzaLE98[0].count : mzaLE98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0)
       
      //cp mza
       datos.cantiCPmza = mzaCP.length===1 ? mzaCP[0].count : mzaCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
      //cp sr
       datos.cantiCPsr = srCP.length===1 ? srCP[0].count : srCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiCP=datos.cantiCPmza + datos.cantiCPsr //total CP

       datos.cantiLA19 = mzaLA19.length===1 ? mzaLA19[0].count : mzaLA19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLE19 = mzaLE19.length===1 ? mzaLE19[0].count : mzaLE19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)

       datos.cantiLLOmza = mzaLLO.length===1 ? mzaLLO[0].count : mzaLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)

       //logistica este
       datos.cantiLLOeste = esteLLO.length===1 ? esteLLO[0].count : esteLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       
       datos.cantiLLO=datos.cantiLLOmza + datos.cantiLLOeste //total LLO
       datos.cantiLNRGeste = esteLNRG.length===1 ? esteLNRG[0].count : esteLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       datos.cantiLNRGgval = galvLNRG.length===1 ? galvLNRG[0].count : galvLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0)
       
      
       datos.cantiLNRG = datos.cantiLNRGgval + datos.cantiLNRGeste        
     
      setDatosalu(datos)
      }
    
   
    if(alumnosUbiSede){
        cargarcantiplanes()
        
    }
  }, [alumnosUbiSede])
  
  


  


  if(loading) return <p>Cargando datos .....</p>

  if(error) return <p>Error de Carga</p>
   //console.log(datosAlu)
  return (
    
    <Grid container>
      
      <Grid item xs={12} sx={{backgroundColor:'blue', m:1, border:1}}>

          <Typography variant='h5' sx={{textAlign:'center' }}> Estudiantes Activos Ciclo Lectivo</Typography>
      </Grid>

      
        
        <Grid item xs={12} md={12} sx={{border:2,borderColor:'blue', borderRadius:4,mr:2}}>
          <Box sx={{m:2,display:'flex'}}>
            <Typography variant='h5'>Cantidad Estudiantes: </Typography>
            <Typography variant='h5' color={'blue'}>{cantidadA?cantidadA[0].canti:0}</Typography>
            </Box>
        </Grid>
      
      
      
      <Grid item xs={12} md={12}>
        {datosAlu
        ?<AlumnosSedePropuesta alumnosSede={datosAlu} />
        :null
        
      }
      </Grid>
      
  
  </Grid>
  )

}
export default AlumnosPage