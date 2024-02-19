import { Card, CardContent, CardHeader, Container , TableContainer, Grid, Paper,Table, TableHead, TableCell, TableRow, TableBody, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
//import {useInscripcionesAnio} from '../../hooks/useInscripcionesAnio'

const AlumnosSedePropuesta = ({cantiAluSedePropuesta, planesact}) => {


  const [cantiCPNmza, setCantiCPNmza]=useState(0)
  const [cantiLA98, setCantiLA98]=useState(0)
  const [cantiLE98, setCantiLE98]=useState(0)
  const [cantiLLOmza, setCantiLLOmza]=useState(0)
  const [cantiLA19, setCantiLA19]=useState(0)
  const [cantiCPmza, setCantiCPmza]=useState(0)
  const [cantiLE19, setCantiLE19]=useState(0)
  
  const [cantiCPNsr, setCantiCPNsr]=useState(0)
  const [cantiCPsr, setCantiCPsr]=useState(0)
  
  const [cantiLLOeste, setCantiLLOeste]=useState(0)
  const [cantiLNRGeste, setCantiLNRGeste]=useState(0)

  const [cantiLNRGgval, setCantiLNRGgval]=useState(0)
  //console.log(anio)  
  useEffect(() => {
    
    //console.log(cantiAluSedePropuesta)
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

      mzaCPN = cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CPN98')
      srCPN = cantiAluSedePropuesta.filter(ele=>ele.sede==='SRF' && ele.codigo==='CPN98')
      mzaCP =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='CP19')
      srCP =cantiAluSedePropuesta.filter(ele=>ele.sede==='SRF' && ele.codigo ==='CP19')      
      
      mzaLA98 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA98')
      mzaLE98 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE98')
      mzaLA19 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LA19')
      mzaLE19 =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LE19')
      mzaLLO =cantiAluSedePropuesta.filter(ele=>ele.sede==='MZA' && ele.codigo ==='LLO')

      esteLLO =cantiAluSedePropuesta.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='LLO')
      esteLNRG =cantiAluSedePropuesta.filter(ele=>ele.sede==='ESTE' && ele.codigo ==='GNR12')
      galvLNRG =cantiAluSedePropuesta.filter(ele=>ele.sede==='GALV' && ele.codigo ==='GNR12')
      
      
      
      
      if(mzaCPN.length===1){
          setCantiCPNmza(mzaCPN[0].count)
      }else{
        setCantiCPNmza(mzaCPN.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

      }
      
      if(srCPN.length===1){
        setCantiCPNsr(srCPN[0].count)
      }else{
        setCantiCPNsr(srCPN.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0))
      }
      
      if(mzaLA98.length===1){
        setCantiLA98(mzaLA98[0].count)
       }else{
        setCantiLA98(mzaLA98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0))
      }
      
      if(mzaLE98.length===1){
        setCantiLE98(mzaLE98[0].count)
      }else{
        setCantiLE98(mzaLE98.map(item =>item.count).reduce((prev,curr) =>prev + Number(curr),0))

      }
      
      
      //cp mza
       if(mzaCP.length===1){
        setCantiCPmza(mzaCP[0].count)
       }else{
       setCantiCPmza(mzaCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }
//cp sr
       if(srCP.length===1){
        setCantiCPsr(srCP[0].count)
       }else{
       setCantiCPsr(srCP.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }

       if(mzaLA19.length===1){
        setCantiLA19(mzaLA19[0].count)
       }else{
       setCantiLA19(mzaLA19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }

       if(mzaLE19.length===1){
        setCantiLE19(mzaLE19[0].count)
       }else{
       setCantiLE19(mzaLE19.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }
       if(mzaLLO.length===1){
        setCantiLLOmza(mzaLLO[0].count)
       }else{
       setCantiLLOmza(mzaLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))

       }
       //logistica este
       if(esteLLO.length===1){
        setCantiLLOeste(esteLLO[0].count)
       }else{
       setCantiLLOeste(esteLLO.map(item=>item.count).reduce((prev,curr)=>prev + Number(curr), 0))
       }
       

       if(esteLNRG.length===1){
        setCantiLNRGeste(esteLNRG[0].count)
       }else{
        setCantiLNRGeste(esteLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0))
       }

       if(galvLNRG.length===1){
        setCantiLNRGgval(galvLNRG[0].count)
       }else{
        setCantiLNRGgval(galvLNRG.map(item =>item.count).reduce((prev,curr)=>prev + Number(curr), 0))
       }

   
      if(galvLNRG.length===1){
      setCantiLNRGgval(galvLNRG[0].count)
      }
    }

    if(cantiAluSedePropuesta){
        cargarcantiplanes()
    }
  }, [cantiAluSedePropuesta])
  
  
  
   return (
    <Container>
     
     <Grid container>

        

     <Grid item xs={12} md={12} sx={{p:2}}>
     <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>PLAN-CARRERA</TableCell>
                    <TableCell>SEDE</TableCell>
                    <TableCell>TOTAL</TableCell>
                  </TableRow>
                </TableHead>
              
                <TableBody>
                 <TableRow>
                    <TableCell><Typography variant='h6'>Total Planes 19: {cantiCPmza + cantiLA19 +cantiLE19 + cantiCPsr}</Typography> </TableCell>
                  </TableRow> 
                <TableRow>
                    <TableCell>CP19</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiCPmza}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>LA19</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiLA19}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>LE19</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiLE19}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>CP19</TableCell>
                    <TableCell>SAN RAFAEL</TableCell>
                    <TableCell>{cantiCPsr}</TableCell> 
                  </TableRow>
                  <TableRow>
                 <TableCell><Typography variant='h6'>Total Planes 98:{cantiCPNmza + cantiCPNsr + cantiLE98 + cantiLA98}</Typography></TableCell> 
                 </TableRow>
                  <TableRow>
                    <TableCell>CPN98</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiCPNmza} </TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>LA98</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiLA98}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>LE98</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiLE98}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>CPN98</TableCell>
                    <TableCell>SAN RAFAEL</TableCell>
                    <TableCell>{cantiCPNsr}</TableCell> 
                  </TableRow>
                  <TableRow>
                 <TableCell> <Typography variant='h6'> Total Planes LLO:{cantiLLOmza + cantiLLOeste}</Typography></TableCell> 
                 </TableRow> 
                  <TableRow>
                    <TableCell>LLO</TableCell>
                    <TableCell>MENDOZA</TableCell>
                    <TableCell>{cantiLLOmza}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>LLO</TableCell>
                    <TableCell>ESTE</TableCell>
                    <TableCell>{cantiLLOeste}</TableCell> 
                  </TableRow>
                  <TableRow>
                 <TableCell><Typography variant='h6'>Total Planes LNRG:{cantiLNRGeste + cantiLNRGgval}</Typography></TableCell> 
                 </TableRow>
                  <TableRow>
                    <TableCell>LNRG</TableCell>
                    <TableCell>ESTE</TableCell>
                    <TableCell>{cantiLNRGeste}</TableCell> 
                  </TableRow>
                  <TableRow>
                    <TableCell>LNRG</TableCell>
                    <TableCell>GRAL.ALVEAR</TableCell>
                    <TableCell>{cantiLNRGgval}</TableCell> 
                  </TableRow>
              
                </TableBody>
              
              </Table>
        </TableContainer>
        </Grid>



        

        <Grid item xs={12} md={4} sx={{mt:1, p:2}}>
        
        </Grid>

        

     
    
     
     
     
     
   
    <Grid item xs={12} md={6} sx={{p:2}}>
     {/*  
     <Box sx={{border:1, borderRadius:2}}>
    <Typography textAlign={'center'}>Detalle Por  Sede, Propuesta y Version plan</Typography>
    </Box>  
        <Table size='small'>
          <TableHead>
            
            <TableRow>
              <TableCell>Sede</TableCell>
              <TableCell>Propuesta</TableCell>
              <TableCell>Plan-Vers.</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Nro.Alumnos</TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
          {cantiAluSedePropuesta?cantiAluSedePropuesta.length>0? cantiAluSedePropuesta.map((ele, index)=>
          <TableRow key={index}>
            <TableCell>{ele.sede}</TableCell>
            <TableCell>{ele.codigo}</TableCell>
            <TableCell>{ele.plan_version}</TableCell>
            <TableCell>{ele.sexo}</TableCell>
            <TableCell>{ele.count}</TableCell>
          </TableRow>
          ):null:null}
          </TableBody>
          </Table> 
      
      </Grid>
      
      
      
      <Grid item xs={12} md={6} sx={{p:2}}>
      <Box sx={{border:1, borderRadius:2}}>
        <Typography textAlign={'center'}>Planes-version (A)Activos No Vigentes (V)Activos y Vigentes</Typography>
      </Box>
      
      <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell>Versión</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {planesact?planesact.length>0? planesact.map((ele, index)=>
          <TableRow key={index}>
            <TableCell>{ele.codigo}</TableCell>
            <TableCell>{ele.plan_version}</TableCell>
            <TableCell>{ele.nombre}</TableCell>
            <TableCell>{ele.estado}</TableCell>
          </TableRow>
          ):null:null}
          </TableBody>
          </Table> 
      */}
          </Grid>
      
      </Grid>
    </Container>
  )
}

export default AlumnosSedePropuesta